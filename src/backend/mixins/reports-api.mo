import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import BillingTypes "../types/billing";
import InventoryTypes "../types/inventory";
import PurchaseTypes "../types/purchase";
import ReportTypes "../types/reports";
import ReportsLib "../lib/reports";

mixin (
  accessControlState : AccessControl.AccessControlState,
  invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
  medicines : Map.Map<CommonTypes.MedicineId, InventoryTypes.Medicine>,
  batches : Map.Map<CommonTypes.BatchId, InventoryTypes.MedicineBatch>,
  orders : Map.Map<CommonTypes.OrderId, PurchaseTypes.PurchaseOrder>,
) {
  public query func getSalesSummary(range : ReportTypes.DateRange) : async ReportTypes.SalesSummary {
    ReportsLib.getSalesSummary(invoices, range);
  };

  public query func getPurchaseSummary(range : ReportTypes.DateRange) : async ReportTypes.PurchaseSummary {
    ReportsLib.getPurchaseSummary(orders, range);
  };

  public query func getGstBreakdown(range : ReportTypes.DateRange) : async [ReportTypes.GstBreakdown] {
    ReportsLib.getGstBreakdown(invoices, range);
  };

  public query func getLowStockAlerts() : async [ReportTypes.LowStockAlert] {
    ReportsLib.getLowStockAlerts(medicines);
  };

  public query func getExpiryAlerts(withinDays : Nat) : async [ReportTypes.ExpiryAlert] {
    ReportsLib.getExpiryAlerts(batches, medicines, withinDays);
  };
}
