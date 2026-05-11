import { c as createLucideIcon, j as jsxRuntimeExports, N as cn, r as reactExports, B as Button, k as Badge, e as Skeleton, T as Truck, Q as ue } from "./index-D0FyCSZw.js";
import { X, E as EmptyState, I as Input } from "./EmptyState-npLLL3hK.js";
import { P as PageHeader, C as Card, c as CardContent } from "./card-CplIUq9W.js";
import { S as SearchInput } from "./SearchInput-CTp-ZWOy.js";
import { R as Root, C as Content, e as Close, T as Title, P as Portal, O as Overlay, h as Trash2, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, i as DialogFooter } from "./dialog-DJRBC0Pt.js";
import { L as Label } from "./label-B4RMIk0y.js";
import { P as Plus, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DQV2SG5I.js";
import { d as useListDistributors, e as useAddDistributor, f as useUpdateDistributor, g as useDeleteDistributor, h as useUpsertCatalogEntry, i as useBulkUpsertCatalog } from "./use-purchase-BtosZ3do.js";
import { P as Phone } from "./phone-D27ShdRQ.js";
import { P as Pencil } from "./pencil-DXNcFP1o.js";
import { T as TriangleAlert } from "./triangle-alert-BedU0Eo8.js";
import { D as Download } from "./download-C2_qNAn1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const EMPTY_FORM = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  gstNumber: ""
};
const EMPTY_CATALOG_FORM = {
  medicineName: "",
  hsnCode: "",
  price: "",
  stockQty: "",
  deliveryDays: "",
  discountPct: "0"
};
const SAMPLE_CSV_COLUMNS = "medicineName,hsnCode,price,stockQty,deliveryDays,discountPct";
const SAMPLE_CSV_ROWS = [
  "Paracetamol 500mg,30049099,1200,500,2,5",
  "Amoxicillin 250mg,30041011,2500,300,3,0",
  "Metformin 500mg,30049040,800,1000,1,10"
];
const SAMPLE_CSV = [SAMPLE_CSV_COLUMNS, ...SAMPLE_CSV_ROWS].join("\n");
function formatPaisa(paisa) {
  return `₹${(Number(paisa) / 100).toFixed(2)}`;
}
function parseCsv(text) {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];
  const header = lines[0].trim().toLowerCase();
  const required = [
    "medicinename",
    "hsncode",
    "price",
    "stockqty",
    "deliverydays",
    "discountpct"
  ];
  if (!required.every((h) => header.includes(h))) return [];
  const cols = header.split(",").map((c) => c.trim());
  return lines.slice(1).map((line) => {
    const vals = line.split(",").map((v) => v.trim());
    const get = (name) => vals[cols.indexOf(name)] ?? "";
    return {
      medicineName: get("medicinename"),
      hsnCode: get("hsncode"),
      price: BigInt(Math.round(Number(get("price")))),
      stockQty: BigInt(Math.round(Number(get("stockqty")))),
      deliveryDays: BigInt(Math.round(Number(get("deliverydays")))),
      discountPct: BigInt(Math.round(Number(get("discountpct"))))
    };
  });
}
function downloadSampleCsv() {
  const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "distributor_catalog_sample.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function DistributorForm({
  form,
  onChange
}) {
  const set = (key) => (e) => onChange({ ...form, [key]: e.target.value });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "dist-name", children: [
        "Company Name ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "dist-name",
          placeholder: "e.g. Sunrise Pharma Distributors",
          value: form.name,
          onChange: set("name"),
          "data-ocid": "distributors.form.name_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dist-contact", children: "Contact Person" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "dist-contact",
          placeholder: "e.g. Rajesh Kumar",
          value: form.contactPerson,
          onChange: set("contactPerson"),
          "data-ocid": "distributors.form.contact_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dist-phone", children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "dist-phone",
          placeholder: "+91 98765 43210",
          value: form.phone,
          onChange: set("phone"),
          "data-ocid": "distributors.form.phone_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dist-email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "dist-email",
          type: "email",
          placeholder: "orders@sunrise.com",
          value: form.email,
          onChange: set("email"),
          "data-ocid": "distributors.form.email_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dist-gst", children: "GST Number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "dist-gst",
          placeholder: "22AAAAA0000A1Z5",
          value: form.gstNumber,
          onChange: set("gstNumber"),
          className: "font-mono",
          "data-ocid": "distributors.form.gst_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dist-addr", children: "Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "dist-addr",
          placeholder: "Street, City, State, PIN",
          value: form.address,
          onChange: set("address"),
          "data-ocid": "distributors.form.address_input"
        }
      )
    ] })
  ] });
}
function CatalogEntryForm({
  form,
  onChange,
  onSubmit,
  isPending
}) {
  const set = (key) => (e) => onChange({ ...form, [key]: e.target.value });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit();
      },
      className: "border border-border rounded-xl p-4 bg-muted/30 space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Add Catalog Entry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-med", children: "Medicine Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-med",
                placeholder: "Paracetamol 500mg",
                value: form.medicineName,
                onChange: set("medicineName"),
                "data-ocid": "catalog.form.medicine_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-hsn", children: "HSN Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-hsn",
                placeholder: "30049099",
                value: form.hsnCode,
                onChange: set("hsnCode"),
                className: "font-mono",
                "data-ocid": "catalog.form.hsn_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-price", children: "Price (₹ paise)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-price",
                type: "number",
                placeholder: "1200",
                value: form.price,
                onChange: set("price"),
                "data-ocid": "catalog.form.price_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-qty", children: "Stock Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-qty",
                type: "number",
                placeholder: "500",
                value: form.stockQty,
                onChange: set("stockQty"),
                "data-ocid": "catalog.form.qty_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-days", children: "Delivery Days" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-days",
                type: "number",
                placeholder: "2",
                value: form.deliveryDays,
                onChange: set("deliveryDays"),
                "data-ocid": "catalog.form.delivery_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-disc", children: "Discount %" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-disc",
                type: "number",
                placeholder: "5",
                value: form.discountPct,
                onChange: set("discountPct"),
                "data-ocid": "catalog.form.discount_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "sm",
            className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground",
            disabled: isPending || !form.medicineName,
            "data-ocid": "catalog.form.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Add Entry"
            ]
          }
        )
      ]
    }
  );
}
function CatalogSheet({
  distributor,
  onClose
}) {
  const [catalogForm, setCatalogForm] = reactExports.useState(EMPTY_CATALOG_FORM);
  const [localEntries, setLocalEntries] = reactExports.useState(
    []
  );
  const upsertEntry = useUpsertCatalogEntry();
  const bulkUpsert = useBulkUpsertCatalog();
  const csvInputRef = reactExports.useRef(null);
  const handleAddEntry = () => {
    if (!distributor) return;
    const input = {
      medicineName: catalogForm.medicineName,
      hsnCode: catalogForm.hsnCode,
      price: BigInt(Math.round(Number(catalogForm.price))),
      stockQty: BigInt(Math.round(Number(catalogForm.stockQty))),
      deliveryDays: BigInt(Math.round(Number(catalogForm.deliveryDays))),
      discountPct: BigInt(Math.round(Number(catalogForm.discountPct)))
    };
    upsertEntry.mutate(
      { distributorId: distributor.id, input },
      {
        onSuccess: (entry) => {
          setLocalEntries((prev) => {
            const exists = prev.findIndex(
              (e) => e.medicineName === entry.medicineName
            );
            if (exists >= 0) {
              const updated = [...prev];
              updated[exists] = entry;
              return updated;
            }
            return [...prev, entry];
          });
          setCatalogForm(EMPTY_CATALOG_FORM);
          ue.success(`${entry.medicineName} added to catalog`);
        },
        onError: () => ue.error("Failed to add catalog entry")
      }
    );
  };
  const handleCsvImport = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !distributor) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const text = (_a2 = ev.target) == null ? void 0 : _a2.result;
      const entries = parseCsv(text);
      if (entries.length === 0) {
        ue.error("Invalid CSV format. Please use the sample template.");
        return;
      }
      bulkUpsert.mutate(
        { distributorId: distributor.id, entries },
        {
          onSuccess: (count) => {
            ue.success(`${count} catalog entries imported successfully`);
            const now = BigInt(Date.now()) * BigInt(1e6);
            const newEntries = entries.map((e2) => ({
              ...e2,
              distributorId: distributor.id,
              updatedAt: now
            }));
            setLocalEntries((prev) => {
              const merged = [...prev];
              for (const ne of newEntries) {
                const idx = merged.findIndex(
                  (m) => m.medicineName === ne.medicineName
                );
                if (idx >= 0) merged[idx] = ne;
                else merged.push(ne);
              }
              return merged;
            });
          },
          onError: () => ue.error("CSV import failed")
        }
      );
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Sheet,
    {
      open: !!distributor,
      onOpenChange: (open) => {
        if (!open) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SheetContent,
        {
          side: "right",
          className: "w-full sm:max-w-2xl flex flex-col p-0 gap-0",
          "data-ocid": "distributors.catalog.sheet",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "px-6 py-4 border-b border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display text-lg", children: [
                distributor == null ? void 0 : distributor.name,
                " — Catalog"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                distributor == null ? void 0 : distributor.contactPerson,
                " · ",
                distributor == null ? void 0 : distributor.phone
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: csvInputRef,
                    type: "file",
                    accept: ".csv",
                    className: "hidden",
                    onChange: handleCsvImport,
                    "data-ocid": "catalog.csv_file_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      var _a;
                      return (_a = csvInputRef.current) == null ? void 0 : _a.click();
                    },
                    disabled: bulkUpsert.isPending,
                    "data-ocid": "catalog.csv_upload_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 mr-1.5" }),
                      bulkUpsert.isPending ? "Importing…" : "Import CSV"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: downloadSampleCsv,
                    "data-ocid": "catalog.sample_csv_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Sample CSV"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground ml-auto", children: "Columns: medicineName, hsnCode, price, stockQty, deliveryDays, discountPct" })
              ] }),
              localEntries.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Medicine" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "HSN" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Disc %" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Updated" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: localEntries.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TableRow,
                  {
                    "data-ocid": `catalog.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: entry.medicineName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: entry.hsnCode }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: formatPaisa(entry.price) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums", children: entry.stockQty.toString() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right tabular-nums", children: [
                        entry.deliveryDays.toString(),
                        "d"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right tabular-nums", children: [
                        entry.discountPct.toString(),
                        "%"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-xs text-muted-foreground", children: new Date(
                        Number(entry.updatedAt) / 1e6
                      ).toLocaleDateString("en-IN") })
                    ]
                  },
                  `${entry.medicineName}-${idx}`
                )) })
              ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center py-10 rounded-xl border border-dashed border-border text-center",
                  "data-ocid": "catalog.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-8 h-8 text-muted-foreground mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No catalog entries yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add entries manually or import via CSV" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CatalogEntryForm,
                {
                  form: catalogForm,
                  onChange: setCatalogForm,
                  onSubmit: handleAddEntry,
                  isPending: upsertEntry.isPending
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function DeleteConfirmDialog({
  distributor,
  onConfirm,
  onCancel,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open: !!distributor,
      onOpenChange: (open) => {
        if (!open) onCancel();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "distributors.delete.dialog", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }),
          "Remove Distributor"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Are you sure you want to remove",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: distributor == null ? void 0 : distributor.name }),
          "? This will also delete all their catalog entries and cannot be undone."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onCancel,
              "data-ocid": "distributors.delete.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "destructive",
              onClick: onConfirm,
              disabled: isPending,
              "data-ocid": "distributors.delete.confirm_button",
              children: isPending ? "Removing…" : "Remove"
            }
          )
        ] })
      ] })
    }
  );
}
function DistributorDialog({
  open,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (open2) => {
        if (!open2) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "max-w-lg",
          "data-ocid": mode === "add" ? "distributors.add.dialog" : "distributors.edit.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: mode === "add" ? "Add Distributor" : "Edit Distributor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  onSubmit();
                },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DistributorForm, { form, onChange }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        onClick: onClose,
                        "data-ocid": mode === "add" ? "distributors.add.cancel_button" : "distributors.edit.cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "bg-accent hover:bg-accent/90 text-accent-foreground",
                        disabled: isPending || !form.name.trim(),
                        "data-ocid": mode === "add" ? "distributors.add.submit_button" : "distributors.edit.submit_button",
                        children: isPending ? mode === "add" ? "Adding…" : "Saving…" : mode === "add" ? "Add Distributor" : "Save Changes"
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function DistributorCard({
  dist,
  idx,
  onEdit,
  onDelete,
  onViewCatalog
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "shadow-card hover:shadow-elevated transition-smooth group",
      "data-ocid": `distributors.item.${idx}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground truncate leading-tight", children: dist.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: dist.contactPerson })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: `text-[11px] flex-shrink-0 font-medium ${dist.isActive ? "bg-accent/15 text-accent border-accent/25" : "bg-muted text-muted-foreground"}`,
              children: dist.isActive ? "Active" : "Inactive"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 flex-shrink-0 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: dist.phone })
          ] }),
          dist.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 flex-shrink-0 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: dist.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: dist.address })
          ] })
        ] }),
        dist.gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "GST" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-foreground bg-muted px-1.5 py-0.5 rounded", children: dist.gstNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pt-3 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-7 text-xs flex-1 text-accent hover:text-accent hover:bg-accent/10",
              onClick: () => onViewCatalog(dist),
              "data-ocid": `distributors.catalog_button.${idx}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-3.5 h-3.5 mr-1" }),
                "View Catalog"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-7 text-xs",
              onClick: () => onEdit(dist),
              "data-ocid": `distributors.edit_button.${idx}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5 mr-1" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => onDelete(dist),
              "data-ocid": `distributors.delete_button.${idx}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ] })
    }
  );
}
function DistributorsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [catalogTarget, setCatalogTarget] = reactExports.useState(null);
  const [addForm, setAddForm] = reactExports.useState(EMPTY_FORM);
  const [editForm, setEditForm] = reactExports.useState(EMPTY_FORM);
  const { data: distributors, isLoading } = useListDistributors();
  const addDistributor = useAddDistributor();
  const updateDistributor = useUpdateDistributor();
  const deleteDistributor = useDeleteDistributor();
  const filtered = (distributors ?? []).filter(
    (d) => {
      var _a;
      return d.name.toLowerCase().includes(search.toLowerCase()) || d.contactPerson.toLowerCase().includes(search.toLowerCase()) || ((_a = d.phone) == null ? void 0 : _a.includes(search));
    }
  );
  const toInput = (f) => ({
    name: f.name.trim(),
    contactPerson: f.contactPerson.trim(),
    phone: f.phone.trim(),
    email: f.email.trim() || void 0,
    address: f.address.trim(),
    gstNumber: f.gstNumber.trim() || void 0
  });
  const handleAdd = () => {
    addDistributor.mutate(toInput(addForm), {
      onSuccess: () => {
        ue.success(`${addForm.name} added successfully`);
        setAddOpen(false);
        setAddForm(EMPTY_FORM);
      },
      onError: () => ue.error("Failed to add distributor")
    });
  };
  const handleEdit = () => {
    if (!editTarget) return;
    updateDistributor.mutate(
      { id: editTarget.id, input: toInput(editForm) },
      {
        onSuccess: () => {
          ue.success(`${editForm.name} updated`);
          setEditTarget(null);
        },
        onError: () => ue.error("Failed to update distributor")
      }
    );
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteDistributor.mutate(deleteTarget.id, {
      onSuccess: () => {
        ue.success(`${deleteTarget.name} removed`);
        setDeleteTarget(null);
      },
      onError: () => ue.error("Failed to remove distributor")
    });
  };
  const openEdit = (d) => {
    setEditForm({
      name: d.name,
      contactPerson: d.contactPerson,
      phone: d.phone,
      email: d.email ?? "",
      address: d.address,
      gstNumber: d.gstNumber ?? ""
    });
    setEditTarget(d);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "distributors.page", className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Distributors",
        subtitle: "Manage your supplier network, pricing catalogs, and delivery performance",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "bg-accent hover:bg-accent/90 text-accent-foreground",
            onClick: () => {
              setAddForm(EMPTY_FORM);
              setAddOpen(true);
            },
            "data-ocid": "distributors.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
              "Add Distributor"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchInput,
          {
            placeholder: "Search by name, contact or phone…",
            value: search,
            onChange: setSearch,
            className: "max-w-sm",
            "data-ocid": "distributors.search_input"
          }
        ),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-mono text-xs", children: [
          filtered.length,
          " ",
          filtered.length === 1 ? "distributor" : "distributors"
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-8 h-8" }),
          title: search ? "No distributors found" : "No distributors yet",
          description: search ? "Try a different search term" : "Add your first distributor to start comparing prices and managing orders",
          action: !search ? { label: "Add Distributor", onClick: () => setAddOpen(true) } : void 0,
          "data-ocid": "distributors.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((dist, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        DistributorCard,
        {
          dist,
          idx: idx + 1,
          onEdit: openEdit,
          onDelete: setDeleteTarget,
          onViewCatalog: setCatalogTarget
        },
        dist.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DistributorDialog,
      {
        open: addOpen,
        mode: "add",
        form: addForm,
        onChange: setAddForm,
        onSubmit: handleAdd,
        onClose: () => setAddOpen(false),
        isPending: addDistributor.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DistributorDialog,
      {
        open: !!editTarget,
        mode: "edit",
        form: editForm,
        onChange: setEditForm,
        onSubmit: handleEdit,
        onClose: () => setEditTarget(null),
        isPending: updateDistributor.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        distributor: deleteTarget,
        onConfirm: handleDelete,
        onCancel: () => setDeleteTarget(null),
        isPending: deleteDistributor.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CatalogSheet,
      {
        distributor: catalogTarget,
        onClose: () => setCatalogTarget(null)
      }
    )
  ] });
}
export {
  DistributorsPage as default
};
