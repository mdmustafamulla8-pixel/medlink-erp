module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type MedicineId = Nat;
  public type BatchId = Nat;
  public type DistributorId = Nat;
  public type OrderId = Nat;
  public type InvoiceId = Nat;
  public type CustomerId = Nat;

  public type GstRate = { #gst5; #gst12; #gst18 };

  public type PaymentMode = { #cash; #upi; #card };

  public type OrderStatus = { #pending; #confirmed; #shipped; #delivered; #cancelled };

  public type UserRole = { #admin; #pharmacist; #billingStaff; #manager; #distributor };
}
