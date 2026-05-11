import { EmptyState } from "@/components/shared/EmptyState";
import { GstBadge } from "@/components/shared/GstBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddCustomer,
  useCreateInvoice,
  useGetInvoice,
  useListCustomers,
  useListInvoices,
} from "@/hooks/use-billing";
import { useSearchMedicines } from "@/hooks/use-inventory";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type {
  CartItem,
  Customer,
  Invoice,
  InvoiceLineItem,
  Medicine,
} from "@/types";
import { GstRate, PaymentMode } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Loader2,
  Minus,
  Phone,
  Plus,
  Printer,
  Receipt,
  RotateCcw,
  Search,
  ShoppingCart,
  Trash2,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const PAYMENT_LABELS: Record<PaymentMode, string> = {
  [PaymentMode.cash]: "Cash",
  [PaymentMode.upi]: "UPI",
  [PaymentMode.card]: "Card",
};

const GST_LABEL: Record<GstRate, string> = {
  [GstRate.gst5]: "5%",
  [GstRate.gst12]: "12%",
  [GstRate.gst18]: "18%",
};

const GST_RATE_NUM: Record<GstRate, number> = {
  [GstRate.gst5]: 5,
  [GstRate.gst12]: 12,
  [GstRate.gst18]: 18,
};

function computeGstAmount(
  lineTotal: bigint,
  discountPct: number,
  gstRate: string,
): bigint {
  const rate = GST_RATE_NUM[gstRate as GstRate] ?? 0;
  const discounted =
    lineTotal - (lineTotal * BigInt(discountPct)) / BigInt(100);
  return (discounted * BigInt(rate)) / BigInt(100);
}

function computeLineAfterDiscount(
  lineTotal: bigint,
  discountPct: number,
): bigint {
  return lineTotal - (lineTotal * BigInt(discountPct)) / BigInt(100);
}

function groupGst(items: CartItem[]): Record<string, bigint> {
  const map: Record<string, bigint> = {};
  for (const it of items) {
    const gst = computeGstAmount(it.lineTotal, it.discountPct, it.gstRate);
    map[it.gstRate] = (map[it.gstRate] ?? BigInt(0)) + gst;
  }
  return map;
}

