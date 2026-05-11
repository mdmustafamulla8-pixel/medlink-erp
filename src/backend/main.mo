import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import CommonTypes "types/common";
import InventoryTypes "types/inventory";
import BillingTypes "types/billing";
import PurchaseTypes "types/purchase";
import InventoryApi "mixins/inventory-api";
import BillingApi "mixins/billing-api";
import PurchaseApi "mixins/purchase-api";
import ReportsApi "mixins/reports-api";
import Seed "seed";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Inventory state
  let medicines = Map.empty<CommonTypes.MedicineId, InventoryTypes.Medicine>();
  let batches = Map.empty<CommonTypes.BatchId, InventoryTypes.MedicineBatch>();
  let invState = { var nextMedicineId = 0; var nextBatchId = 0 };

  // Billing state
  let invoices = Map.empty<CommonTypes.InvoiceId, BillingTypes.Invoice>();
  let customers = Map.empty<CommonTypes.CustomerId, BillingTypes.Customer>();
  let billState = { var nextInvoiceId = 0; var nextCustomerId = 0 };

  // Purchase / distributor state
  let distributors = Map.empty<CommonTypes.DistributorId, PurchaseTypes.Distributor>();
  let catalog = Map.empty<(CommonTypes.DistributorId, Text), PurchaseTypes.DistributorCatalogEntry>();
  let orders = Map.empty<CommonTypes.OrderId, PurchaseTypes.PurchaseOrder>();
  let purchState = { var nextDistributorId = 0; var nextOrderId = 0 };

  // Seed flag — only run once on fresh canister install
  let seedState = { var seeded = false };

  // Seed sample data on first load
  if (not seedState.seeded) {
    seedState.seeded := true;
    Seed.seed(medicines, batches, customers, invoices, distributors, catalog, invState, billState, purchState);
  };

  // Mixins
  include InventoryApi(accessControlState, medicines, batches, invState);
  include BillingApi(accessControlState, invoices, customers, medicines, batches, billState);
  include PurchaseApi(accessControlState, distributors, catalog, orders, purchState);
  include ReportsApi(accessControlState, invoices, medicines, batches, orders);
}
