import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, e as Skeleton, k as Badge, f as formatCurrency, S as ShoppingCart, T as Truck, Q as ue } from "./index-D0FyCSZw.js";
import { I as Input, E as EmptyState } from "./EmptyState-npLLL3hK.js";
import { P as PageHeader, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-CplIUq9W.js";
import { S as SearchInput } from "./SearchInput-CTp-ZWOy.js";
import { L as Label } from "./label-B4RMIk0y.js";
import { S as Separator } from "./separator-C3FgS4EG.js";
import { b as useSearchDistributorOffers, c as useCreatePurchaseOrder } from "./use-purchase-BtosZ3do.js";
import { C as CircleCheck } from "./circle-check-B1iJUzE_.js";
import { P as Package } from "./package-l3vjNm6F.js";
import { Z as Zap } from "./zap-BkmG5oIP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$3);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function effectivePrice(offer) {
  const discount = offer.discountPct > BigInt(0) ? offer.discountPct : BigInt(0);
  return offer.price * (BigInt(100) - discount) / BigInt(100);
}
function ScoreBar({ score }) {
  const pct = Math.min(100, Math.max(0, Number(score)));
  const color = pct >= 80 ? "bg-accent" : pct >= 55 ? "bg-primary" : "bg-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wide font-medium", children: "Smart Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground", children: [
        pct,
        "/100"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-smooth ${color}`,
        style: { width: `${pct}%` }
      }
    ) })
  ] });
}
function OfferCard({
  offer,
  rank,
  isBestValue,
  isFastestDelivery,
  onSelect,
  selected
}) {
  const effPrice = effectivePrice(offer);
  const hasDiscount = offer.discountPct > BigInt(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `cursor-pointer transition-smooth border-2 ${selected ? "border-accent shadow-elevated" : isBestValue ? "border-accent/30 shadow-card" : "border-border shadow-card hover:border-accent/20"}`,
      onClick: onSelect,
      "data-ocid": `new_po.offer_card.${rank}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground truncate", children: offer.distributorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1 flex-wrap", children: [
              isBestValue && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-2.5 h-2.5" }),
                "Best Value"
              ] }),
              isFastestDelivery && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-2.5 h-2.5" }),
                "Fastest Delivery"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-smooth mt-0.5 ${selected ? "border-accent bg-accent" : "border-border bg-transparent"}`,
              children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-xl text-foreground", children: formatCurrency(effPrice) }),
          hasDiscount && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-muted-foreground line-through", children: formatCurrency(offer.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/ unit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5", children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-sm", children: offer.stockQty.toString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5", children: "Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-sm flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-3 h-3 text-muted-foreground" }),
              offer.deliveryDays.toString(),
              "d"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5", children: "Discount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-sm text-accent", children: hasDiscount ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
              offer.discountPct.toString(),
              "%"
            ] }) : "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBar, { score: offer.score })
      ] })
    }
  );
}
function StepIndicator({
  current,
  steps
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-6", children: steps.map((label, i) => {
    const num = i + 1;
    const done = num < current;
    const active = num === current;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${done ? "bg-accent text-accent-foreground" : active ? "bg-primary text-primary-foreground ring-2 ring-primary/30" : "bg-muted text-muted-foreground"}`,
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : num
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[10px] mt-1 font-medium text-center max-w-[60px] ${active ? "text-foreground" : "text-muted-foreground"}`,
            children: label
          }
        )
      ] }),
      i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-0.5 w-10 mx-1 mb-4 rounded-full transition-smooth ${done ? "bg-accent" : "bg-border"}`
        }
      )
    ] }, label);
  }) });
}
const WIZARD_STEPS = ["Search", "Compare", "Quantity", "Confirm"];
function NewPurchaseOrderPage() {
  const navigate = useNavigate();
  const [medicineName, setMedicineName] = reactExports.useState("");
  const [qty, setQty] = reactExports.useState("1");
  const [selectedOffer, setSelectedOffer] = reactExports.useState(
    null
  );
  const [cartLines, setCartLines] = reactExports.useState([]);
  const { data: offers, isLoading: offersLoading } = useSearchDistributorOffers(medicineName);
  const createPO = useCreatePurchaseOrder();
  const sortedOffers = [...offers ?? []].sort(
    (a, b) => Number(b.score - a.score)
  );
  const bestValueId = sortedOffers.length > 0 ? sortedOffers.reduce(
    (best, o) => effectivePrice(o) < effectivePrice(best) ? o : best,
    sortedOffers[0]
  ).distributorId : null;
  const fastestDeliveryId = sortedOffers.length > 0 ? sortedOffers.reduce(
    (best, o) => o.deliveryDays < best.deliveryDays ? o : best,
    sortedOffers[0]
  ).distributorId : null;
  const wizardStep = (() => {
    if (cartLines.length > 0 && !medicineName) return 4;
    if (selectedOffer && medicineName) return 3;
    if (sortedOffers.length > 0 && medicineName.length > 1) return 2;
    return 1;
  })();
  const handleAddLine = () => {
    if (!selectedOffer || !medicineName || !qty) return;
    setCartLines((prev) => [
      ...prev,
      { offer: selectedOffer, qty: Number.parseInt(qty), medicineName }
    ]);
    setMedicineName("");
    setQty("1");
    setSelectedOffer(null);
  };
  const handleRemoveLine = (idx) => {
    setCartLines((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleSubmit = async () => {
    if (cartLines.length === 0 || !cartLines[0]) return;
    const firstLine = cartLines[0];
    try {
      await createPO.mutateAsync({
        distributorId: firstLine.offer.distributorId,
        lines: cartLines.map((l) => ({
          medicineName: l.medicineName,
          qty: BigInt(l.qty),
          unitPrice: l.offer.price,
          discountPct: l.offer.discountPct,
          medicineId: void 0
        }))
      });
      ue.success("Purchase order created!", {
        description: `${cartLines.length} item(s) ordered from ${firstLine.offer.distributorName}`
      });
      navigate({ to: "/purchase-orders" });
    } catch {
      ue.error("Failed to create purchase order", {
        description: "Please try again"
      });
    }
  };
  const totalAmount = cartLines.reduce(
    (sum, l) => sum + effectivePrice(l.offer) * BigInt(l.qty),
    BigInt(0)
  );
  const totalSavings = cartLines.reduce((sum, l) => {
    const full = l.offer.price * BigInt(l.qty);
    const eff = effectivePrice(l.offer) * BigInt(l.qty);
    return sum + (full - eff);
  }, BigInt(0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "new_po.page", className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "New Purchase Order",
        breadcrumb: "Purchase Orders",
        subtitle: "Search medicines, compare distributor offers and create an optimized order",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => navigate({ to: "/purchase-orders" }),
            "data-ocid": "new_po.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
              "Back"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: wizardStep, steps: WIZARD_STEPS }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent" }),
              "Supplier Intelligence Search",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "— powered by smart scoring (price 60% + delivery 40%)" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Medicine Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SearchInput,
                    {
                      placeholder: "e.g. Paracetamol 500mg, Metformin, Cetirizine...",
                      value: medicineName,
                      onChange: (v) => {
                        setMedicineName(v);
                        setSelectedOffer(null);
                      },
                      "data-ocid": "new_po.medicine_search_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "po-qty",
                      className: "text-xs text-muted-foreground mb-1.5 block",
                      children: "Quantity"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "po-qty",
                      type: "number",
                      min: "1",
                      value: qty,
                      onChange: (e) => setQty(e.target.value),
                      className: "h-9 text-sm font-mono",
                      "data-ocid": "new_po.qty_input"
                    }
                  )
                ] })
              ] }),
              offersLoading && medicineName.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }, k)) }),
              !offersLoading && sortedOffers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: sortedOffers.length }),
                    " ",
                    "distributor",
                    sortedOffers.length !== 1 ? "s" : "",
                    " found · ranked by smart score"
                  ] }),
                  selectedOffer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "bg-accent/10 text-accent text-xs gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        selectedOffer.distributorName,
                        " selected"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: sortedOffers.map((offer, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  OfferCard,
                  {
                    offer,
                    rank: i + 1,
                    isBestValue: offer.distributorId === bestValueId,
                    isFastestDelivery: offer.distributorId === fastestDeliveryId,
                    selected: (selectedOffer == null ? void 0 : selectedOffer.distributorId) === offer.distributorId,
                    onSelect: () => setSelectedOffer(offer)
                  },
                  offer.distributorId.toString()
                )) })
              ] }),
              !offersLoading && medicineName.length > 1 && sortedOffers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-7 h-7" }),
                  title: "No distributors found",
                  description: `No distributor carries "${medicineName}". Try an alternative brand or generic name.`,
                  "data-ocid": "new_po.offers_empty_state"
                }
              ),
              selectedOffer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Adding",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                      qty,
                      " × ",
                      medicineName
                    ] }),
                    " ",
                    "from",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: selectedOffer.distributorName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Line total:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: formatCurrency(
                      effectivePrice(selectedOffer) * BigInt(Number.parseInt(qty) || 1)
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    className: "bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 flex-shrink-0",
                    onClick: handleAddLine,
                    "data-ocid": "new_po.add_to_order_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                      "Add to Order",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          !medicineName && cartLines.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-accent mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Smart supplier matching" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Type any medicine name to instantly compare prices, stock availability, delivery times and discount schemes across all registered distributors. Best value and fastest delivery are auto-highlighted." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card sticky top-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-accent" }),
              "Order Summary"
            ] }),
            cartLines.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "bg-accent/20 text-accent font-mono text-xs",
                children: [
                  cartLines.length,
                  " item",
                  cartLines.length !== 1 ? "s" : ""
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: cartLines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-8",
              "data-ocid": "new_po.order_summary.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-muted/60 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-6 h-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No items yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Search a medicine and select a distributor" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            cartLines[0] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 text-accent flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ordering from" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground truncate", children: cartLines[0].offer.distributorName })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: cartLines.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "group flex items-start justify-between gap-2 py-2 border-b border-border last:border-0",
                "data-ocid": `new_po.cart_item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: line.medicineName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      line.qty,
                      " units ×",
                      " ",
                      formatCurrency(effectivePrice(line.offer))
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold", children: formatCurrency(
                      effectivePrice(line.offer) * BigInt(line.qty)
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleRemoveLine(idx),
                        className: "opacity-0 group-hover:opacity-100 transition-smooth w-5 h-5 rounded text-muted-foreground hover:text-destructive flex items-center justify-center",
                        "aria-label": "Remove item",
                        "data-ocid": `new_po.cart_remove.${idx + 1}`,
                        children: "×"
                      }
                    )
                  ] })
                ]
              },
              `cart-${line.medicineName}-${idx}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              totalSavings > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Discount savings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs font-semibold text-accent", children: [
                  "− ",
                  formatCurrency(totalSavings)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-accent", children: formatCurrency(totalAmount) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "w-full gap-1.5 text-accent border-accent/40 hover:bg-accent/10",
                onClick: () => {
                  setMedicineName("");
                  setQty("1");
                  setSelectedOffer(null);
                },
                "data-ocid": "new_po.add_medicine_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3 h-3" }),
                  "Add Another Medicine"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "lg",
                className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2",
                onClick: handleSubmit,
                disabled: createPO.isPending,
                "data-ocid": "new_po.submit_button",
                children: createPO.isPending ? "Creating order..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  "Place Order"
                ] })
              }
            )
          ] }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  NewPurchaseOrderPage as default
};
