import Map "mo:core/Map";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import BillingTypes "../types/billing";
import InventoryTypes "../types/inventory";

module {
  // Calculate GST amount in paisa given unit price, qty, rate, and discount
  public func calcGstAmount(unitPrice : Nat, qty : Nat, gstRate : CommonTypes.GstRate, discountPct : Nat) : Nat {
    let gross = unitPrice * qty;
    let discounted = gross - (gross * discountPct / 100);
    let ratePct = switch (gstRate) { case (#gst5) 5; case (#gst12) 12; case (#gst18) 18 };
    discounted * ratePct / 100;
  };

  public func createInvoice(
    invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
    medicines : Map.Map<CommonTypes.MedicineId, InventoryTypes.Medicine>,
    batches : Map.Map<CommonTypes.BatchId, InventoryTypes.MedicineBatch>,
    state : { var nextInvoiceId : Nat },
    caller : CommonTypes.UserId,
    input : BillingTypes.InvoiceInput,
  ) : BillingTypes.Invoice {
    let id = state.nextInvoiceId;
    state.nextInvoiceId += 1;
    let now = Time.now();
    let invoiceNumber = "INV-" # id.toText();

    // Build line items by looking up medicine + batch info
    let lineItems = input.lineItems.map(func(li) {
      let med = switch (medicines.get(li.medicineId)) {
        case (?m) m;
        case null {
          // Fallback for missing medicine — should not happen in valid input
          { id = li.medicineId; name = "Unknown"; genericName = ""; hsnCode = ""; gstRate = #gst5;
            unitPrice = 0; purchasePrice = 0; stockQty = 0; lowStockThreshold = 0;
            rackLocation = ""; barcodeId = null; isActive = false; createdAt = now; updatedAt = now };
        };
      };
      let batch = switch (batches.get(li.batchId)) {
        case (?b) b;
        case null {
          { id = li.batchId; medicineId = li.medicineId; batchNumber = ""; expiryDate = 0;
            qty = 0; purchasePrice = 0; createdAt = now };
        };
      };
      let gross = med.unitPrice * li.qty;
      let discounted = gross - (gross * li.discountPct / 100);
      let gstAmt = calcGstAmount(med.unitPrice, li.qty, med.gstRate, li.discountPct);
      let lineTotal = discounted + gstAmt;
      {
        medicineId = li.medicineId;
        medicineName = med.name;
        batchId = li.batchId;
        batchNumber = batch.batchNumber;
        qty = li.qty;
        unitPrice = med.unitPrice;
        gstRate = med.gstRate;
        gstAmount = gstAmt;
        discountPct = li.discountPct;
        lineTotal;
      };
    });

    let subtotal = lineItems.foldLeft(0, func(acc, li) {
      acc + (li.unitPrice * li.qty - (li.unitPrice * li.qty * li.discountPct / 100))
    });
    let totalGst = lineItems.foldLeft(0, func(acc, li) { acc + li.gstAmount });
    let totalAmount = subtotal + totalGst;

    let invoice : BillingTypes.Invoice = {
      id;
      invoiceNumber;
      customerId = input.customerId;
      customerName = input.customerName;
      lineItems;
      subtotal;
      totalGst;
      totalAmount;
      paymentMode = input.paymentMode;
      isReturn = input.isReturn;
      originalInvoiceId = input.originalInvoiceId;
      createdBy = caller;
      createdAt = now;
    };
    invoices.add(id, invoice);

    // Deduct stock for non-return invoices; add back for returns
    for (li in lineItems.values()) {
      let delta : Int = if (input.isReturn) { li.qty.toInt() } else { -(li.qty.toInt()) };
      switch (medicines.get(li.medicineId)) {
        case null {};
        case (?med) {
          let newQty : Int = med.stockQty.toInt() + delta;
          if (newQty >= 0) {
            medicines.add(li.medicineId, { med with stockQty = newQty.toNat(); updatedAt = now });
          };
        };
      };
    };

    invoice;
  };

  public func getInvoice(
    invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
    id : CommonTypes.InvoiceId,
  ) : ?BillingTypes.Invoice {
    invoices.get(id);
  };

  public func listInvoices(
    invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
  ) : [BillingTypes.Invoice] {
    invoices.values().toArray();
  };

  public func addCustomer(
    customers : Map.Map<CommonTypes.CustomerId, BillingTypes.Customer>,
    state : { var nextCustomerId : Nat },
    input : BillingTypes.CustomerInput,
  ) : BillingTypes.Customer {
    let id = state.nextCustomerId;
    state.nextCustomerId += 1;
    let customer : BillingTypes.Customer = {
      id;
      name = input.name;
      phone = input.phone;
      address = input.address;
      gstNumber = input.gstNumber;
      createdAt = Time.now();
    };
    customers.add(id, customer);
    customer;
  };

  public func getCustomer(
    customers : Map.Map<CommonTypes.CustomerId, BillingTypes.Customer>,
    id : CommonTypes.CustomerId,
  ) : ?BillingTypes.Customer {
    customers.get(id);
  };

  public func listCustomers(
    customers : Map.Map<CommonTypes.CustomerId, BillingTypes.Customer>,
  ) : [BillingTypes.Customer] {
    customers.values().toArray();
  };

  public func getCustomerLedger(
    invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
    customerId : CommonTypes.CustomerId,
  ) : [BillingTypes.Invoice] {
    invoices.values().filter(func(inv : BillingTypes.Invoice) : Bool {
      switch (inv.customerId) {
        case (?cid) { cid == customerId };
        case null { false }
      }
    }).toArray();
  };
}
