import Map "mo:core/Map";
import CommonTypes "./types/common";
import InventoryTypes "./types/inventory";
import BillingTypes "./types/billing";
import PurchaseTypes "./types/purchase";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

/// Seeds sample data so the dashboard shows meaningful content on first load.
/// Call once from main.mo initialization (guarded by a seeded flag).
module {
  // Epoch ns for a fixed reference date (2024-01-01 00:00:00 UTC)
  let BASE : Int = 1_704_067_200_000_000_000;
  // 30 days in ns
  let DAY : Int = 86_400_000_000_000;

  public func seed(
    medicines    : Map.Map<CommonTypes.MedicineId, InventoryTypes.Medicine>,
    batches      : Map.Map<CommonTypes.BatchId, InventoryTypes.MedicineBatch>,
    customers    : Map.Map<CommonTypes.CustomerId, BillingTypes.Customer>,
    invoices     : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
    distributors : Map.Map<CommonTypes.DistributorId, PurchaseTypes.Distributor>,
    catalog      : Map.Map<(CommonTypes.DistributorId, Text), PurchaseTypes.DistributorCatalogEntry>,
    invState     : { var nextMedicineId : Nat; var nextBatchId : Nat },
    billState    : { var nextInvoiceId : Nat; var nextCustomerId : Nat },
    purchState   : { var nextDistributorId : Nat; var nextOrderId : Nat },
  ) {
    // ── Medicines (20 items) ────────────────────────────────────────────────
    let now = BASE;
    let medicineData : [(Text, Text, Text, CommonTypes.GstRate, Nat, Nat, Nat, Nat, Text)] = [
      ("Paracetamol 500mg",    "Paracetamol",      "3004909900", #gst12, 200,  120, 500, 50,  "A1"),
      ("Amoxicillin 250mg",    "Amoxicillin",      "3004101900", #gst12, 850,  500, 200, 30,  "B2"),
      ("Metformin 500mg",      "Metformin HCl",    "3004909300", #gst12, 320,  190, 350, 40,  "C3"),
      ("Atorvastatin 10mg",    "Atorvastatin",     "3004909100", #gst12, 1500, 900, 150, 20,  "D4"),
      ("Omeprazole 20mg",      "Omeprazole",       "3004909900", #gst12, 680,  410, 250, 30,  "E5"),
      ("Azithromycin 500mg",   "Azithromycin",     "3004101100", #gst12, 1200, 750, 180, 25,  "F6"),
      ("Cetirizine 10mg",      "Cetirizine HCl",   "3004909900", #gst5,  180,  100, 600, 60,  "G7"),
      ("Pantoprazole 40mg",    "Pantoprazole",     "3004909900", #gst12, 950,  580, 220, 30,  "H8"),
      ("Ibuprofen 400mg",      "Ibuprofen",        "3004909900", #gst12, 250,  150, 480, 50,  "I9"),
      ("Amlodipine 5mg",       "Amlodipine",       "3004909100", #gst12, 420,  260, 280, 35,  "J10"),
      ("Losartan 50mg",        "Losartan Potassium","3004909100", #gst12, 550,  330, 240, 30,  "K11"),
      ("Glimepiride 2mg",      "Glimepiride",      "3004909300", #gst12, 780,  480, 190, 25,  "L12"),
      ("Aspirin 75mg",         "Acetylsalicylic Acid","3004909900", #gst5, 100, 60, 700, 80, "M13"),
      ("Dolo 650",             "Paracetamol",      "3004909900", #gst12, 300,  180, 400, 50,  "N14"),
      ("Vitamin D3 60000 IU",  "Cholecalciferol",  "3004509000", #gst12, 1800, 1100, 120, 15, "O15"),
      ("Cefixime 200mg",       "Cefixime",         "3004101900", #gst12, 1400, 860, 160, 20,  "P16"),
      ("Montelukast 10mg",     "Montelukast Sodium","3004909900", #gst12, 620,  380, 200, 25,  "Q17"),
      ("Telmisartan 40mg",     "Telmisartan",      "3004909100", #gst12, 490,  295, 260, 30,  "R18"),
      ("B-Complex Syrup",      "Multivitamin",     "3004509000", #gst18, 350,  210, 300, 40,  "S19"),
      ("ORS Sachets",          "Oral Rehydration Salts", "3004909900", #gst5, 150, 90, 800, 100, "T20"),
    ];

    for ((name, generic, hsn, gst, unitP, purchP, stock, threshold, rack) in medicineData.values()) {
      let id = invState.nextMedicineId;
      invState.nextMedicineId += 1;
      let med : InventoryTypes.Medicine = {
        id; name; genericName = generic; hsnCode = hsn; gstRate = gst;
        unitPrice = unitP; purchasePrice = purchP; stockQty = stock;
        lowStockThreshold = threshold; rackLocation = rack;
        barcodeId = ?("BC" # id.toText()); isActive = true;
        createdAt = now; updatedAt = now;
      };
      medicines.add(id, med);
    };

    // ── Batches (2 per medicine — skip for brevity, add for first 5) ────────
    let batchData : [(CommonTypes.MedicineId, Text, Int, Nat, Nat)] = [
      (0, "BT-001A", BASE + 365 * DAY, 250, 120),
      (0, "BT-001B", BASE + 25 * DAY,  250, 115), // expiring soon
      (1, "BT-002A", BASE + 300 * DAY, 200, 500),
      (2, "BT-003A", BASE + 400 * DAY, 350, 190),
      (3, "BT-004A", BASE + 500 * DAY, 150, 900),
      (4, "BT-005A", BASE + 20 * DAY,  250, 410), // expiring soon
    ];
    for ((medId, batchNum, expiry, qty, purchP) in batchData.values()) {
      let id = invState.nextBatchId;
      invState.nextBatchId += 1;
      batches.add(id, {
        id; medicineId = medId; batchNumber = batchNum;
        expiryDate = expiry; qty; purchasePrice = purchP; createdAt = now;
      });
    };

    // ── Customers (3) ────────────────────────────────────────────────────────
    let customerData : [(Text, Text, Text)] = [
      ("Ravi Kumar",   "9876543210", "12-A, Anna Nagar, Chennai"),
      ("Priya Sharma", "9123456789", "45, MG Road, Bengaluru"),
      ("Mohan Das",    "9988776655", "78, CP Lane, New Delhi"),
    ];
    for ((name, phone, addr) in customerData.values()) {
      let id = billState.nextCustomerId;
      billState.nextCustomerId += 1;
      customers.add(id, { id; name; phone = ?phone; address = ?addr; gstNumber = null; createdAt = now });
    };

    // ── Invoices (5 sample) ─────────────────────────────────────────────────
    // Helper: build a line item inline
    let buildLine = func(medId : Nat, batchId : Nat, qty : Nat, discPct : Nat) : BillingTypes.InvoiceLineItem {
      let med = switch (medicines.get(medId)) { case (?m) m; case null { Runtime.trap("seed: missing medicine") } };
      let bat = switch (batches.get(batchId))  { case (?b) b; case null { Runtime.trap("seed: missing batch") } };
      let gross = med.unitPrice * qty;
      let taxable = gross - (gross * discPct / 100);
      let ratePct = switch (med.gstRate) { case (#gst5) 5; case (#gst12) 12; case (#gst18) 18 };
      let gstAmt = taxable * ratePct / 100;
      {
        medicineId = medId; medicineName = med.name;
        batchId; batchNumber = bat.batchNumber;
        qty; unitPrice = med.unitPrice; gstRate = med.gstRate;
        gstAmount = gstAmt; discountPct = discPct;
        lineTotal = taxable + gstAmt;
      };
    };

    let invoiceData : [(Nat, Text, [BillingTypes.InvoiceLineItem], CommonTypes.PaymentMode)] = [
      (0, "Ravi Kumar",   [buildLine(0, 0, 5, 0), buildLine(8, 3, 2, 5)],  #cash),
      (1, "Priya Sharma", [buildLine(1, 2, 1, 0), buildLine(4, 4, 3, 0)],  #upi),
      (0, "Ravi Kumar",   [buildLine(6, 0, 10, 0)],                          #cash),
      (2, "Mohan Das",    [buildLine(2, 3, 4, 10), buildLine(12, 4, 6, 0)], #card),
      (1, "Priya Sharma", [buildLine(3, 4, 2, 0), buildLine(14, 0, 1, 0)],  #upi),
    ];

    for ((custId, custName, lineItems, payMode) in invoiceData.values()) {
      let id = billState.nextInvoiceId;
      billState.nextInvoiceId += 1;
      let subtotal = lineItems.foldLeft(0, func(acc, li) {
        acc + (li.unitPrice * li.qty - (li.unitPrice * li.qty * li.discountPct / 100))
      });
      let totalGst = lineItems.foldLeft(0, func(acc, li) { acc + li.gstAmount });
      invoices.add(id, {
        id; invoiceNumber = "INV-" # id.toText();
        customerId = ?custId; customerName = custName;
        lineItems; subtotal; totalGst; totalAmount = subtotal + totalGst;
        paymentMode = payMode; isReturn = false; originalInvoiceId = null;
        createdBy = Principal.fromText("2vxsx-fae"); createdAt = now;
      });
    };

    // ── Distributors (3) ─────────────────────────────────────────────────────
    let distData : [(Text, Text, Text, ?Text, Text)] = [
      ("MedCo Pharma Distributors", "Suresh Patel",   "8001122334", ?"medco@example.com",   "Plot 12, MIDC, Pune"),
      ("Apollo Wholesalers",         "Anita Singh",    "8112233445", ?"apollo@example.com",  "12, Ring Road, Delhi"),
      ("Sun Pharma Depot",           "Ramesh Nair",    "8223344556", ?"sundepot@example.com", "40, NH-48, Mumbai"),
    ];
    for ((name, contact, phone, email, addr) in distData.values()) {
      let id = purchState.nextDistributorId;
      purchState.nextDistributorId += 1;
      distributors.add(id, {
        id; name; contactPerson = contact; phone;
        email; address = addr; gstNumber = null;
        isActive = true; createdAt = now;
      });
    };

    // ── Distributor Catalog (each dist has 8 entries, overlapping meds) ─────
    let tupleCompare = func(a : (Nat, Text), b : (Nat, Text)) : { #less; #equal; #greater } {
      let (aid, at) = a;
      let (bid, bt) = b;
      if (aid < bid) { #less } else if (aid > bid) { #greater }
      else if (at < bt) { #less } else if (at > bt) { #greater } else { #equal };
    };

    let catalogEntries : [(CommonTypes.DistributorId, Text, Text, Nat, Nat, Nat, Nat)] = [
      // (distId, medicineName, hsnCode, price, stock, deliveryDays, discountPct)
      (0, "Paracetamol 500mg",  "3004909900", 110, 5000, 1, 5),
      (0, "Amoxicillin 250mg",  "3004101900", 470, 2000, 1, 3),
      (0, "Metformin 500mg",    "3004909300", 175, 3000, 2, 5),
      (0, "Ibuprofen 400mg",    "3004909900", 140, 4000, 1, 5),
      (0, "Cetirizine 10mg",    "3004909900",  90, 6000, 1, 0),
      (0, "Azithromycin 500mg", "3004101100", 700, 1500, 2, 5),
      (0, "Aspirin 75mg",       "3004909900",  55, 7000, 1, 0),
      (0, "ORS Sachets",        "3004909900",  80, 10000,1, 0),
      (1, "Paracetamol 500mg",  "3004909900", 105, 8000, 2, 8),
      (1, "Omeprazole 20mg",    "3004909900", 390, 2500, 2, 5),
      (1, "Atorvastatin 10mg",  "3004909100", 850, 1200, 3, 5),
      (1, "Metformin 500mg",    "3004909300", 180, 3500, 2, 3),
      (1, "Cetirizine 10mg",    "3004909900",  95, 5000, 2, 0),
      (1, "Pantoprazole 40mg",  "3004909900", 550, 2000, 2, 5),
      (1, "Cefixime 200mg",     "3004101900", 810, 1500, 3, 5),
      (1, "Vitamin D3 60000 IU","3004509000",1000, 1000, 2, 0),
      (2, "Amoxicillin 250mg",  "3004101900", 480, 3000, 3, 0),
      (2, "Azithromycin 500mg", "3004101100", 720, 2000, 3, 3),
      (2, "Amlodipine 5mg",     "3004909100", 245, 2800, 3, 5),
      (2, "Losartan 50mg",      "3004909100", 310, 2400, 3, 3),
      (2, "Glimepiride 2mg",    "3004909300", 450, 2000, 4, 5),
      (2, "Montelukast 10mg",   "3004909900", 360, 2200, 3, 0),
      (2, "Telmisartan 40mg",   "3004909100", 280, 2700, 3, 5),
      (2, "B-Complex Syrup",    "3004509000", 200, 3000, 2, 0),
    ];

    for ((distId, mname, hsn, price, stockQ, delivery, disc) in catalogEntries.values()) {
      let key : (CommonTypes.DistributorId, Text) = (distId, mname);
      catalog.add(tupleCompare, key, {
        distributorId = distId;
        medicineId = null;
        medicineName = mname;
        hsnCode = hsn;
        price; stockQty = stockQ;
        deliveryDays = delivery;
        discountPct = disc;
        updatedAt = now;
      });
    };
  };
}
