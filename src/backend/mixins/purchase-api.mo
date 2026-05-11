import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import Types "../types/purchase";
import PurchaseLib "../lib/purchase";

mixin (
  accessControlState : AccessControl.AccessControlState,
  distributors : Map.Map<CommonTypes.DistributorId, Types.Distributor>,
  catalog : Map.Map<(CommonTypes.DistributorId, Text), Types.DistributorCatalogEntry>,
  orders : Map.Map<CommonTypes.OrderId, Types.PurchaseOrder>,
  purchState : { var nextDistributorId : Nat; var nextOrderId : Nat },
) {
  public shared ({ caller }) func addDistributor(input : Types.DistributorInput) : async Types.Distributor {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.addDistributor(distributors, purchState, input);
  };

  public shared ({ caller }) func updateDistributor(id : CommonTypes.DistributorId, input : Types.DistributorInput) : async ?Types.Distributor {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.updateDistributor(distributors, id, input);
  };

  public shared ({ caller }) func deleteDistributor(id : CommonTypes.DistributorId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    PurchaseLib.deleteDistributor(distributors, id);
  };

  public query func listDistributors() : async [Types.Distributor] {
    PurchaseLib.listDistributors(distributors);
  };

  public shared ({ caller }) func upsertCatalogEntry(distributorId : CommonTypes.DistributorId, input : Types.CatalogEntryInput) : async Types.DistributorCatalogEntry {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.upsertCatalogEntry(catalog, distributorId, input);
  };

  public shared ({ caller }) func bulkUpsertCatalog(distributorId : CommonTypes.DistributorId, entries : [Types.CatalogEntryInput]) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.bulkUpsertCatalog(catalog, distributorId, entries);
  };

  public query func searchDistributorOffers(medicineName : Text) : async [Types.DistributorOffer] {
    PurchaseLib.searchDistributorOffers(catalog, distributors, medicineName);
  };

  public shared ({ caller }) func createPurchaseOrder(input : Types.PurchaseOrderInput) : async Types.PurchaseOrder {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.createPurchaseOrder(orders, distributors, purchState, caller, input);
  };

  public shared ({ caller }) func updateOrderStatus(id : CommonTypes.OrderId, status : CommonTypes.OrderStatus) : async ?Types.PurchaseOrder {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PurchaseLib.updateOrderStatus(orders, id, status);
  };

  public query func listPurchaseOrders() : async [Types.PurchaseOrder] {
    PurchaseLib.listOrders(orders);
  };

  public query func getPurchaseOrder(id : CommonTypes.OrderId) : async ?Types.PurchaseOrder {
    PurchaseLib.getOrder(orders, id);
  };
}