// ─── Medicine Search Row ───────────────────────────────────────────────
function MedicineRow({
  med,
  onAdd,
  isSelected,
}: {
  med: Medicine;
  onAdd: (med: Medicine) => void;
  isSelected: boolean;
}) {
  return (
    <button
      type="button"
      aria-selected={isSelected}
      className={`w-full flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-accent/10 transition-colors rounded-md text-left ${
        isSelected ? "bg-accent/15 ring-1 ring-accent/40" : ""
      }`}
      onClick={() => onAdd(med)}
      data-ocid="billing.medicine_search_result"
    >
      <div className="min-w-0">
        <p className="font-semibold text-sm text-foreground truncate">
          {med.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {med.genericName}
        </p>
      </div>
      <div className="flex items-center gap-3 ml-2 shrink-0">
        <GstBadge rate={med.gstRate} />
        <div className="text-right">
          <p className="font-mono text-sm font-semibold text-accent">
            {formatCurrency(med.unitPrice)}
          </p>
          <p className="text-xs text-muted-foreground">
            Qty: {med.stockQty.toString()}
          </p>
        </div>
        <span
          className="h-7 w-7 rounded-full bg-accent/10 hover:bg-accent/20 text-accent inline-flex items-center justify-center"
          aria-label="Add to cart"
        >
          <Plus className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
}

// ─── Cart Item Row ─────────────────────────────────────────────────────
function CartRow({
  item,
  index,
  isSelected,
  onSelect,
  onQtyChange,
  onRemove,
}: {
  item: CartItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
}) {
  const lineAfterDisc = computeLineAfterDiscount(
    item.lineTotal,
    item.discountPct,
  );
  const gstAmt = computeGstAmount(
    item.lineTotal,
    item.discountPct,
    item.gstRate,
  );

  return (
    <button
      type="button"
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
        isSelected ? "bg-accent/10 ring-1 ring-accent/30" : "hover:bg-muted/30"
      }`}
      onClick={onSelect}
      data-ocid={`billing.cart.item.${index + 1}`}
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm truncate">{item.medicineName}</p>
        <p className="text-xs text-muted-foreground font-mono">
          {item.batchNumber}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded"
          onClick={(e) => {
            e.stopPropagation();
            if (item.qty > 1) onQtyChange(item.qty - 1);
          }}
          data-ocid={`billing.cart.qty_down.${index + 1}`}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <input
          type="number"
          min="1"
          max={9999}
          value={item.qty}
          className="w-10 text-center text-sm font-mono border border-input rounded bg-background focus:outline-none focus:ring-1 focus:ring-accent py-0.5"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const v = Number.parseInt(e.target.value);
            if (!Number.isNaN(v) && v > 0) onQtyChange(v);
          }}
          data-ocid={`billing.cart.qty_input.${index + 1}`}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onQtyChange(item.qty + 1);
          }}
          data-ocid={`billing.cart.qty_up.${index + 1}`}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      <div className="text-right shrink-0 min-w-[80px]">
        <p className="font-mono text-sm font-semibold">
          {formatCurrency(lineAfterDisc)}
        </p>
        <p className="text-xs text-muted-foreground">
          GST {formatCurrency(gstAmt)}
        </p>
      </div>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="h-6 w-6 text-destructive hover:bg-destructive/10 shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label="Remove item"
        data-ocid={`billing.cart.delete_button.${index + 1}`}
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </button>
  );
}

// ─── Return Dialog ─────────────────────────────────────────────────────
function ReturnDialog({
  invoice,
  open,
  onClose,
}: {
  invoice: Invoice;
  open: boolean;
  onClose: () => void;
}) {
  const createInvoice = useCreateInvoice();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const toggleItem = (idx: number) =>
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  const handleReturn = async () => {
    const lines = invoice.lineItems
      .filter((_, i) => selectedItems.has(i))
      .map((li) => ({
        medicineId: li.medicineId,
        batchId: li.batchId,
        qty: li.qty,
        discountPct: li.discountPct,
      }));
    if (lines.length === 0) {
      toast.error("Select at least one item to return");
      return;
    }
    try {
      const result = await createInvoice.mutateAsync({
        customerName: invoice.customerName,
        customerId: invoice.customerId,
        lineItems: lines,
        isReturn: true,
        paymentMode: invoice.paymentMode,
        originalInvoiceId: invoice.id,
      });
      toast.success(`Credit note ${result.invoiceNumber} created`);
      onClose();
    } catch {
      toast.error("Failed to create return");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="billing.return_dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-destructive" />
            Return / Refund — {invoice.invoiceNumber}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-2">
          Select items to return. A credit note will be created.
        </p>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {invoice.lineItems.map((li: InvoiceLineItem, i) => (
            <label
              key={`${li.medicineId.toString()}-${i}`}
              className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                selectedItems.has(i)
                  ? "bg-destructive/10 ring-1 ring-destructive/30"
                  : "hover:bg-muted/30"
              }`}
              data-ocid={`billing.return_item.${i + 1}`}
            >
              <input
                type="checkbox"
                checked={selectedItems.has(i)}
                onChange={() => toggleItem(i)}
                className="accent-destructive"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {li.medicineName}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {li.batchNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-semibold">
                  {formatCurrency(li.lineTotal)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {li.qty.toString()}
                </p>
              </div>
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="billing.return_dialog.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleReturn}
            disabled={createInvoice.isPending || selectedItems.size === 0}
            data-ocid="billing.return_dialog.confirm_button"
          >
            {createInvoice.isPending ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4 mr-1.5" />
            )}
            Process Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── New Customer Dialog ───────────────────────────────────────────────
function NewCustomerDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (c: Customer) => void;
}) {
  const addCustomer = useAddCustomer();
  const [form, setForm] = useState({ name: "", phone: "", gstNumber: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Customer name is required");
      return;
    }
    try {
      const c = await addCustomer.mutateAsync({
        name: form.name.trim(),
        phone: form.phone.trim() || undefined,
        gstNumber: form.gstNumber.trim() || undefined,
      });
      onCreated(c);
      toast.success(`Customer ${c.name} added`);
      setForm({ name: "", phone: "", gstNumber: "" });
    } catch {
      toast.error("Failed to add customer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-sm"
        data-ocid="billing.new_customer_dialog"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-4 h-4 text-accent" />
            Add New Customer
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="cust-name">Name *</Label>
            <Input
              id="cust-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Customer name"
              autoFocus
              data-ocid="billing.new_customer_dialog.name_input"
            />
          </div>
          <div>
            <Label htmlFor="cust-phone">Phone</Label>
            <Input
              id="cust-phone"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="+91 98765 43210"
              data-ocid="billing.new_customer_dialog.phone_input"
            />
          </div>
          <div>
            <Label htmlFor="cust-gst">GST Number</Label>
            <Input
              id="cust-gst"
              value={form.gstNumber}
              onChange={(e) =>
                setForm((f) => ({ ...f, gstNumber: e.target.value }))
              }
              placeholder="29ABCDE1234F1Z5"
              data-ocid="billing.new_customer_dialog.gst_input"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="billing.new_customer_dialog.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={addCustomer.isPending}
              data-ocid="billing.new_customer_dialog.submit_button"
            >
              {addCustomer.isPending && (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              )}
              Add Customer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Print Invoice ─────────────────────────────────────────────────────
function printInvoice(invoice: Invoice) {
  const lines = invoice.lineItems
    .map(
      (li: InvoiceLineItem, i: number) =>
        `<tr style="border-bottom:1px solid #e5e7eb">
          <td style="padding:6px 8px">${i + 1}</td>
          <td style="padding:6px 8px">${li.medicineName}</td>
          <td style="padding:6px 8px">${li.batchNumber}</td>
          <td style="padding:6px 8px;text-align:center">${li.qty.toString()}</td>
          <td style="padding:6px 8px;text-align:right">₹${(Number(li.unitPrice) / 100).toFixed(2)}</td>
          <td style="padding:6px 8px;text-align:center">${GST_LABEL[li.gstRate] ?? ""}</td>
          <td style="padding:6px 8px;text-align:right">₹${(Number(li.gstAmount) / 100).toFixed(2)}</td>
          <td style="padding:6px 8px;text-align:right;font-weight:600">₹${(Number(li.lineTotal) / 100).toFixed(2)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html><html><head><title>Invoice ${invoice.invoiceNumber}</title>
  <style>body{font-family:sans-serif;padding:32px;color:#111} table{width:100%;border-collapse:collapse} th{background:#f3f4f6;padding:8px;text-align:left;font-size:12px;text-transform:uppercase}</style>
  </head><body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px">
    <div><h1 style="margin:0;font-size:24px;color:#0d9488">MedLink ERP</h1><p style="margin:4px 0 0;color:#6b7280;font-size:13px">Tax Invoice</p></div>
    <div style="text-align:right"><p style="font-weight:700;font-size:15px;margin:0">${invoice.invoiceNumber}</p><p style="color:#6b7280;font-size:13px;margin:4px 0 0">${formatDate(invoice.createdAt)}</p></div>
  </div>
  <div style="margin-bottom:16px;padding:12px;background:#f9fafb;border-radius:6px">
    <p style="margin:0;font-weight:600">Customer: ${invoice.customerName}</p>
    <p style="margin:4px 0 0;color:#6b7280;font-size:13px">Payment: ${PAYMENT_LABELS[invoice.paymentMode]}${invoice.isReturn ? " | CREDIT NOTE" : ""}</p>
  </div>
  <table><thead><tr><th>#</th><th>Medicine</th><th>Batch</th><th>Qty</th><th>Rate</th><th>GST%</th><th>GST Amt</th><th>Total</th></tr></thead>
  <tbody>${lines}</tbody></table>
  <div style="margin-top:24px;text-align:right">
    <p>Subtotal: <strong>₹${(Number(invoice.subtotal) / 100).toFixed(2)}</strong></p>
    <p>GST: <strong>₹${(Number(invoice.totalGst) / 100).toFixed(2)}</strong></p>
    <p style="font-size:20px;font-weight:700;color:#0d9488">Grand Total: ₹${(Number(invoice.totalAmount) / 100).toFixed(2)}</p>
  </div>
  <p style="margin-top:32px;color:#9ca3af;font-size:12px;text-align:center">Thank you for your business. Generated by MedLink ERP</p>
  </body></html>`;

  const win = window.open("", "_blank", "width=800,height=900");
  if (win) {
    win.document.write(html);
    win.document.close();
    win.print();
  }
}

// ─── BillingPage ───────────────────────────────────────────────────────
export default function BillingPage() {
  // Search
  const [medQuery, setMedQuery] = useState("");
  const [selectedMedIdx, setSelectedMedIdx] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const { data: searchResults, isFetching: searchFetching } =
    useSearchMedicines(medQuery);

  // Cart
  const {
    items,
    addItem,
    removeItem,
    updateQty,
    setCustomer,
    setPaymentMode,
    paymentMode,
    customerName,
    clearCart,
  } = useCartStore();
  const [selectedCartIdx, setSelectedCartIdx] = useState<number | null>(null);

  // Customer
  const { data: customers } = useListCustomers();
  const [custQuery, setCustQuery] = useState("");
  const [showCustDropdown, setShowCustDropdown] = useState(false);
  const [newCustOpen, setNewCustOpen] = useState(false);
  const custInputRef = useRef<HTMLInputElement>(null);

  // Invoice creation
  const createInvoice = useCreateInvoice();
  const [lastInvoice, setLastInvoice] = useState<Invoice | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  // Recent invoices
  const { data: invoices, isLoading: invoicesLoading } = useListInvoices();
  const recentInvoices = (invoices ?? []).slice(0, 10);
  const [returnInvoice, setReturnInvoice] = useState<Invoice | null>(null);

  // GST totals
  const gstMap = groupGst(items);
  const subtotal = items.reduce(
    (s, i) => s + computeLineAfterDiscount(i.lineTotal, i.discountPct),
    BigInt(0),
  );
  const totalGst = Object.values(gstMap).reduce((s, v) => s + v, BigInt(0));
  const grandTotal = subtotal + totalGst;

  // Customer filter
  const filteredCustomers = (customers ?? []).filter(
    (c) =>
      c.name.toLowerCase().includes(custQuery.toLowerCase()) ||
      (c.phone ?? "").includes(custQuery),
  );

  // Add medicine to cart
  const handleAddMedicine = useCallback(
    (med: Medicine) => {
      addItem({
        medicineId: med.id,
        medicineName: med.name,
        batchId: BigInt(0),
        batchNumber: "DEFAULT",
        unitPrice: med.unitPrice,
        qty: 1,
        discountPct: 0,
        gstRate: med.gstRate,
        lineTotal: med.unitPrice,
      });
      setMedQuery("");
      setSelectedMedIdx(0);
      searchRef.current?.focus();
      toast.success(`${med.name} added to cart`);
    },
    [addItem],
  );

  // Generate bill
  const handleGenerateBill = async () => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (!customerName.trim()) {
      toast.error("Please select or enter a customer name");
      custInputRef.current?.focus();
      return;
    }
    try {
      const invoice = await createInvoice.mutateAsync({
        customerName: customerName.trim(),
        lineItems: items.map((it) => ({
          medicineId: it.medicineId,
          batchId: it.batchId,
          qty: BigInt(it.qty),
          discountPct: BigInt(it.discountPct),
        })),
        isReturn: false,
        paymentMode:
          paymentMode === "cash"
            ? PaymentMode.cash
            : paymentMode === "upi"
              ? PaymentMode.upi
              : PaymentMode.card,
      });
      setLastInvoice(invoice);
      setSuccessOpen(true);
      clearCart();
      setCustQuery("");
    } catch {
      toast.error("Failed to generate invoice");
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+P → print last invoice
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        if (lastInvoice) printInvoice(lastInvoice);
        else toast.info("No recent invoice to print");
        return;
      }
      // Delete → remove selected cart item
      if (
        e.key === "Delete" &&
        selectedCartIdx !== null &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        const item = items[selectedCartIdx];
        if (item) removeItem(item.medicineId, item.batchId);
        setSelectedCartIdx(null);
        return;
      }
      // Enter in search → add highlighted medicine
      if (e.key === "Enter" && document.activeElement === searchRef.current) {
        const results = searchResults ?? [];
        if (results[selectedMedIdx]) handleAddMedicine(results[selectedMedIdx]);
        return;
      }
      // Arrow keys in search dropdown
      if (document.activeElement === searchRef.current) {
        const results = searchResults ?? [];
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedMedIdx((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedMedIdx((i) => Math.max(i - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    selectedCartIdx,
    items,
    removeItem,
    lastInvoice,
    searchResults,
    selectedMedIdx,
    handleAddMedicine,
  ]);

  return (
    <div data-ocid="billing.page" className="flex flex-col h-full">
      <PageHeader
        title="Billing"
        subtitle="Fast pharmacy billing — F1 for shortcuts, Enter to add, Delete to remove"
        actions={
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <Badge className="bg-accent text-accent-foreground font-mono">
                <ShoppingCart className="w-3 h-3 mr-1" />
                {items.length} items
              </Badge>
            )}
            {lastInvoice && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => lastInvoice && printInvoice(lastInvoice)}
                data-ocid="billing.print_button"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                Print Last
                <kbd className="ml-1.5 text-[10px] bg-muted px-1 py-0.5 rounded font-mono">
                  Ctrl+P
                </kbd>
              </Button>
            )}
          </div>
        }
      />

      {/* ── SPLIT PANEL ─────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 gap-0">
        {/* LEFT: Medicine Search */}
        <div className="flex flex-col w-[55%] border-r border-border min-h-0">
          <div className="p-4 border-b border-border bg-card">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
              Add Medicines
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchRef}
                type="text"
                value={medQuery}
                onChange={(e) => {
                  setMedQuery(e.target.value);
                  setSelectedMedIdx(0);
                }}
                placeholder="Search medicine by name… (Enter to add)"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/40 font-body"
                autoComplete="off"
                data-ocid="billing.medicine_search_input"
              />
              {searchFetching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {medQuery.length > 1 ? (
              searchFetching ? (
                <div className="space-y-1.5">
                  {["a", "b", "c", "d"].map((k) => (
                    <Skeleton key={k} className="h-14 rounded-md" />
                  ))}
                </div>
              ) : (searchResults ?? []).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="w-8 h-8 text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No medicines found for &quot;{medQuery}&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {(searchResults ?? []).map((med, i) => (
                    <MedicineRow
                      key={med.id.toString()}
                      med={med}
                      onAdd={handleAddMedicine}
                      isSelected={i === selectedMedIdx}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <Receipt className="w-12 h-12 text-accent/30 mb-4" />
                <p className="font-semibold text-foreground/60 mb-1">
                  Start typing to search medicines
                </p>
                <p className="text-xs text-muted-foreground">
                  Use <kbd className="bg-muted px-1 rounded font-mono">↑↓</kbd>{" "}
                  to navigate,{" "}
                  <kbd className="bg-muted px-1 rounded font-mono">Enter</kbd>{" "}
                  to add
                </p>
              </div>
            )}
          </div>

          {/* Customer + Payment */}
          <div className="border-t border-border bg-card p-4 space-y-3">
            <div className="relative">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block">
                Customer
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    ref={custInputRef}
                    type="text"
                    value={custQuery || customerName}
                    onChange={(e) => {
                      setCustQuery(e.target.value);
                      setCustomer(e.target.value);
                      setShowCustDropdown(true);
                    }}
                    onFocus={() => setShowCustDropdown(true)}
                    onBlur={() =>
                      setTimeout(() => setShowCustDropdown(false), 150)
                    }
                    placeholder="Search or type customer name…"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/40"
                    data-ocid="billing.customer_search_input"
                  />
                  {showCustDropdown && filteredCustomers.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-elevated max-h-40 overflow-y-auto">
                      {filteredCustomers.slice(0, 6).map((c) => (
                        <button
                          type="button"
                          key={c.id.toString()}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent/10 text-left transition-colors"
                          onClick={() => {
                            setCustomer(c.name, c.id);
                            setCustQuery("");
                            setShowCustDropdown(false);
                          }}
                          data-ocid="billing.customer_option"
                        >
                          <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {c.name}
                            </p>
                            {c.phone && (
                              <p className="text-xs text-muted-foreground">
                                {c.phone}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setNewCustOpen(true)}
                  data-ocid="billing.add_customer_button"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
                Payment Mode
              </Label>
              <div className="flex gap-2">
                {(["cash", "upi", "card"] as const).map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      paymentMode === mode
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border hover:bg-muted/50"
                    }`}
                    data-ocid={`billing.payment_mode.${mode}`}
                  >
                    {mode === "cash" && <Wallet className="w-3.5 h-3.5" />}
                    {mode === "upi" && <Phone className="w-3.5 h-3.5" />}
                    {mode === "card" && <CreditCard className="w-3.5 h-3.5" />}
                    {
                      PAYMENT_LABELS[
                        mode === "cash"
                          ? PaymentMode.cash
                          : mode === "upi"
                            ? PaymentMode.upi
                            : PaymentMode.card
                      ]
                    }
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Cart */}
        <div className="flex flex-col w-[45%] min-h-0 bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Current Bill
              </h2>
              {items.length > 0 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 text-xs"
                  onClick={() => {
                    clearCart();
                    setSelectedCartIdx(null);
                  }}
                  data-ocid="billing.clear_cart_button"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3">
            {items.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-full py-12 text-center"
                data-ocid="billing.cart.empty_state"
              >
                <ShoppingCart className="w-12 h-12 text-accent/30 mb-4" />
                <p className="font-semibold text-foreground/60">
                  Cart is empty
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Search and add medicines from the left panel
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {items.map((item, idx) => (
                  <CartRow
                    key={`${item.medicineId.toString()}-${item.batchId.toString()}`}
                    item={item}
                    index={idx}
                    isSelected={selectedCartIdx === idx}
                    onSelect={() =>
                      setSelectedCartIdx(selectedCartIdx === idx ? null : idx)
                    }
                    onQtyChange={(qty) =>
                      updateQty(item.medicineId, item.batchId, qty)
                    }
                    onRemove={() => {
                      removeItem(item.medicineId, item.batchId);
                      setSelectedCartIdx(null);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="border-t border-border p-4 space-y-2 bg-background">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono font-medium">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              {Object.entries(gstMap).map(([rate, amount]) => (
                <div key={rate} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    GST {GST_LABEL[rate as GstRate] ?? rate}
                  </span>
                  <span className="font-mono">{formatCurrency(amount)}</span>
                </div>
              ))}
              <Separator className="my-1" />
              <div className="flex justify-between items-baseline">
                <span className="font-display font-bold text-lg">
                  Grand Total
                </span>
                <span
                  className="font-display font-bold text-2xl text-accent"
                  data-ocid="billing.cart.grand_total"
                >
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base py-5 shadow-elevated"
              disabled={items.length === 0 || createInvoice.isPending}
              onClick={handleGenerateBill}
              data-ocid="billing.generate_bill_button"
            >
              {createInvoice.isPending ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Receipt className="w-5 h-5 mr-2" />
              )}
              Generate Bill
            </Button>
          </div>
        </div>
      </div>

      {/* ── RECENT INVOICES ──────────────────────────────────────── */}
      <div className="border-t border-border bg-background">
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Recent Bills
          </h2>
          <span className="text-xs text-muted-foreground">
            Last 10 invoices
          </span>
        </div>
        <div className="px-4 pb-4">
          {invoicesLoading ? (
            <div className="space-y-1.5">
              {["a", "b", "c"].map((k) => (
                <Skeleton key={k} className="h-12 rounded-md" />
              ))}
            </div>
          ) : recentInvoices.length === 0 ? (
            <EmptyState
              icon={<Receipt className="w-6 h-6" />}
              title="No invoices yet"
              description="Generated invoices will appear here"
              data-ocid="billing.recent.empty_state"
            />
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">
                        Invoice #
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">
                        Customer
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">
                        Date
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">
                        Payment
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
                        Amount
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">
                        Type
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentInvoices.map((inv, idx) => (
                      <TableRow
                        key={inv.id.toString()}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid={`billing.recent.item.${idx + 1}`}
                      >
                        <TableCell className="font-mono text-sm font-semibold text-accent">
                          {inv.invoiceNumber}
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          {inv.customerName}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(inv.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {PAYMENT_LABELS[inv.paymentMode]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-sm">
                          {formatCurrency(inv.totalAmount)}
                        </TableCell>
                        <TableCell>
                          {inv.isReturn ? (
                            <Badge
                              variant="secondary"
                              className="bg-destructive/15 text-destructive text-xs"
                            >
                              Return
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-accent/15 text-accent text-xs"
                            >
                              Sale
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() => printInvoice(inv)}
                              aria-label="Print invoice"
                              data-ocid={`billing.recent.print_button.${idx + 1}`}
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </Button>
                            {!inv.isReturn && (
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                onClick={() => setReturnInvoice(inv)}
                                aria-label="Return invoice"
                                data-ocid={`billing.recent.return_button.${idx + 1}`}
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* ── SUCCESS DIALOG ───────────────────────────────────────── */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-sm" data-ocid="billing.success_dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-accent">
              <CheckCircle2 className="w-5 h-5" />
              Invoice Generated!
            </DialogTitle>
          </DialogHeader>
          {lastInvoice && (
            <div className="space-y-3">
              <div className="bg-accent/10 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Invoice Number
                </p>
                <p className="font-display font-bold text-2xl text-accent mt-1">
                  {lastInvoice.invoiceNumber}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {lastInvoice.customerName}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Grand Total</span>
                <span className="font-mono font-bold text-lg">
                  {formatCurrency(lastInvoice.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Mode</span>
                <Badge variant="secondary">
                  {PAYMENT_LABELS[lastInvoice.paymentMode]}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSuccessOpen(false)}
              data-ocid="billing.success_dialog.close_button"
            >
              Close
            </Button>
            <Button
              type="button"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => {
                if (lastInvoice) printInvoice(lastInvoice);
                setSuccessOpen(false);
              }}
              data-ocid="billing.success_dialog.print_button"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── RETURN DIALOG ────────────────────────────────────────── */}
      {returnInvoice && (
        <ReturnDialog
          invoice={returnInvoice}
          open={!!returnInvoice}
          onClose={() => setReturnInvoice(null)}
        />
      )}

      {/* ── NEW CUSTOMER DIALOG ──────────────────────────────────── */}
      <NewCustomerDialog
        open={newCustOpen}
        onClose={() => setNewCustOpen(false)}
        onCreated={(c) => {
          setCustomer(c.name, c.id);
          setNewCustOpen(false);
        }}
      />
    </div>
  );
}
