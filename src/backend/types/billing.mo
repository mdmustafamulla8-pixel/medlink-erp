import CommonTypes "common";

module {
  public type InvoiceLineItem = {
    medicineId : CommonTypes.MedicineId;
    medicineName : Text;
    batchId : CommonTypes.BatchId;
    batchNumber : Text;
    qty : Nat;
    unitPrice : Nat;       // paisa
    gstRate : CommonTypes.GstRate;
    gstAmount : Nat;       // paisa
    discountPct : Nat;     // 0-100
    lineTotal : Nat;       // paisa (including GST, after discount)
  };

  public type Invoice = {
    id : CommonTypes.InvoiceId;
    invoiceNumber : Text;
    customerId : ?CommonTypes.CustomerId;
    customerName : Text;
    lineItems : [InvoiceLineItem];
    subtotal : Nat;      // paisa (pre-GST)
    totalGst : Nat;      // paisa
    totalAmount : Nat;   // paisa
    paymentMode : CommonTypes.PaymentMode;
    isReturn : Bool;
    originalInvoiceId : ?CommonTypes.InvoiceId; // for returns
    createdBy : CommonTypes.UserId;
    createdAt : CommonTypes.Timestamp;
  };

  public type Customer = {
    id : CommonTypes.CustomerId;
    name : Text;
    phone : ?Text;
    address : ?Text;
    gstNumber : ?Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type InvoiceInput = {
    customerId : ?CommonTypes.CustomerId;
    customerName : Text;
    lineItems : [LineItemInput];
    paymentMode : CommonTypes.PaymentMode;
    isReturn : Bool;
    originalInvoiceId : ?CommonTypes.InvoiceId;
  };

  public type LineItemInput = {
    medicineId : CommonTypes.MedicineId;
    batchId : CommonTypes.BatchId;
    qty : Nat;
    discountPct : Nat;
  };

  public type CustomerInput = {
    name : Text;
    phone : ?Text;
    address : ?Text;
    gstNumber : ?Text;
  };
}
