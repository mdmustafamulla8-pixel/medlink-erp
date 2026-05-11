import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import Types "../types/inventory";
import InventoryLib "../lib/inventory";

mixin (
  accessControlState : AccessControl.AccessControlState,
  medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
  batches : Map.Map<CommonTypes.BatchId, Types.MedicineBatch>,
  invState : { var nextMedicineId : Nat; var nextBatchId : Nat },
) {
  public shared ({ caller }) func addMedicine(input : Types.MedicineInput) : async Types.Medicine {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InventoryLib.addMedicine(medicines, invState, caller, input);
  };

  public shared ({ caller }) func updateMedicine(id : CommonTypes.MedicineId, input : Types.MedicineInput) : async ?Types.Medicine {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InventoryLib.updateMedicine(medicines, id, input);
  };

  public shared ({ caller }) func deleteMedicine(id : CommonTypes.MedicineId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InventoryLib.deleteMedicine(medicines, id);
  };

  public query func getMedicine(id : CommonTypes.MedicineId) : async ?Types.Medicine {
    InventoryLib.getMedicine(medicines, id);
  };

  public query func listMedicines() : async [Types.Medicine] {
    InventoryLib.listMedicines(medicines);
  };

  public query func searchMedicines(term : Text) : async [Types.Medicine] {
    InventoryLib.searchMedicines(medicines, term);
  };

  public query func getLowStockMedicines() : async [Types.Medicine] {
    InventoryLib.getLowStockMedicines(medicines);
  };

  public shared ({ caller }) func addBatch(input : Types.BatchInput) : async Types.MedicineBatch {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    InventoryLib.addBatch(batches, medicines, invState, input);
  };

  public query func listBatchesForMedicine(medicineId : CommonTypes.MedicineId) : async [Types.MedicineBatch] {
    InventoryLib.listBatchesForMedicine(batches, medicineId);
  };

  public query func getExpiringBatches(withinDays : Nat) : async [(Types.MedicineBatch, Types.Medicine)] {
    InventoryLib.getExpiringBatches(batches, medicines, withinDays);
  };
}
