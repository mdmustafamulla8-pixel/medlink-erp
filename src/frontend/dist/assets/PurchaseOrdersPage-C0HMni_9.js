import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, k as Badge, e as Skeleton, S as ShoppingCart, g as formatDate, f as formatCurrency, $ as ChevronRight, T as Truck } from "./index-D0FyCSZw.js";
import { E as EmptyState, X } from "./EmptyState-npLLL3hK.js";
import { P as PageHeader, C as Card, c as CardContent } from "./card-CplIUq9W.js";
import { S as SearchInput } from "./SearchInput-CTp-ZWOy.js";
import { S as StatusBadge } from "./StatusBadge-CvPkNk69.js";
import { P as Plus, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DQV2SG5I.js";
import { u as useListPurchaseOrders, a as useUpdateOrderStatus } from "./use-purchase-BtosZ3do.js";
import { O as OrderStatus } from "./backend.d-C24xlPzP.js";
import { P as Package } from "./package-l3vjNm6F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: OrderStatus.pending, label: "Pending" },
  { value: OrderStatus.confirmed, label: "Confirmed" },
  { value: OrderStatus.shipped, label: "Shipped" },
  { value: OrderStatus.delivered, label: "Delivered" }
];
const NEXT_STATUS = {
  [OrderStatus.pending]: {
    status: OrderStatus.confirmed,
    label: "Confirm",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" })
  },
  [OrderStatus.confirmed]: {
    status: OrderStatus.shipped,
    label: "Mark Shipped",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3 h-3" })
  },
  [OrderStatus.shipped]: {
    status: OrderStatus.delivered,
    label: "Mark Delivered",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3" })
  }
};
function PurchaseOrdersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: orders, isLoading } = useListPurchaseOrders();
  const updateStatus = useUpdateOrderStatus();
  const filtered = (orders ?? []).filter((o) => {
    const matchSearch = o.distributorName.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const countByStatus = (status) => (orders ?? []).filter((o) => o.status === status).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "purchase_orders.page", className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Purchase Orders",
        subtitle: "Track and manage orders from distributors",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5",
            onClick: () => navigate({ to: "/purchase-orders/new" }),
            "data-ocid": "purchase_orders.new_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "New Order",
              /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "text-[10px] bg-accent-foreground/20 px-1 py-0.5 rounded font-mono", children: "F3" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-muted/40 rounded-lg p-1 w-fit", children: FILTER_TABS.map((tab) => {
        const count = tab.value === "all" ? (orders ?? []).length : countByStatus(tab.value);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setStatusFilter(tab.value),
            "data-ocid": `purchase_orders.filter.${tab.value}`,
            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${statusFilter === tab.value ? "bg-card shadow-subtle text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              tab.label,
              count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: `text-[10px] px-1 py-0 h-4 min-w-4 ${statusFilter === tab.value ? "bg-accent/20 text-accent" : ""}`,
                  children: count
                }
              )
            ]
          },
          tab.value
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchInput,
        {
          placeholder: "Search by distributor name or order ID...",
          value: search,
          onChange: setSearch,
          className: "max-w-sm",
          "data-ocid": "purchase_orders.search_input"
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-8 h-8" }),
          title: search ? "No matching orders" : "No purchase orders yet",
          description: search ? "Try a different search term" : "Create a new order to start comparing distributor prices",
          action: {
            label: "Create New Order",
            onClick: () => navigate({ to: "/purchase-orders/new" })
          },
          "data-ocid": "purchase_orders.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wide pl-5", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wide", children: "Distributor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wide", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wide text-center", children: "Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wide text-right", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wide", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-xs uppercase tracking-wide text-right pr-5", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((order, idx) => {
          const nextStep = NEXT_STATUS[order.status];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `purchase_orders.item.${idx + 1}`,
              className: "hover:bg-muted/20 transition-colors group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-sm font-bold text-primary pl-5", children: [
                  "#PO-",
                  order.id.toString().padStart(4, "0")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate max-w-[160px]", children: order.distributorName }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: formatDate(order.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "font-mono text-xs",
                    children: order.lines.length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono font-bold text-sm", children: formatCurrency(order.totalAmount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right pr-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                  nextStep && order.status !== OrderStatus.cancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "h-7 text-xs gap-1 text-accent border-accent/40 hover:bg-accent/10 hover:text-accent",
                      onClick: () => updateStatus.mutate({
                        id: order.id,
                        status: nextStep.status
                      }),
                      disabled: updateStatus.isPending,
                      "data-ocid": `purchase_orders.advance_button.${idx + 1}`,
                      children: [
                        nextStep.icon,
                        nextStep.label
                      ]
                    }
                  ),
                  (order.status === OrderStatus.pending || order.status === OrderStatus.confirmed) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => updateStatus.mutate({
                        id: order.id,
                        status: OrderStatus.cancelled
                      }),
                      disabled: updateStatus.isPending,
                      "data-ocid": `purchase_orders.cancel_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                        "Cancel"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 w-7 p-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-smooth",
                      "data-ocid": `purchase_orders.view_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            order.id.toString()
          );
        }) })
      ] }) }) })
    ] })
  ] });
}
export {
  PurchaseOrdersPage as default
};
