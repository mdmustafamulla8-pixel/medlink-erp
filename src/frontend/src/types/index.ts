import type { Principal } from "@icp-sdk/core/principal";

// Re-export backend types
export type {
  Medicine,
  MedicineBatch,
  Invoice,
  Customer,
  Distributor,
  DistributorCatalogEntry,
  PurchaseOrder,
  DistributorOffer,
  SalesSummary,
  LowStockAlert,
  ExpiryAlert,
  PurchaseSummary,
  GstBreakdown,
  InvoiceLineItem,
  PurchaseOrderLine,
  InvoiceInput,
  LineItemInput,
  MedicineInput,
  BatchInput,
  CustomerInput,
  DistributorInput,
  PurchaseOrderInput,
  OrderLineInput,
  CatalogEntryInput,
  DateRange,
  MedicineId,
  InvoiceId,
  DistributorId,
  CustomerId,
  OrderId,
  BatchId,
  Timestamp,
  UserId,
} from "../backend.d";

export { GstRate, OrderStatus, PaymentMode, UserRole } from "../backend.d";

// App-level types
export type UserProfile = {
  principal: Principal;
  role: "admin" | "user" | "guest";
};

export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: string;
  shortcut?: string;
};

export type CartItem = {
  medicineId: bigint;
  medicineName: string;
  batchId: bigint;
  batchNumber: string;
  unitPrice: bigint;
  qty: number;
  discountPct: number;
  gstRate: string;
  lineTotal: bigint;
};

export type AlertSeverity = "critical" | "warning" | "info";

export type SortDirection = "asc" | "desc";
