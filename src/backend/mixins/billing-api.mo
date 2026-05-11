import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import BillingTypes "../types/billing";
import InventoryTypes "../types/inventory";
import BillingLib "../lib/billing";

mixin (
  accessControlState : AccessControl.AccessControlState,
  invoices : Map.Map<CommonTypes.InvoiceId, BillingTypes.Invoice>,
  customers : Map.Map<CommonTypes.CustomerId, BillingTypes.Customer>,
  medicines : Map.Map<CommonTypes.MedicineId, InventoryTypes.Medicine>,
  batches : Map.Map<CommonTypes.BatchId, InventoryTypes.MedicineBatch>,
  billState : { var nextInvoiceId : Nat; var nextCustomerId : Nat },
) {
  public shared ({ caller }) func createInvoice(input : BillingTypes.InvoiceInput) : async BillingTypes.Invoice {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    BillingLib.createInvoice(invoices, medicines, batches, billState, caller, input);
  };

  public query func getInvoice(id : CommonTypes.InvoiceId) : async ?BillingTypes.Invoice {
    BillingLib.getInvoice(invoices, id);
  };

  public query func listInvoices() : async [BillingTypes.Invoice] {
    BillingLib.listInvoices(invoices);
  };

  public shared ({ caller }) func addCustomer(input : BillingTypes.CustomerInput) : async BillingTypes.Customer {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    BillingLib.addCustomer(customers, billState, input);
  };

  public query func getCustomer(id : CommonTypes.CustomerId) : async ?BillingTypes.Customer {
    BillingLib.getCustomer(customers, id);
  };

  public query func listCustomers() : async [BillingTypes.Customer] {
    BillingLib.listCustomers(customers);
  };

  public query func getCustomerLedger(customerId : CommonTypes.CustomerId) : async [BillingTypes.Invoice] {
    BillingLib.getCustomerLedger(invoices, customerId);
  };
}
