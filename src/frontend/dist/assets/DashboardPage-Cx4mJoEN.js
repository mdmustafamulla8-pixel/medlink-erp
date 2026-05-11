import { c as createLucideIcon, a as useNavigate, b as useLowStockAlerts, d as useExpiryAlerts, j as jsxRuntimeExports, B as Button, F as FlaskConical, S as ShoppingCart, e as Skeleton, f as formatCurrency, T as Truck, g as formatDate, r as reactExports, h as ChevronDown, i as daysUntil, k as Badge, l as formatDateShort } from "./index-D0FyCSZw.js";
import { P as PageHeader, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-CplIUq9W.js";
import { S as StatusBadge } from "./StatusBadge-CvPkNk69.js";
import { u as useListInvoices } from "./use-billing-CnOJDgbb.js";
import { u as useListPurchaseOrders } from "./use-purchase-BtosZ3do.js";
import { u as useSalesSummary, T as TrendingUp, C as Clock, R as ResponsiveContainer, A as AreaChart, a as CartesianGrid, X as XAxis, Y as YAxis, b as Tooltip, c as Area } from "./AreaChart-jd49KWGr.js";
import { O as OrderStatus, P as PaymentMode } from "./backend.d-C24xlPzP.js";
import { P as Package } from "./package-l3vjNm6F.js";
import { C as ChevronUp } from "./chevron-up-ytyUt3iw.js";
import { T as TriangleAlert } from "./triangle-alert-BedU0Eo8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
];
const ReceiptText = createLucideIcon("receipt-text", __iconNode);
function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  accent,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `shadow-card transition-smooth ${onClick ? "cursor-pointer hover:shadow-elevated" : ""}`,
      onClick,
      "data-ocid": ocid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-display font-bold text-2xl ${accent ? "text-accent" : "text-foreground"}`,
              children: value
            }
          ),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent ? "bg-accent/15" : "bg-muted"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                className: `w-5 h-5 ${accent ? "text-accent" : "text-muted-foreground"}`
              }
            )
          }
        )
      ] }) })
    }
  );
}
function RevenueTrendChart({ invoices }) {
  const data = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const dayStart = d.setHours(0, 0, 0, 0);
      const dayEnd = dayStart + 864e5;
      const dayRevenue = invoices.filter((inv) => {
        const ms = Number(inv.createdAt) / 1e6;
        return !inv.isReturn && ms >= dayStart && ms < dayEnd;
      }).reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
      return {
        day: new Date(dayStart).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short"
        }),
        revenue: dayRevenue / 100
      };
    });
  }, [invoices]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data, margin: { top: 4, right: 4, left: 0, bottom: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "revenueGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "stop",
        {
          offset: "5%",
          stopColor: "oklch(0.6 0.15 145)",
          stopOpacity: 0.3
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "stop",
        {
          offset: "95%",
          stopColor: "oklch(0.6 0.15 145)",
          stopOpacity: 0
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CartesianGrid,
      {
        strokeDasharray: "3 3",
        stroke: "oklch(0.9 0.008 230 / 0.5)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "day",
        tick: { fontSize: 10, fill: "oklch(0.5 0.012 230)" },
        axisLine: false,
        tickLine: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        tick: { fontSize: 10, fill: "oklch(0.5 0.012 230)" },
        axisLine: false,
        tickLine: false,
        tickFormatter: (v) => v >= 1e3 ? `₹${(v / 1e3).toFixed(0)}k` : `₹${v}`,
        width: 42
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        formatter: (v) => new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR"
        }).format(v),
        contentStyle: {
          background: "oklch(1.0 0.004 230)",
          border: "1px solid oklch(0.9 0.008 230)",
          borderRadius: "8px",
          fontSize: "12px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Area,
      {
        type: "monotone",
        dataKey: "revenue",
        name: "Revenue",
        stroke: "oklch(0.6 0.15 145)",
        strokeWidth: 2,
        fill: "url(#revenueGrad)",
        dot: { r: 3, fill: "oklch(0.6 0.15 145)", strokeWidth: 0 },
        activeDot: { r: 5, strokeWidth: 0 }
      }
    )
  ] }) });
}
function TopMedicinesTable({ invoices }) {
  const topMeds = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const inv of invoices) {
      if (inv.isReturn) continue;
      for (const line of inv.lineItems) {
        const key = line.medicineName;
        const existing = map.get(key) ?? {
          name: line.medicineName,
          qty: 0,
          revenue: 0
        };
        map.set(key, {
          name: line.medicineName,
          qty: existing.qty + Number(line.qty),
          revenue: existing.revenue + Number(line.lineTotal)
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [invoices]);
  if (topMeds.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-8 text-center text-sm text-muted-foreground",
        "data-ocid": "dashboard.top_medicines.empty_state",
        children: "No sales data yet"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: topMeds.map((med, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 px-4 py-2.5",
      "data-ocid": `dashboard.top_medicine.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0", children: idx + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-sm font-medium text-foreground truncate min-w-0", children: med.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-mono", children: formatCurrency(BigInt(med.revenue)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            med.qty,
            " units"
          ] })
        ] })
      ]
    },
    med.name
  )) });
}
const PAYMENT_LABELS = {
  [PaymentMode.cash]: "Cash",
  [PaymentMode.upi]: "UPI",
  [PaymentMode.card]: "Card"
};
function RecentInvoicesList({
  invoices,
  onViewAll
}) {
  const recent = invoices.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", "data-ocid": "dashboard.recent_invoices_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-4 px-5 flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wide", children: "Recent Invoices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "text-xs h-7",
          onClick: onViewAll,
          "data-ocid": "dashboard.view_all_invoices_link",
          children: "View all"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-8 text-center text-sm text-muted-foreground",
        "data-ocid": "dashboard.invoices.empty_state",
        children: "No invoices yet"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recent.map((inv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-3",
        "data-ocid": `dashboard.invoice.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: inv.customerName }),
              inv.isReturn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "destructive",
                  className: "text-[10px] px-1.5 py-0 h-4",
                  children: "Return"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "#",
              inv.invoiceNumber,
              " · ",
              formatDateShort(inv.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-mono", children: formatCurrency(inv.totalAmount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] px-1.5 py-0 h-4 mt-0.5",
                children: PAYMENT_LABELS[String(inv.paymentMode)] ?? String(inv.paymentMode)
              }
            )
          ] })
        ]
      },
      inv.id.toString()
    )) }) })
  ] });
}
function LowStockPanel({ alerts }) {
  const [open, setOpen] = reactExports.useState(false);
  if (alerts.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-destructive/30 overflow-hidden",
      "data-ocid": "dashboard.low_stock_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 bg-destructive/8 hover:bg-destructive/12 transition-smooth",
            onClick: () => setOpen((p) => !p),
            "data-ocid": "dashboard.low_stock_panel.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-destructive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-destructive", children: "Low Stock Alerts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full", children: alerts.length })
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-destructive" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-destructive/10 bg-destructive/5", children: alerts.map((alert, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-2.5",
            "data-ocid": `dashboard.low_stock_alert.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate flex-1 min-w-0", children: alert.medicineName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-shrink-0 ml-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-destructive", children: Number(alert.currentStock) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Threshold" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: Number(alert.threshold) })
                ] })
              ] })
            ]
          },
          alert.medicineId.toString()
        )) })
      ]
    }
  );
}
function ExpiryAlertsPanel({ alerts }) {
  const [open, setOpen] = reactExports.useState(false);
  if (alerts.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-yellow-400/40 overflow-hidden",
      "data-ocid": "dashboard.expiry_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 bg-yellow-400/8 hover:bg-yellow-400/14 transition-smooth",
            onClick: () => setOpen((p) => !p),
            "data-ocid": "dashboard.expiry_panel.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-yellow-600 dark:text-yellow-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-yellow-800 dark:text-yellow-300", children: "Expiry Alerts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold bg-yellow-500 text-foreground px-1.5 py-0.5 rounded-full", children: alerts.length })
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-yellow-600 dark:text-yellow-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-yellow-600 dark:text-yellow-400" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-yellow-400/20 bg-yellow-400/5", children: alerts.map((alert, idx) => {
          const days = daysUntil(alert.expiryDate);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-4 py-2.5",
              "data-ocid": `dashboard.expiry_alert.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: alert.medicineName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Batch: ",
                    alert.batchNumber
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-shrink-0 ml-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Expires" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: formatDate(alert.expiryDate) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: days <= 7 ? "destructive" : "outline",
                      className: "text-xs min-w-[60px] justify-center",
                      children: days <= 0 ? "Expired" : `${days}d`
                    }
                  )
                ] })
              ]
            },
            alert.batchId.toString()
          );
        }) })
      ]
    }
  );
}
function DashboardPage() {
  const navigate = useNavigate();
  const { data: sales, isLoading: salesLoading } = useSalesSummary();
  const { data: lowStock = [] } = useLowStockAlerts();
  const { data: expiry = [] } = useExpiryAlerts(BigInt(30));
  const { data: orders = [] } = useListPurchaseOrders();
  const { data: invoices = [], isLoading: invoicesLoading } = useListInvoices();
  const pendingOrders = orders.filter(
    (o) => String(o.status) === String(OrderStatus.pending)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.page", className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Dashboard",
        subtitle: `Today's overview — ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => navigate({ to: "/billing" }),
              "data-ocid": "dashboard.new_bill_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptText, { className: "w-4 h-4 mr-1.5" }),
                "New Bill",
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-1.5 text-[10px] bg-muted px-1 py-0.5 rounded font-mono", children: "F1" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => navigate({ to: "/inventory" }),
              "data-ocid": "dashboard.check_inventory_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 mr-1.5" }),
                "Inventory"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "bg-accent hover:bg-accent/90 text-accent-foreground",
              onClick: () => navigate({ to: "/purchase-orders/new" }),
              "data-ocid": "dashboard.new_po_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-1.5" }),
                "New PO"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: salesLoading ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Today's Revenue",
            value: formatCurrency((sales == null ? void 0 : sales.totalSales) ?? BigInt(0)),
            sub: `${(sales == null ? void 0 : sales.totalInvoices) ?? 0} invoices today`,
            icon: TrendingUp,
            accent: true,
            ocid: "dashboard.revenue_stat"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Net Revenue",
            value: formatCurrency((sales == null ? void 0 : sales.netRevenue) ?? BigInt(0)),
            sub: `Returns: ${formatCurrency((sales == null ? void 0 : sales.totalReturns) ?? BigInt(0))}`,
            icon: ReceiptText,
            ocid: "dashboard.net_revenue_stat"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Low Stock",
            value: String(lowStock.length),
            sub: "Items need reorder",
            icon: Package,
            onClick: lowStock.length > 0 ? () => navigate({ to: "/inventory" }) : void 0,
            ocid: "dashboard.low_stock_stat"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: "Pending Orders",
            value: String(pendingOrders.length),
            sub: "Purchase orders",
            icon: Clock,
            onClick: pendingOrders.length > 0 ? () => navigate({ to: "/purchase-orders" }) : void 0,
            ocid: "dashboard.pending_orders_stat"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card lg:col-span-3",
            "data-ocid": "dashboard.revenue_chart_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wide", children: "Revenue Trend — Last 7 Days" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: invoicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueTrendChart, { invoices }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card lg:col-span-2",
            "data-ocid": "dashboard.top_medicines_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wide", children: "Top 5 Medicines" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 pb-2", children: invoicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-2 py-2", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TopMedicinesTable, { invoices }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "dashboard.alerts_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground uppercase tracking-wide", children: "Alerts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LowStockPanel, { alerts: lowStock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExpiryAlertsPanel, { alerts: expiry }),
          lowStock.length === 0 && expiry.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-accent/10 border border-accent/20 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent", children: "All systems healthy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "No critical alerts today" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "h-12 flex-col gap-1 text-xs",
                onClick: () => navigate({ to: "/inventory" }),
                "data-ocid": "dashboard.inventory_shortcut",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4" }),
                  "Inventory"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "h-12 flex-col gap-1 text-xs",
                onClick: () => navigate({ to: "/distributors" }),
                "data-ocid": "dashboard.distributors_shortcut",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
                  "Distributors"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "lg:col-span-2",
            "data-ocid": "dashboard.recent_orders_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground uppercase tracking-wide", children: "Recent Purchase Orders" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "text-xs h-7",
                    onClick: () => navigate({ to: "/purchase-orders" }),
                    "data-ocid": "dashboard.view_all_orders_link",
                    children: "View all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "py-10 text-center",
                  "data-ocid": "dashboard.orders.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No purchase orders yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        className: "mt-3 bg-accent hover:bg-accent/90 text-accent-foreground",
                        onClick: () => navigate({ to: "/purchase-orders/new" }),
                        "data-ocid": "dashboard.empty_po.create_button",
                        children: "Create first order"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: orders.slice(0, 5).map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between px-4 py-3",
                  "data-ocid": `dashboard.order.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: order.distributorName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        formatDate(order.createdAt),
                        " · ",
                        order.lines.length,
                        " ",
                        "items"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0 ml-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold font-mono", children: formatCurrency(order.totalAmount) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
                    ] })
                  ]
                },
                order.id.toString()
              )) }) }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: invoicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          RecentInvoicesList,
          {
            invoices,
            onViewAll: () => navigate({ to: "/billing" })
          }
        ) }),
        sales && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card",
            "data-ocid": "dashboard.gst_summary_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wide", children: "Today's GST" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-4 space-y-3", children: [
                [
                  { label: "GST 5%", value: sales.gst5Total },
                  { label: "GST 12%", value: sales.gst12Total },
                  { label: "GST 18%", value: sales.gst18Total }
                ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-mono", children: formatCurrency(value) })
                    ]
                  },
                  label
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Total GST" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold font-mono text-accent", children: formatCurrency(sales.totalGst) })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  DashboardPage as default
};
