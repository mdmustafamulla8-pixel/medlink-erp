import Map "mo:core/Map";
import Order "mo:core/Order";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import Types "../types/purchase";
import Iter "mo:core/Iter";

module {
  // Compare function for tuple key (DistributorId, Text)
  func tupleCompare(a : (CommonTypes.DistributorId, Text), b : (CommonTypes.DistributorId, Text)) : Order.Order {
    let (aid, aname) = a;
    let (bid, bname) = b;
    if (aid < bid) { #less }
    else if (aid > bid) { #greater }
    else {
      if (aname < bname) { #less }
      else if (aname > bname) { #greater }
      else { #equal };
    };
  };

  public func addDistributor(
    distributors : Map.Map<CommonTypes.DistributorId, Types.Distributor>,
    state : { var nextDistributorId : Nat },
    input : Types.DistributorInput,
  ) : Types.Distributor {
    let id = state.nextDistributorId;
    state.nextDistributorId += 1;
    let dist : Types.Distributor = {
      id;
      name = input.name;
      contactPerson = input.contactPerson;
      phone = input.phone;
      email = input.email;
      address = input.address;
      gstNumber = input.gstNumber;
      isActive = true;
      createdAt = Time.now();
    };
    distributors.add(id, dist);
    dist;
  };

  public func updateDistributor(
    distributors : Map.Map<CommonTypes.DistributorId, Types.Distributor>,
    id : CommonTypes.DistributorId,
    input : Types.DistributorInput,
  ) : ?Types.Distributor {
    switch (distributors.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.Distributor = {
          existing with
          name = input.name;
          contactPerson = input.contactPerson;
          phone = input.phone;
          email = input.email;
          address = input.address;
          gstNumber = input.gstNumber;
        };
        distributors.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteDistributor(
    distributors : Map.Map<CommonTypes.DistributorId, Types.Distributor>,
    id : CommonTypes.DistributorId,
  ) : Bool {
    switch (distributors.get(id)) {
      case null false;
      case (?existing) {
        distributors.add(id, { existing with isActive = false });
        true;
      };
    };
  };

  public func listDistributors(
    distributors : Map.Map<CommonTypes.DistributorId, Types.Distributor>,
  ) : [Types.Distributor] {
    distributors.values().filter(func(d : Types.Distributor) : Bool { d.isActive }).toArray();
  };

  public func upsertCatalogEntry(
    catalog : Map.Map<(CommonTypes.DistributorId, Text), Types.DistributorCatalogEntry>,
    distributorId : CommonTypes.DistributorId,
    input : Types.CatalogEntryInput,
  ) : Types.DistributorCatalogEntry {
    let key : (CommonTypes.DistributorId, Text) = (distributorId, input.medicineName);
    let existing = catalog.get(tupleCompare, key);
    let medicineId = switch (existing) {
      case (?e) e.medicineId;
      case null null;
    };
    let entry : Types.DistributorCatalogEntry = {
      distributorId;
      medicineId;
      medicineName = input.medicineName;
      hsnCode = input.hsnCode;
      price = input.price;
      stockQty = input.stockQty;
      deliveryDays = input.deliveryDays;
      discountPct = input.discountPct;
      updatedAt = Time.now();
    };
    catalog.add(tupleCompare, key, entry);
    entry;
  };

  public func bulkUpsertCatalog(
    catalog : Map.Map<(CommonTypes.DistributorId, Text), Types.DistributorCatalogEntry>,
    distributorId : CommonTypes.DistributorId,
    entries : [Types.CatalogEntryInput],
  ) : Nat {
    var count = 0;
    for (e in entries.values()) {
      let _ = upsertCatalogEntry(catalog, distributorId, e);
      count += 1;
    };
    count;
  };

  public func searchDistributorOffers(
    catalog : Map.Map<(CommonTypes.DistributorId, Text), Types.DistributorCatalogEntry>,
    distributors : Map.Map<CommonTypes.DistributorId, Types.Distributor>,
    medicineName : Text,
  ) : [Types.DistributorOffer] {
    let lower = medicineName.toLower();
    // Collect all matching catalog entries
    let offers = catalog.values().filterMap(func(entry) {
      if (not entry.medicineName.toLower().contains(#text lower)) { return null };
      switch (distributors.get(entry.distributorId)) {
        case null null;
        case (?dist) {
          if (not dist.isActive) { return null };
          // Score: higher is better
          // Effective price after discount (lower = better → invert)
          // Delivery days (lower = better → invert)
          let effectivePrice = if (entry.price == 0) 0 else entry.price - (entry.price * entry.discountPct / 100);
          // Normalise: score = 10000 / (effectivePrice + 1) + 100 / (deliveryDays + 1)
          let priceScore = 10_000 / (effectivePrice + 1);
          let deliveryScore = 100 / (entry.deliveryDays + 1);
          let score = priceScore + deliveryScore;
          ?{
            distributorId = entry.distributorId;
            distributorName = dist.name;
            price = entry.price;
            stockQty = entry.stockQty;
            deliveryDays = entry.deliveryDays;
            discountPct = entry.discountPct;
            score;
          };
        };
      };
    }).toArray();
    // Sort descending by score
    offers.sort(func(a : Types.DistributorOffer, b : Types.DistributorOffer) : Order.Order {
      if (a.score > b.score) { #less } // reversed for descending
      else if (a.score < b.score) { #greater }
      else { #equal };
    });
  };

  public func createPurchaseOrder(
    orders : Map.Map<CommonTypes.OrderId, Types.PurchaseOrder>,
    distributors : Map.Map<CommonTypes.DistributorId, Types.Distributor>,
    state : { var nextOrderId : Nat },
    caller : CommonTypes.UserId,
    input : Types.PurchaseOrderInput,
  ) : Types.PurchaseOrder {
    let id = state.nextOrderId;
    state.nextOrderId += 1;
    let now = Time.now();
    let distributorName = switch (distributors.get(input.distributorId)) {
      case (?d) d.name;
      case null "Unknown Distributor";
    };
    let lines = input.lines.map(func(li) {
      let gross = li.unitPrice * li.qty;
      let lineTotal = gross - (gross * li.discountPct / 100);
      {
        medicineName = li.medicineName;
        medicineId = li.medicineId;
        distributorId = input.distributorId;
        qty = li.qty;
        unitPrice = li.unitPrice;
        discountPct = li.discountPct;
        lineTotal;
      };
    });
    let totalAmount = lines.foldLeft(0, func(acc, l) { acc + l.lineTotal });
    let order : Types.PurchaseOrder = {
      id;
      distributorId = input.distributorId;
      distributorName;
      lines;
      totalAmount;
      status = #pending;
      createdBy = caller;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(id, order);
    order;
  };

  public func updateOrderStatus(
    orders : Map.Map<CommonTypes.OrderId, Types.PurchaseOrder>,
    id : CommonTypes.OrderId,
    status : CommonTypes.OrderStatus,
  ) : ?Types.PurchaseOrder {
    switch (orders.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.PurchaseOrder = { existing with status; updatedAt = Time.now() };
        orders.add(id, updated);
        ?updated;
      };
    };
  };

  public func listOrders(
    orders : Map.Map<CommonTypes.OrderId, Types.PurchaseOrder>,
  ) : [Types.PurchaseOrder] {
    orders.values().toArray();
  };

  public func getOrder(
    orders : Map.Map<CommonTypes.OrderId, Types.PurchaseOrder>,
    id : CommonTypes.OrderId,
  ) : ?Types.PurchaseOrder {
    orders.get(id);
  };
}
