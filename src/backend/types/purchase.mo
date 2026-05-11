import CommonTypes "common";

module {
  public type Distributor = {
    id : CommonTypes.DistributorId;
    name : Text;
    contactPerson : Text;
    phone : Text;
    email : ?Text;
    address : Text;
    gstNumber : ?Text;
    isActive : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type DistributorCatalogEntry = {
    distributorId : CommonTypes.DistributorId;
    medicineId : ?CommonTypes.MedicineId; // null if not matched in inventory
    medicineName : Text;
    hsnCode : Text;
    price : Nat;          // paisa per unit
    stockQty : Nat;
    deliveryDays : Nat;
    discountPct : Nat;    // 0-100
    updatedAt : CommonTypes.Timestamp;
  };

  public type PurchaseOrderLine = {
    medicineName : Text;
    medicineId : ?CommonTypes.MedicineId;
    distributorId : CommonTypes.DistributorId;
    qty : Nat;
    unitPrice : Nat;   // paisa
    discountPct : Nat;
    lineTotal : Nat;   // paisa
  };

  public type PurchaseOrder = {
    id : CommonTypes.OrderId;
    distributorId : CommonTypes.DistributorId;
    distributorName : Text;
    lines : [PurchaseOrderLine];
    totalAmount : Nat;  // paisa
    status : CommonTypes.OrderStatus;
    createdBy : CommonTypes.UserId;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type DistributorInput = {
    name : Text;
    contactPerson : Text;
    phone : Text;
    email : ?Text;
    address : Text;
    gstNumber : ?Text;
  };

  public type CatalogEntryInput = {
    medicineName : Text;
    hsnCode : Text;
    price : Nat;
    stockQty : Nat;
    deliveryDays : Nat;
    discountPct : Nat;
  };

  public type PurchaseOrderInput = {
    distributorId : CommonTypes.DistributorId;
    lines : [OrderLineInput];
  };

  public type OrderLineInput = {
    medicineName : Text;
    medicineId : ?CommonTypes.MedicineId;
    qty : Nat;
    unitPrice : Nat;
    discountPct : Nat;
  };

  // Returned when comparing distributors for a medicine
  public type DistributorOffer = {
    distributorId : CommonTypes.DistributorId;
    distributorName : Text;
    price : Nat;
    stockQty : Nat;
    deliveryDays : Nat;
    discountPct : Nat;
    score : Nat; // computed ranking score (higher = better)
  };
}
