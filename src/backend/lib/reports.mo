import Map "mo:core/Map";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import BillingTypes "../types/billing";
import InventoryTypes "../types/inventory";
import PurchaseTypes "../types/purchase";
import ReportTypes "../types/reports";
import Iter "mo:core/Iter";

module {
  public func getSalesSummary(
    invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
    range : ReportTypes.DateRange,
  ) : ReportTypes.SalesSummary {
    var totalInvoices = 0;
    var totalSales = 0;
    var totalGst = 0;
    var totalReturns = 0;
    var gst5Total = 0;
    var gst12Total = 0;
    var gst18Total = 0;

    for ((_, inv) in invoices.entries()) {
      if (inv.createdAt >= range.fromTime and inv.createdAt <= range.toTime) {
        totalInvoices += 1;
        if (inv.isReturn) {
          totalReturns += inv.totalAmount;
        } else {
          totalSales += inv.totalAmount;
          totalGst += inv.totalGst;
          // Break down GST by rate
          for (li in inv.lineItems.values()) {
            switch (li.gstRate) {
              case (#gst5)  { gst5Total  += li.gstAmount };
              case (#gst12) { gst12Total += li.gstAmount };
              case (#gst18) { gst18Total += li.gstAmount };
            };
          };
        };
      };
    };

    let netRevenue = if (totalSales >= totalReturns) { totalSales - totalReturns } else { 0 };
    { totalInvoices; totalSales; totalGst; totalReturns; netRevenue; gst5Total; gst12Total; gst18Total };
  };

  public func getPurchaseSummary(
    orders : Map.Map<CommonTypes.OrderId, PurchaseTypes.PurchaseOrder>,
    range : ReportTypes.DateRange,
  ) : ReportTypes.PurchaseSummary {
    var totalOrders = 0;
    var totalSpend = 0;
    var pendingOrders = 0;
    var deliveredOrders = 0;

    for ((_, order) in orders.entries()) {
      if (order.createdAt >= range.fromTime and order.createdAt <= range.toTime) {
        totalOrders += 1;
        totalSpend += order.totalAmount;
        switch (order.status) {
          case (#pending) { pendingOrders += 1 };
          case (#confirmed) { pendingOrders += 1 };
          case (#delivered) { deliveredOrders += 1 };
          case _ {};
        };
      };
    };

    { totalOrders; totalSpend; pendingOrders; deliveredOrders };
  };

  public func getGstBreakdown(
    invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
    range : ReportTypes.DateRange,
  ) : [ReportTypes.GstBreakdown] {
    var taxable5 = 0; var gst5 = 0;
    var taxable12 = 0; var gst12 = 0;
    var taxable18 = 0; var gst18 = 0;

    for ((_, inv) in invoices.entries()) {
      if (not inv.isReturn and inv.createdAt >= range.fromTime and inv.createdAt <= range.toTime) {
        for (li in inv.lineItems.values()) {
          let gross = li.unitPrice * li.qty;
          let taxable = gross - (gross * li.discountPct / 100);
          switch (li.gstRate) {
            case (#gst5)  { taxable5  += taxable; gst5  += li.gstAmount };
            case (#gst12) { taxable12 += taxable; gst12 += li.gstAmount };
            case (#gst18) { taxable18 += taxable; gst18 += li.gstAmount };
          };
        };
      };
    };

    [
      { rate = #gst5;  taxableAmount = taxable5;  gstAmount = gst5  },
      { rate = #gst12; taxableAmount = taxable12; gstAmount = gst12 },
      { rate = #gst18; taxableAmount = taxable18; gstAmount = gst18 },
    ];
  };

  public func getLowStockAlerts(
    medicines : Map.Map<CommonTypes.MedicineId, InventoryTypes.Medicine>,
  ) : [ReportTypes.LowStockAlert] {
    medicines.values().filter(func(m : InventoryTypes.Medicine) : Bool {
      m.isActive and m.stockQty <= m.lowStockThreshold
    }).map<InventoryTypes.Medicine, ReportTypes.LowStockAlert>(func(m) {
      { medicineId = m.id; medicineName = m.name; currentStock = m.stockQty; threshold = m.lowStockThreshold };
    }).toArray();
  };

  public func getExpiryAlerts(
    batches : Map.Map<CommonTypes.BatchId, InventoryTypes.MedicineBatch>,
    medicines : Map.Map<CommonTypes.MedicineId, InventoryTypes.Medicine>,
    withinDays : Nat,
  ) : [ReportTypes.ExpiryAlert] {
    let now = Time.now();
    let cutoff : Int = now + withinDays.toInt() * 86_400_000_000_000;
    batches.values().filter(func(b : InventoryTypes.MedicineBatch) : Bool {
      b.qty > 0 and b.expiryDate <= cutoff
    }).filterMap<InventoryTypes.MedicineBatch, ReportTypes.ExpiryAlert>(func(b) {
      switch (medicines.get(b.medicineId)) {
        case null null;
        case (?m) ?{
          medicineId = m.id;
          medicineName = m.name;
          batchId = b.id;
          batchNumber = b.batchNumber;
          expiryDate = b.expiryDate;
          qty = b.qty;
        };
      };
    }).toArray();
  };
}
