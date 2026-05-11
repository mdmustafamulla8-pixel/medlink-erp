import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InvoiceInput {
    customerName: string;
    lineItems: Array<LineItemInput>;
    isReturn: boolean;
    paymentMode: PaymentMode;
    customerId?: CustomerId;
    originalInvoiceId?: InvoiceId;
}
export interface OrderLineInput {
    qty: bigint;
    discountPct: bigint;
    unitPrice: bigint;
    medicineId?: MedicineId;
    medicineName: string;
}
export type Timestamp = bigint;
export type OrderId = bigint;
export interface MedicineInput {
    purchasePrice: bigint;
    lowStockThreshold: bigint;
    stockQty: bigint;
    name: string;
    rackLocation: string;
    hsnCode: string;
    genericName: string;
    barcodeId?: string;
    gstRate: GstRate;
    unitPrice: bigint;
}
export interface SalesSummary {
    gst18Total: bigint;
    gst5Total: bigint;
    totalGst: bigint;
    totalSales: bigint;
    gst12Total: bigint;
    totalReturns: bigint;
    netRevenue: bigint;
    totalInvoices: bigint;
}
export type BatchId = bigint;
export interface CustomerInput {
    gstNumber?: string;
    name: string;
    address?: string;
    phone?: string;
}
export interface BatchInput {
    qty: bigint;
    purchasePrice: bigint;
    expiryDate: Timestamp;
    batchNumber: string;
    medicineId: MedicineId;
}
export interface CatalogEntryInput {
    stockQty: bigint;
    deliveryDays: bigint;
    hsnCode: string;
    discountPct: bigint;
    price: bigint;
    medicineName: string;
}
export interface DistributorInput {
    gstNumber?: string;
    name: string;
    contactPerson: string;
    email?: string;
    address: string;
    phone: string;
}
export interface DistributorOffer {
    stockQty: bigint;
    deliveryDays: bigint;
    distributorName: string;
    distributorId: DistributorId;
    score: bigint;
    discountPct: bigint;
    price: bigint;
}
export type MedicineId = bigint;
export interface ExpiryAlert {
    qty: bigint;
    expiryDate: Timestamp;
    batchNumber: string;
    batchId: BatchId;
    medicineId: MedicineId;
    medicineName: string;
}
export interface Medicine {
    id: MedicineId;
    purchasePrice: bigint;
    lowStockThreshold: bigint;
    stockQty: bigint;
    name: string;
    createdAt: Timestamp;
    rackLocation: string;
    hsnCode: string;
    isActive: boolean;
    updatedAt: Timestamp;
    genericName: string;
    barcodeId?: string;
    gstRate: GstRate;
    unitPrice: bigint;
}
export interface PurchaseOrder {
    id: OrderId;
    status: OrderStatus;
    createdAt: Timestamp;
    createdBy: UserId;
    distributorName: string;
    distributorId: DistributorId;
    lines: Array<PurchaseOrderLine>;
    updatedAt: Timestamp;
    totalAmount: bigint;
}
export interface LineItemInput {
    qty: bigint;
    discountPct: bigint;
    batchId: BatchId;
    medicineId: MedicineId;
}
export interface DistributorCatalogEntry {
    stockQty: bigint;
    deliveryDays: bigint;
    hsnCode: string;
    distributorId: DistributorId;
    updatedAt: Timestamp;
    discountPct: bigint;
    price: bigint;
    medicineId?: MedicineId;
    medicineName: string;
}
export interface PurchaseOrderInput {
    distributorId: DistributorId;
    lines: Array<OrderLineInput>;
}
export interface Distributor {
    id: DistributorId;
    gstNumber?: string;
    name: string;
    createdAt: Timestamp;
    contactPerson: string;
    isActive: boolean;
    email?: string;
    address: string;
    phone: string;
}
export interface Invoice {
    id: InvoiceId;
    customerName: string;
    lineItems: Array<InvoiceLineItem>;
    createdAt: Timestamp;
    createdBy: UserId;
    isReturn: boolean;
    totalGst: bigint;
    invoiceNumber: string;
    totalAmount: bigint;
    paymentMode: PaymentMode;
    customerId?: CustomerId;
    originalInvoiceId?: InvoiceId;
    subtotal: bigint;
}
export interface Customer {
    id: CustomerId;
    gstNumber?: string;
    name: string;
    createdAt: Timestamp;
    address?: string;
    phone?: string;
}
export interface PurchaseOrderLine {
    qty: bigint;
    lineTotal: bigint;
    distributorId: DistributorId;
    discountPct: bigint;
    unitPrice: bigint;
    medicineId?: MedicineId;
    medicineName: string;
}
export type UserId = Principal;
export interface DateRange {
    toTime: Timestamp;
    fromTime: Timestamp;
}
export type DistributorId = bigint;
export type CustomerId = bigint;
export type InvoiceId = bigint;
export interface MedicineBatch {
    id: BatchId;
    qty: bigint;
    purchasePrice: bigint;
    expiryDate: Timestamp;
    createdAt: Timestamp;
    batchNumber: string;
    medicineId: MedicineId;
}
export interface LowStockAlert {
    threshold: bigint;
    currentStock: bigint;
    medicineId: MedicineId;
    medicineName: string;
}
export interface PurchaseSummary {
    totalOrders: bigint;
    pendingOrders: bigint;
    totalSpend: bigint;
    deliveredOrders: bigint;
}
export interface InvoiceLineItem {
    qty: bigint;
    lineTotal: bigint;
    gstAmount: bigint;
    discountPct: bigint;
    batchNumber: string;
    gstRate: GstRate;
    batchId: BatchId;
    unitPrice: bigint;
    medicineId: MedicineId;
    medicineName: string;
}
export interface GstBreakdown {
    taxableAmount: bigint;
    rate: GstRate;
    gstAmount: bigint;
}
export enum GstRate {
    gst5 = "gst5",
    gst12 = "gst12",
    gst18 = "gst18"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum PaymentMode {
    upi = "upi",
    card = "card",
    cash = "cash"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBatch(input: BatchInput): Promise<MedicineBatch>;
    addCustomer(input: CustomerInput): Promise<Customer>;
    addDistributor(input: DistributorInput): Promise<Distributor>;
    addMedicine(input: MedicineInput): Promise<Medicine>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bulkUpsertCatalog(distributorId: DistributorId, entries: Array<CatalogEntryInput>): Promise<bigint>;
    createInvoice(input: InvoiceInput): Promise<Invoice>;
    createPurchaseOrder(input: PurchaseOrderInput): Promise<PurchaseOrder>;
    deleteDistributor(id: DistributorId): Promise<boolean>;
    deleteMedicine(id: MedicineId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomer(id: CustomerId): Promise<Customer | null>;
    getCustomerLedger(customerId: CustomerId): Promise<Array<Invoice>>;
    getExpiringBatches(withinDays: bigint): Promise<Array<[MedicineBatch, Medicine]>>;
    getExpiryAlerts(withinDays: bigint): Promise<Array<ExpiryAlert>>;
    getGstBreakdown(range: DateRange): Promise<Array<GstBreakdown>>;
    getInvoice(id: InvoiceId): Promise<Invoice | null>;
    getLowStockAlerts(): Promise<Array<LowStockAlert>>;
    getLowStockMedicines(): Promise<Array<Medicine>>;
    getMedicine(id: MedicineId): Promise<Medicine | null>;
    getPurchaseOrder(id: OrderId): Promise<PurchaseOrder | null>;
    getPurchaseSummary(range: DateRange): Promise<PurchaseSummary>;
    getSalesSummary(range: DateRange): Promise<SalesSummary>;
    isCallerAdmin(): Promise<boolean>;
    listBatchesForMedicine(medicineId: MedicineId): Promise<Array<MedicineBatch>>;
    listCustomers(): Promise<Array<Customer>>;
    listDistributors(): Promise<Array<Distributor>>;
    listInvoices(): Promise<Array<Invoice>>;
    listMedicines(): Promise<Array<Medicine>>;
    listPurchaseOrders(): Promise<Array<PurchaseOrder>>;
    searchDistributorOffers(medicineName: string): Promise<Array<DistributorOffer>>;
    searchMedicines(term: string): Promise<Array<Medicine>>;
    updateDistributor(id: DistributorId, input: DistributorInput): Promise<Distributor | null>;
    updateMedicine(id: MedicineId, input: MedicineInput): Promise<Medicine | null>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<PurchaseOrder | null>;
    upsertCatalogEntry(distributorId: DistributorId, input: CatalogEntryInput): Promise<DistributorCatalogEntry>;
}
