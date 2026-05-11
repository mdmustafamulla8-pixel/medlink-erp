import { c as createLucideIcon, a0 as create, r as reactExports, a1 as useSearchMedicines, Q as ue, j as jsxRuntimeExports, k as Badge, S as ShoppingCart, B as Button, e as Skeleton, a2 as Receipt, a3 as User, f as formatCurrency, g as formatDate } from "./index-D0FyCSZw.js";
import { S as Search, E as EmptyState, X, I as Input } from "./EmptyState-npLLL3hK.js";
import { L as LoaderCircle, G as GstBadge } from "./GstBadge-CuVQbrhK.js";
import { P as PageHeader, C as Card, c as CardContent } from "./card-CplIUq9W.js";
import { h as Trash2, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, i as DialogFooter } from "./dialog-DJRBC0Pt.js";
import { L as Label } from "./label-B4RMIk0y.js";
import { S as Separator } from "./separator-C3FgS4EG.js";
import { P as Plus, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DQV2SG5I.js";
import { a as useListCustomers, b as useCreateInvoice, u as useListInvoices, c as useAddCustomer } from "./use-billing-CnOJDgbb.js";
import { P as PaymentMode, G as GstRate } from "./backend.d-C24xlPzP.js";
import { P as Phone } from "./phone-D27ShdRQ.js";
import { C as CircleCheck } from "./circle-check-B1iJUzE_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const useCartStore = create()((set, get) => ({
  items: [],
  customerName: "",
  customerId: void 0,
  paymentMode: "cash",
  addItem: (item) => set((state) => {
    const existing = state.items.find(
      (i) => i.medicineId === item.medicineId && i.batchId === item.batchId
    );
    if (existing) {
      return {
        items: state.items.map(
          (i) => i.medicineId === item.medicineId && i.batchId === item.batchId ? {
            ...i,
            qty: i.qty + item.qty,
            lineTotal: i.unitPrice * BigInt(i.qty + item.qty)
          } : i
        )
      };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (medicineId, batchId) => set((state) => ({
    items: state.items.filter(
      (i) => !(i.medicineId === medicineId && i.batchId === batchId)
    )
  })),
  updateQty: (medicineId, batchId, qty) => set((state) => ({
    items: state.items.map(
      (i) => i.medicineId === medicineId && i.batchId === batchId ? { ...i, qty, lineTotal: i.unitPrice * BigInt(qty) } : i
    )
  })),
  updateDiscount: (medicineId, batchId, discountPct) => set((state) => ({
    items: state.items.map(
      (i) => i.medicineId === medicineId && i.batchId === batchId ? { ...i, discountPct } : i
    )
  })),
  clearCart: () => set({
    items: [],
    customerName: "",
    customerId: void 0,
    paymentMode: "cash"
  }),
  setCustomer: (name, id) => set({ customerName: name, customerId: id }),
  setPaymentMode: (mode) => set({ paymentMode: mode }),
  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + i.lineTotal, BigInt(0));
  },
  getTotal: () => {
    const { items } = get();
    return items.reduce((sum, i) => {
      const disc = i.lineTotal * BigInt(i.discountPct) / BigInt(100);
      return sum + i.lineTotal - disc;
    }, BigInt(0));
  }
}));
const PAYMENT_LABELS = {
  [PaymentMode.cash]: "Cash",
  [PaymentMode.upi]: "UPI",
  [PaymentMode.card]: "Card"
};
const GST_LABEL = {
  [GstRate.gst5]: "5%",
  [GstRate.gst12]: "12%",
  [GstRate.gst18]: "18%"
};
const GST_RATE_NUM = {
  [GstRate.gst5]: 5,
  [GstRate.gst12]: 12,
  [GstRate.gst18]: 18
};
function computeGstAmount(lineTotal, discountPct, gstRate) {
  const rate = GST_RATE_NUM[gstRate] ?? 0;
  const discounted = lineTotal - lineTotal * BigInt(discountPct) / BigInt(100);
  return discounted * BigInt(rate) / BigInt(100);
}
function computeLineAfterDiscount(lineTotal, discountPct) {
  return lineTotal - lineTotal * BigInt(discountPct) / BigInt(100);
}
function groupGst(items) {
  const map = {};
  for (const it of items) {
    const gst = computeGstAmount(it.lineTotal, it.discountPct, it.gstRate);
    map[it.gstRate] = (map[it.gstRate] ?? BigInt(0)) + gst;
  }
  return map;
}
function MedicineRow({
  med,
  onAdd,
  isSelected
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "aria-selected": isSelected,
      className: `w-full flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-accent/10 transition-colors rounded-md text-left ${isSelected ? "bg-accent/15 ring-1 ring-accent/40" : ""}`,
      onClick: () => onAdd(med),
      "data-ocid": "billing.medicine_search_result",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: med.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: med.genericName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 ml-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GstBadge, { rate: med.gstRate }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold text-accent", children: formatCurrency(med.unitPrice) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Qty: ",
              med.stockQty.toString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-7 w-7 rounded-full bg-accent/10 hover:bg-accent/20 text-accent inline-flex items-center justify-center",
              "aria-label": "Add to cart",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function CartRow({
  item,
  index,
  isSelected,
  onSelect,
  onQtyChange,
  onRemove
}) {
  const lineAfterDisc = computeLineAfterDiscount(
    item.lineTotal,
    item.discountPct
  );
  const gstAmt = computeGstAmount(
    item.lineTotal,
    item.discountPct,
    item.gstRate
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${isSelected ? "bg-accent/10 ring-1 ring-accent/30" : "hover:bg-muted/30"}`,
      onClick: onSelect,
      "data-ocid": `billing.cart.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: item.medicineName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: item.batchNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "icon",
              variant: "ghost",
              className: "h-6 w-6 rounded",
              onClick: (e) => {
                e.stopPropagation();
                if (item.qty > 1) onQtyChange(item.qty - 1);
              },
              "data-ocid": `billing.cart.qty_down.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: "1",
              max: 9999,
              value: item.qty,
              className: "w-10 text-center text-sm font-mono border border-input rounded bg-background focus:outline-none focus:ring-1 focus:ring-accent py-0.5",
              onClick: (e) => e.stopPropagation(),
              onChange: (e) => {
                const v = Number.parseInt(e.target.value);
                if (!Number.isNaN(v) && v > 0) onQtyChange(v);
              },
              "data-ocid": `billing.cart.qty_input.${index + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "icon",
              variant: "ghost",
              className: "h-6 w-6 rounded",
              onClick: (e) => {
                e.stopPropagation();
                onQtyChange(item.qty + 1);
              },
              "data-ocid": `billing.cart.qty_up.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 min-w-[80px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold", children: formatCurrency(lineAfterDisc) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "GST ",
            formatCurrency(gstAmt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "icon",
            variant: "ghost",
            className: "h-6 w-6 text-destructive hover:bg-destructive/10 shrink-0",
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            "aria-label": "Remove item",
            "data-ocid": `billing.cart.delete_button.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ]
    }
  );
}
function ReturnDialog({
  invoice,
  open,
  onClose
}) {
  const createInvoice = useCreateInvoice();
  const [selectedItems, setSelectedItems] = reactExports.useState(/* @__PURE__ */ new Set());
  const toggleItem = (idx) => setSelectedItems((prev) => {
    const next = new Set(prev);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    return next;
  });
  const handleReturn = async () => {
    const lines = invoice.lineItems.filter((_, i) => selectedItems.has(i)).map((li) => ({
      medicineId: li.medicineId,
      batchId: li.batchId,
      qty: li.qty,
      discountPct: li.discountPct
    }));
    if (lines.length === 0) {
      ue.error("Select at least one item to return");
      return;
    }
    try {
      const result = await createInvoice.mutateAsync({
        customerName: invoice.customerName,
        customerId: invoice.customerId,
        lineItems: lines,
        isReturn: true,
        paymentMode: invoice.paymentMode,
        originalInvoiceId: invoice.id
      });
      ue.success(`Credit note ${result.invoiceNumber} created`);
      onClose();
    } catch {
      ue.error("Failed to create return");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "billing.return_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 text-destructive" }),
      "Return / Refund — ",
      invoice.invoiceNumber
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Select items to return. A credit note will be created." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 max-h-64 overflow-y-auto", children: invoice.lineItems.map((li, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        className: `flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${selectedItems.has(i) ? "bg-destructive/10 ring-1 ring-destructive/30" : "hover:bg-muted/30"}`,
        "data-ocid": `billing.return_item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: selectedItems.has(i),
              onChange: () => toggleItem(i),
              className: "accent-destructive"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: li.medicineName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: li.batchNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-semibold", children: formatCurrency(li.lineTotal) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Qty: ",
              li.qty.toString()
            ] })
          ] })
        ]
      },
      `${li.medicineId.toString()}-${i}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "billing.return_dialog.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "destructive",
          onClick: handleReturn,
          disabled: createInvoice.isPending || selectedItems.size === 0,
          "data-ocid": "billing.return_dialog.confirm_button",
          children: [
            createInvoice.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-1.5" }),
            "Process Return"
          ]
        }
      )
    ] })
  ] }) });
}
function NewCustomerDialog({
  open,
  onClose,
  onCreated
}) {
  const addCustomer = useAddCustomer();
  const [form, setForm] = reactExports.useState({ name: "", phone: "", gstNumber: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      ue.error("Customer name is required");
      return;
    }
    try {
      const c = await addCustomer.mutateAsync({
        name: form.name.trim(),
        phone: form.phone.trim() || void 0,
        gstNumber: form.gstNumber.trim() || void 0
      });
      onCreated(c);
      ue.success(`Customer ${c.name} added`);
      setForm({ name: "", phone: "", gstNumber: "" });
    } catch {
      ue.error("Failed to add customer");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm",
      "data-ocid": "billing.new_customer_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-accent" }),
          "Add New Customer"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cust-name", children: "Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cust-name",
                value: form.name,
                onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                placeholder: "Customer name",
                autoFocus: true,
                "data-ocid": "billing.new_customer_dialog.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cust-phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cust-phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                placeholder: "+91 98765 43210",
                "data-ocid": "billing.new_customer_dialog.phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cust-gst", children: "GST Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cust-gst",
                value: form.gstNumber,
                onChange: (e) => setForm((f) => ({ ...f, gstNumber: e.target.value })),
                placeholder: "29ABCDE1234F1Z5",
                "data-ocid": "billing.new_customer_dialog.gst_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "billing.new_customer_dialog.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                className: "bg-accent hover:bg-accent/90 text-accent-foreground",
                disabled: addCustomer.isPending,
                "data-ocid": "billing.new_customer_dialog.submit_button",
                children: [
                  addCustomer.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-1.5 animate-spin" }),
                  "Add Customer"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function printInvoice(invoice) {
  const lines = invoice.lineItems.map(
    (li, i) => `<tr style="border-bottom:1px solid #e5e7eb">
          <td style="padding:6px 8px">${i + 1}</td>
          <td style="padding:6px 8px">${li.medicineName}</td>
          <td style="padding:6px 8px">${li.batchNumber}</td>
          <td style="padding:6px 8px;text-align:center">${li.qty.toString()}</td>
          <td style="padding:6px 8px;text-align:right">₹${(Number(li.unitPrice) / 100).toFixed(2)}</td>
          <td style="padding:6px 8px;text-align:center">${GST_LABEL[li.gstRate] ?? ""}</td>
          <td style="padding:6px 8px;text-align:right">₹${(Number(li.gstAmount) / 100).toFixed(2)}</td>
          <td style="padding:6px 8px;text-align:right;font-weight:600">₹${(Number(li.lineTotal) / 100).toFixed(2)}</td>
        </tr>`
  ).join("");
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
function BillingPage() {
  const [medQuery, setMedQuery] = reactExports.useState("");
  const [selectedMedIdx, setSelectedMedIdx] = reactExports.useState(0);
  const searchRef = reactExports.useRef(null);
  const { data: searchResults, isFetching: searchFetching } = useSearchMedicines(medQuery);
  const {
    items,
    addItem,
    removeItem,
    updateQty,
    setCustomer,
    setPaymentMode,
    paymentMode,
    customerName,
    clearCart
  } = useCartStore();
  const [selectedCartIdx, setSelectedCartIdx] = reactExports.useState(null);
  const { data: customers } = useListCustomers();
  const [custQuery, setCustQuery] = reactExports.useState("");
  const [showCustDropdown, setShowCustDropdown] = reactExports.useState(false);
  const [newCustOpen, setNewCustOpen] = reactExports.useState(false);
  const custInputRef = reactExports.useRef(null);
  const createInvoice = useCreateInvoice();
  const [lastInvoice, setLastInvoice] = reactExports.useState(null);
  const [successOpen, setSuccessOpen] = reactExports.useState(false);
  const { data: invoices, isLoading: invoicesLoading } = useListInvoices();
  const recentInvoices = (invoices ?? []).slice(0, 10);
  const [returnInvoice, setReturnInvoice] = reactExports.useState(null);
  const gstMap = groupGst(items);
  const subtotal = items.reduce(
    (s, i) => s + computeLineAfterDiscount(i.lineTotal, i.discountPct),
    BigInt(0)
  );
  const totalGst = Object.values(gstMap).reduce((s, v) => s + v, BigInt(0));
  const grandTotal = subtotal + totalGst;
  const filteredCustomers = (customers ?? []).filter(
    (c) => c.name.toLowerCase().includes(custQuery.toLowerCase()) || (c.phone ?? "").includes(custQuery)
  );
  const handleAddMedicine = reactExports.useCallback(
    (med) => {
      var _a;
      addItem({
        medicineId: med.id,
        medicineName: med.name,
        batchId: BigInt(0),
        batchNumber: "DEFAULT",
        unitPrice: med.unitPrice,
        qty: 1,
        discountPct: 0,
        gstRate: med.gstRate,
        lineTotal: med.unitPrice
      });
      setMedQuery("");
      setSelectedMedIdx(0);
      (_a = searchRef.current) == null ? void 0 : _a.focus();
      ue.success(`${med.name} added to cart`);
    },
    [addItem]
  );
  const handleGenerateBill = async () => {
    var _a;
    if (items.length === 0) {
      ue.error("Cart is empty");
      return;
    }
    if (!customerName.trim()) {
      ue.error("Please select or enter a customer name");
      (_a = custInputRef.current) == null ? void 0 : _a.focus();
      return;
    }
    try {
      const invoice = await createInvoice.mutateAsync({
        customerName: customerName.trim(),
        lineItems: items.map((it) => ({
          medicineId: it.medicineId,
          batchId: it.batchId,
          qty: BigInt(it.qty),
          discountPct: BigInt(it.discountPct)
        })),
        isReturn: false,
        paymentMode: paymentMode === "cash" ? PaymentMode.cash : paymentMode === "upi" ? PaymentMode.upi : PaymentMode.card
      });
      setLastInvoice(invoice);
      setSuccessOpen(true);
      clearCart();
      setCustQuery("");
    } catch {
      ue.error("Failed to generate invoice");
    }
  };
  reactExports.useEffect(() => {
    const handler = (e) => {
      var _a;
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        if (lastInvoice) printInvoice(lastInvoice);
        else ue.info("No recent invoice to print");
        return;
      }
      if (e.key === "Delete" && selectedCartIdx !== null && ((_a = document.activeElement) == null ? void 0 : _a.tagName) !== "INPUT") {
        const item = items[selectedCartIdx];
        if (item) removeItem(item.medicineId, item.batchId);
        setSelectedCartIdx(null);
        return;
      }
      if (e.key === "Enter" && document.activeElement === searchRef.current) {
        const results = searchResults ?? [];
        if (results[selectedMedIdx]) handleAddMedicine(results[selectedMedIdx]);
        return;
      }
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
    handleAddMedicine
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "billing.page", className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Billing",
        subtitle: "Fast pharmacy billing — F1 for shortcuts, Enter to add, Delete to remove",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3 mr-1" }),
            items.length,
            " items"
          ] }),
          lastInvoice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => lastInvoice && printInvoice(lastInvoice),
              "data-ocid": "billing.print_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4 mr-1.5" }),
                "Print Last",
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-1.5 text-[10px] bg-muted px-1 py-0.5 rounded font-mono", children: "Ctrl+P" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 gap-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-[55%] border-r border-border min-h-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2", children: "Add Medicines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: searchRef,
                type: "text",
                value: medQuery,
                onChange: (e) => {
                  setMedQuery(e.target.value);
                  setSelectedMedIdx(0);
                },
                placeholder: "Search medicine by name… (Enter to add)",
                className: "w-full pl-9 pr-4 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/40 font-body",
                autoComplete: "off",
                "data-ocid": "billing.medicine_search_input"
              }
            ),
            searchFetching && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-3", children: medQuery.length > 1 ? searchFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-md" }, k)) }) : (searchResults ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            'No medicines found for "',
            medQuery,
            '"'
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: (searchResults ?? []).map((med, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          MedicineRow,
          {
            med,
            onAdd: handleAddMedicine,
            isSelected: i === selectedMedIdx
          },
          med.id.toString()
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full py-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-12 h-12 text-accent/30 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground/60 mb-1", children: "Start typing to search medicines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Use ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-muted px-1 rounded font-mono", children: "↑↓" }),
            " ",
            "to navigate,",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-muted px-1 rounded font-mono", children: "Enter" }),
            " ",
            "to add"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-card p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: custInputRef,
                    type: "text",
                    value: custQuery || customerName,
                    onChange: (e) => {
                      setCustQuery(e.target.value);
                      setCustomer(e.target.value);
                      setShowCustDropdown(true);
                    },
                    onFocus: () => setShowCustDropdown(true),
                    onBlur: () => setTimeout(() => setShowCustDropdown(false), 150),
                    placeholder: "Search or type customer name…",
                    className: "w-full pl-9 pr-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/40",
                    "data-ocid": "billing.customer_search_input"
                  }
                ),
                showCustDropdown && filteredCustomers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-50 left-0 right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-elevated max-h-40 overflow-y-auto", children: filteredCustomers.slice(0, 6).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "w-full flex items-center gap-2 px-3 py-2 hover:bg-accent/10 text-left transition-colors",
                    onClick: () => {
                      setCustomer(c.name, c.id);
                      setCustQuery("");
                      setShowCustDropdown(false);
                    },
                    "data-ocid": "billing.customer_option",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: c.name }),
                        c.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.phone })
                      ] })
                    ]
                  },
                  c.id.toString()
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => setNewCustOpen(true),
                  "data-ocid": "billing.add_customer_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block", children: "Payment Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["cash", "upi", "card"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPaymentMode(mode),
                className: `flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm font-medium transition-colors ${paymentMode === mode ? "bg-accent text-accent-foreground border-accent" : "border-border hover:bg-muted/50"}`,
                "data-ocid": `billing.payment_mode.${mode}`,
                children: [
                  mode === "cash" && /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5" }),
                  mode === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                  mode === "card" && /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
                  PAYMENT_LABELS[mode === "cash" ? PaymentMode.cash : mode === "upi" ? PaymentMode.upi : PaymentMode.card]
                ]
              },
              mode
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-[45%] min-h-0 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Current Bill" }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              className: "text-destructive hover:text-destructive hover:bg-destructive/10 h-7 text-xs",
              onClick: () => {
                clearCart();
                setSelectedCartIdx(null);
              },
              "data-ocid": "billing.clear_cart_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-1" }),
                "Clear"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-3", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center h-full py-12 text-center",
            "data-ocid": "billing.cart.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-12 h-12 text-accent/30 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground/60", children: "Cart is empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Search and add medicines from the left panel" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartRow,
          {
            item,
            index: idx,
            isSelected: selectedCartIdx === idx,
            onSelect: () => setSelectedCartIdx(selectedCartIdx === idx ? null : idx),
            onQtyChange: (qty) => updateQty(item.medicineId, item.batchId, qty),
            onRemove: () => {
              removeItem(item.medicineId, item.batchId);
              setSelectedCartIdx(null);
            }
          },
          `${item.medicineId.toString()}-${item.batchId.toString()}`
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-4 space-y-2 bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: formatCurrency(subtotal) })
            ] }),
            Object.entries(gstMap).map(([rate, amount]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "GST ",
                GST_LABEL[rate] ?? rate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(amount) })
            ] }, rate)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg", children: "Grand Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-bold text-2xl text-accent",
                  "data-ocid": "billing.cart.grand_total",
                  children: formatCurrency(grandTotal)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base py-5 shadow-elevated",
              disabled: items.length === 0 || createInvoice.isPending,
              onClick: handleGenerateBill,
              "data-ocid": "billing.generate_bill_button",
              children: [
                createInvoice.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-5 h-5 mr-2" }),
                "Generate Bill"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-4 pb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Recent Bills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Last 10 invoices" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: invoicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-md" }, k)) }) : recentInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-6 h-6" }),
          title: "No invoices yet",
          description: "Generated invoices will appear here",
          "data-ocid": "billing.recent.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold uppercase tracking-wide", children: "Invoice #" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold uppercase tracking-wide", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold uppercase tracking-wide", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold uppercase tracking-wide", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold uppercase tracking-wide text-right", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold uppercase tracking-wide", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold uppercase tracking-wide", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: recentInvoices.map((inv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "hover:bg-muted/20 transition-colors",
            "data-ocid": `billing.recent.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm font-semibold text-accent", children: inv.invoiceNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: inv.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: formatDate(inv.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: PAYMENT_LABELS[inv.paymentMode] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono font-semibold text-sm", children: formatCurrency(inv.totalAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: inv.isReturn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "bg-destructive/15 text-destructive text-xs",
                  children: "Return"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "bg-accent/15 text-accent text-xs",
                  children: "Sale"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "ghost",
                    className: "h-7 w-7",
                    onClick: () => printInvoice(inv),
                    "aria-label": "Print invoice",
                    "data-ocid": `billing.recent.print_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" })
                  }
                ),
                !inv.isReturn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "ghost",
                    className: "h-7 w-7 text-destructive hover:bg-destructive/10",
                    onClick: () => setReturnInvoice(inv),
                    "aria-label": "Return invoice",
                    "data-ocid": `billing.recent.return_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          inv.id.toString()
        )) })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: successOpen, onOpenChange: setSuccessOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "billing.success_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
        "Invoice Generated!"
      ] }) }),
      lastInvoice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Invoice Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-accent mt-1", children: lastInvoice.invoiceNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: lastInvoice.customerName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Grand Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-lg", children: formatCurrency(lastInvoice.totalAmount) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: PAYMENT_LABELS[lastInvoice.paymentMode] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setSuccessOpen(false),
            "data-ocid": "billing.success_dialog.close_button",
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "bg-accent hover:bg-accent/90 text-accent-foreground",
            onClick: () => {
              if (lastInvoice) printInvoice(lastInvoice);
              setSuccessOpen(false);
            },
            "data-ocid": "billing.success_dialog.print_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4 mr-1.5" }),
              "Print Invoice"
            ]
          }
        )
      ] })
    ] }) }),
    returnInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReturnDialog,
      {
        invoice: returnInvoice,
        open: !!returnInvoice,
        onClose: () => setReturnInvoice(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NewCustomerDialog,
      {
        open: newCustOpen,
        onClose: () => setNewCustOpen(false),
        onCreated: (c) => {
          setCustomer(c.name, c.id);
          setNewCustOpen(false);
        }
      }
    )
  ] });
}
export {
  BillingPage as default
};
