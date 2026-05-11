import CommonTypes "common";

module {
  public type DateRange = {
    fromTime : CommonTypes.Timestamp;
    toTime : CommonTypes.Timestamp;
  };

  public type SalesSummary = {
    totalInvoices : Nat;
    totalSales : Nat;       // paisa
    totalGst : Nat;         // paisa
    totalReturns : Nat;     // paisa
    netRevenue : Nat;       // paisa
    gst5Total : Nat;        // paisa
    gst12Total : Nat;       // paisa
    gst18Total : Nat;       // paisa
  };

  public type PurchaseSummary = {
    totalOrders : Nat;
    totalSpend : Nat;         // paisa
    pendingOrders : Nat;
    deliveredOrders : Nat;
  };

  public type GstBreakdown = {
    rate : CommonTypes.GstRate;
    taxableAmount : Nat;  // paisa
    gstAmount : Nat;      // paisa
  };

  public type LowStockAlert = {
    medicineId : CommonTypes.MedicineId;
    medicineName : Text;
    currentStock : Nat;
    threshold : Nat;
  };

  public type ExpiryAlert = {
    medicineId : CommonTypes.MedicineId;
    medicineName : Text;
    batchId : CommonTypes.BatchId;
    batchNumber : Text;
    expiryDate : CommonTypes.Timestamp;
    qty : Nat;
  };
}
