import Map "mo:core/Map";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import Types "../types/inventory";
import Iter "mo:core/Iter";

module {
  public func addMedicine(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    state : { var nextMedicineId : Nat },
    caller : CommonTypes.UserId,
    input : Types.MedicineInput,
  ) : Types.Medicine {
    let id = state.nextMedicineId;
    state.nextMedicineId += 1;
    let now = Time.now();
    let medicine : Types.Medicine = {
      id;
      name = input.name;
      genericName = input.genericName;
      hsnCode = input.hsnCode;
      gstRate = input.gstRate;
      unitPrice = input.unitPrice;
      purchasePrice = input.purchasePrice;
      stockQty = input.stockQty;
      lowStockThreshold = input.lowStockThreshold;
      rackLocation = input.rackLocation;
      barcodeId = input.barcodeId;
      isActive = true;
      createdAt = now;
      updatedAt = now;
    };
    medicines.add(id, medicine);
    medicine;
  };

  public func updateMedicine(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    id : CommonTypes.MedicineId,
    input : Types.MedicineInput,
  ) : ?Types.Medicine {
    switch (medicines.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.Medicine = {
          existing with
          name = input.name;
          genericName = input.genericName;
          hsnCode = input.hsnCode;
          gstRate = input.gstRate;
          unitPrice = input.unitPrice;
          purchasePrice = input.purchasePrice;
          stockQty = input.stockQty;
          lowStockThreshold = input.lowStockThreshold;
          rackLocation = input.rackLocation;
          barcodeId = input.barcodeId;
          updatedAt = Time.now();
        };
        medicines.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteMedicine(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    id : CommonTypes.MedicineId,
  ) : Bool {
    switch (medicines.get(id)) {
      case null false;
      case (?existing) {
        medicines.add(id, { existing with isActive = false; updatedAt = Time.now() });
        true;
      };
    };
  };

  public func getMedicine(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    id : CommonTypes.MedicineId,
  ) : ?Types.Medicine {
    medicines.get(id);
  };

  public func listMedicines(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
  ) : [Types.Medicine] {
    medicines.values().filter(func(m : Types.Medicine) : Bool { m.isActive }).toArray();
  };

  public func searchMedicines(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    term : Text,
  ) : [Types.Medicine] {
    let lower = term.toLower();
    medicines.values().filter(func(m : Types.Medicine) : Bool {
      m.isActive and (
        m.name.toLower().contains(#text lower) or
        m.genericName.toLower().contains(#text lower) or
        m.hsnCode.contains(#text lower)
      )
    }).toArray();
  };

  public func getLowStockMedicines(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
  ) : [Types.Medicine] {
    medicines.values().filter(func(m : Types.Medicine) : Bool { m.isActive and m.stockQty <= m.lowStockThreshold }).toArray();
  };

  public func addBatch(
    batches : Map.Map<CommonTypes.BatchId, Types.MedicineBatch>,
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    state : { var nextBatchId : Nat },
    input : Types.BatchInput,
  ) : Types.MedicineBatch {
    let id = state.nextBatchId;
    state.nextBatchId += 1;
    let now = Time.now();
    let batch : Types.MedicineBatch = {
      id;
      medicineId = input.medicineId;
      batchNumber = input.batchNumber;
      expiryDate = input.expiryDate;
      qty = input.qty;
      purchasePrice = input.purchasePrice;
      createdAt = now;
    };
    batches.add(id, batch);
    switch (medicines.get(input.medicineId)) {
      case null {};
      case (?med) {
        medicines.add(input.medicineId, { med with stockQty = med.stockQty + input.qty; updatedAt = now });
      };
    };
    batch;
  };

  public func listBatchesForMedicine(
    batches : Map.Map<CommonTypes.BatchId, Types.MedicineBatch>,
    medicineId : CommonTypes.MedicineId,
  ) : [Types.MedicineBatch] {
    batches.values().filter(func(b : Types.MedicineBatch) : Bool { b.medicineId == medicineId }).toArray();
  };

  public func getExpiringBatches(
    batches : Map.Map<CommonTypes.BatchId, Types.MedicineBatch>,
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    withinDays : Nat,
  ) : [(Types.MedicineBatch, Types.Medicine)] {
    let now = Time.now();
    let cutoff : Int = now + withinDays.toInt() * 86_400_000_000_000;
    batches.values().filter(func(b : Types.MedicineBatch) : Bool {
      b.qty > 0 and b.expiryDate <= cutoff
    }).filterMap<Types.MedicineBatch, (Types.MedicineBatch, Types.Medicine)>(func(b) {
      switch (medicines.get(b.medicineId)) {
        case null null;
        case (?m) ?(b, m);
      };
    }).toArray();
  };

  public func adjustStock(
    medicines : Map.Map<CommonTypes.MedicineId, Types.Medicine>,
    id : CommonTypes.MedicineId,
    delta : Int,
  ) : Bool {
    switch (medicines.get(id)) {
      case null false;
      case (?med) {
        let newQty : Int = med.stockQty.toInt() + delta;
        if (newQty < 0) { return false };
        medicines.add(id, { med with stockQty = newQty.toNat(); updatedAt = Time.now() });
        true;
      };
    };
  };
}
