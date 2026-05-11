import CommonTypes "common";

module {
  public type Medicine = {
    id : CommonTypes.MedicineId;
    name : Text;
    genericName : Text;
    hsnCode : Text;
    gstRate : CommonTypes.GstRate;
    unitPrice : Nat;       // paisa (1/100 rupee)
    purchasePrice : Nat;   // paisa
    stockQty : Nat;
    lowStockThreshold : Nat;
    rackLocation : Text;
    barcodeId : ?Text;
    isActive : Bool;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type MedicineBatch = {
    id : CommonTypes.BatchId;
    medicineId : CommonTypes.MedicineId;
    batchNumber : Text;
    expiryDate : CommonTypes.Timestamp; // epoch nanoseconds
    qty : Nat;
    purchasePrice : Nat; // paisa
    createdAt : CommonTypes.Timestamp;
  };

  public type MedicineInput = {
    name : Text;
    genericName : Text;
    hsnCode : Text;
    gstRate : CommonTypes.GstRate;
    unitPrice : Nat;
    purchasePrice : Nat;
    stockQty : Nat;
    lowStockThreshold : Nat;
    rackLocation : Text;
    barcodeId : ?Text;
  };

  public type BatchInput = {
    medicineId : CommonTypes.MedicineId;
    batchNumber : Text;
    expiryDate : CommonTypes.Timestamp;
    qty : Nat;
    purchasePrice : Nat;
  };
}
