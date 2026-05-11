import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCreatePurchaseOrder,
  useSearchDistributorOffers,
} from "@/hooks/use-purchase";
import { formatCurrency } from "@/lib/utils";
import type { DistributorOffer } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Package,
  ShoppingCart,
  Sparkles,
  Tag,
  Timer,
  TrendingDown,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// --- Effective price after discount ---
function effectivePrice(offer: DistributorOffer): bigint {
  const discount =
    offer.discountPct > BigInt(0) ? offer.discountPct : BigInt(0);
  return (offer.price * (BigInt(100) - discount)) / BigInt(100);
}

// --- Smart score bar ---
function ScoreBar({ score }: { score: bigint }) {
  const pct = Math.min(100, Math.max(0, Number(score)));
  const color =
    pct >= 80 ? "bg-accent" : pct >= 55 ? "bg-primary" : "bg-muted-foreground";
  return (
    <div className="mt-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
          Smart Score
        </span>
        <span className="font-mono text-xs font-bold text-foreground">
          {pct}/100
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-smooth ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// --- Distributor Offer Card ---
function OfferCard({
  offer,
  rank,
  isBestValue,
  isFastestDelivery,
  onSelect,
  selected,
}: {
  offer: DistributorOffer;
  rank: number;
  isBestValue: boolean;
  isFastestDelivery: boolean;
  onSelect: () => void;
  selected: boolean;
}) {
  const effPrice = effectivePrice(offer);
  const hasDiscount = offer.discountPct > BigInt(0);

  return (
    <Card
      className={`cursor-pointer transition-smooth border-2 ${
        selected
          ? "border-accent shadow-elevated"
          : isBestValue
            ? "border-accent/30 shadow-card"
            : "border-border shadow-card hover:border-accent/20"
      }`}
      onClick={onSelect}
      data-ocid={`new_po.offer_card.${rank}`}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-foreground truncate">
              {offer.distributorName}
            </p>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              {isBestValue && (
                <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 gap-0.5">
                  <TrendingDown className="w-2.5 h-2.5" />
                  Best Value
                </Badge>
              )}
              {isFastestDelivery && (
                <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 gap-0.5">
                  <Zap className="w-2.5 h-2.5" />
                  Fastest Delivery
                </Badge>
              )}
            </div>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-smooth mt-0.5 ${
              selected
                ? "border-accent bg-accent"
                : "border-border bg-transparent"
            }`}
          >
            {selected && (
              <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-mono font-bold text-xl text-foreground">
            {formatCurrency(effPrice)}
          </span>
          {hasDiscount && (
            <span className="font-mono text-sm text-muted-foreground line-through">
              {formatCurrency(offer.price)}
            </span>
          )}
          <span className="text-xs text-muted-foreground">/ unit</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-1">
          <div className="bg-muted/40 rounded-lg p-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Stock
            </p>
            <p className="font-mono font-bold text-sm">
              {offer.stockQty.toString()}
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Delivery
            </p>
            <p className="font-mono font-bold text-sm flex items-center gap-0.5">
              <Timer className="w-3 h-3 text-muted-foreground" />
              {offer.deliveryDays.toString()}d
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Discount
            </p>
            <p className="font-mono font-bold text-sm text-accent">
              {hasDiscount ? (
                <span className="flex items-center gap-0.5">
                  <Tag className="w-3 h-3" />
                  {offer.discountPct.toString()}%
                </span>
              ) : (
                "—"
              )}
            </p>
          </div>
        </div>

        <ScoreBar score={offer.score} />
      </CardContent>
    </Card>
  );
}

// --- Step indicator ---
function StepIndicator({
  current,
  steps,
}: {
  current: number;
  steps: string[];
}) {
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                  done
                    ? "bg-accent text-accent-foreground"
                    : active
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : num}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium text-center max-w-[60px] ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-10 mx-1 mb-4 rounded-full transition-smooth ${
                  done ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

type CartLine = {
  offer: DistributorOffer;
  qty: number;
  medicineName: string;
};

const WIZARD_STEPS = ["Search", "Compare", "Quantity", "Confirm"];

export default function NewPurchaseOrderPage() {
  const navigate = useNavigate();
  const [medicineName, setMedicineName] = useState("");
  const [qty, setQty] = useState("1");
  const [selectedOffer, setSelectedOffer] = useState<DistributorOffer | null>(
    null,
  );
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  const { data: offers, isLoading: offersLoading } =
    useSearchDistributorOffers(medicineName);
  const createPO = useCreatePurchaseOrder();

  // Sort by score desc; tag best value (lowest eff price) and fastest delivery
  const sortedOffers = [...(offers ?? [])].sort((a, b) =>
    Number(b.score - a.score),
  );

  const bestValueId =
    sortedOffers.length > 0
      ? sortedOffers.reduce(
          (best, o) => (effectivePrice(o) < effectivePrice(best) ? o : best),
          sortedOffers[0],
        ).distributorId
      : null;

  const fastestDeliveryId =
    sortedOffers.length > 0
      ? sortedOffers.reduce(
          (best, o) => (o.deliveryDays < best.deliveryDays ? o : best),
          sortedOffers[0],
        ).distributorId
      : null;

  // Determine current wizard step
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
      { offer: selectedOffer, qty: Number.parseInt(qty), medicineName },
    ]);
    setMedicineName("");
    setQty("1");
    setSelectedOffer(null);
  };

  const handleRemoveLine = (idx: number) => {
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
          medicineId: undefined,
        })),
      });
      toast.success("Purchase order created!", {
        description: `${cartLines.length} item(s) ordered from ${firstLine.offer.distributorName}`,
      });
      navigate({ to: "/purchase-orders" });
    } catch {
      toast.error("Failed to create purchase order", {
        description: "Please try again",
      });
    }
  };

  const totalAmount = cartLines.reduce(
    (sum, l) => sum + effectivePrice(l.offer) * BigInt(l.qty),
    BigInt(0),
  );

  const totalSavings = cartLines.reduce((sum, l) => {
    const full = l.offer.price * BigInt(l.qty);
    const eff = effectivePrice(l.offer) * BigInt(l.qty);
    return sum + (full - eff);
  }, BigInt(0));

  return (
    <div data-ocid="new_po.page" className="flex flex-col h-full">
      <PageHeader
        title="New Purchase Order"
        breadcrumb="Purchase Orders"
        subtitle="Search medicines, compare distributor offers and create an optimized order"
        actions={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/purchase-orders" })}
            data-ocid="new_po.back_button"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Step indicator */}
        <StepIndicator current={wizardStep} steps={WIZARD_STEPS} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Search + Compare */}
          <div className="lg:col-span-2 space-y-4">
            {/* Step 1 & 2: Search + Compare */}
            <Card className="shadow-card">
              <CardHeader className="pb-3 pt-4 px-5">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Supplier Intelligence Search
                  <span className="text-xs font-normal text-muted-foreground">
                    — powered by smart scoring (price 60% + delivery 40%)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                {/* Search row */}
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label className="text-xs text-muted-foreground mb-1.5 block">
                      Medicine Name
                    </Label>
                    <SearchInput
                      placeholder="e.g. Paracetamol 500mg, Metformin, Cetirizine..."
                      value={medicineName}
                      onChange={(v) => {
                        setMedicineName(v);
                        setSelectedOffer(null);
                      }}
                      data-ocid="new_po.medicine_search_input"
                    />
                  </div>
                  <div className="w-24">
                    <Label
                      htmlFor="po-qty"
                      className="text-xs text-muted-foreground mb-1.5 block"
                    >
                      Quantity
                    </Label>
                    <Input
                      id="po-qty"
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="h-9 text-sm font-mono"
                      data-ocid="new_po.qty_input"
                    />
                  </div>
                </div>

                {/* Loading state */}
                {offersLoading && medicineName.length > 1 && (
                  <div className="grid grid-cols-2 gap-3">
                    {["a", "b", "c", "d"].map((k) => (
                      <Skeleton key={k} className="h-48 rounded-xl" />
                    ))}
                  </div>
                )}

                {/* Offers grid */}
                {!offersLoading && sortedOffers.length > 0 && (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground font-medium">
                        <span className="text-foreground font-semibold">
                          {sortedOffers.length}
                        </span>{" "}
                        distributor{sortedOffers.length !== 1 ? "s" : ""} found
                        · ranked by smart score
                      </p>
                      {selectedOffer && (
                        <Badge
                          variant="secondary"
                          className="bg-accent/10 text-accent text-xs gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {selectedOffer.distributorName} selected
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sortedOffers.map((offer, i) => (
                        <OfferCard
                          key={offer.distributorId.toString()}
                          offer={offer}
                          rank={i + 1}
                          isBestValue={offer.distributorId === bestValueId}
                          isFastestDelivery={
                            offer.distributorId === fastestDeliveryId
                          }
                          selected={
                            selectedOffer?.distributorId === offer.distributorId
                          }
                          onSelect={() => setSelectedOffer(offer)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* No results */}
                {!offersLoading &&
                  medicineName.length > 1 &&
                  sortedOffers.length === 0 && (
                    <EmptyState
                      icon={<Package className="w-7 h-7" />}
                      title="No distributors found"
                      description={`No distributor carries "${medicineName}". Try an alternative brand or generic name.`}
                      data-ocid="new_po.offers_empty_state"
                    />
                  )}

                {/* Add to order button */}
                {selectedOffer && (
                  <div className="flex items-center gap-3 pt-1 border-t border-border">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Adding{" "}
                        <span className="font-semibold text-foreground">
                          {qty} × {medicineName}
                        </span>{" "}
                        from{" "}
                        <span className="text-accent font-semibold">
                          {selectedOffer.distributorName}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Line total:{" "}
                        <span className="font-mono font-bold text-foreground">
                          {formatCurrency(
                            effectivePrice(selectedOffer) *
                              BigInt(Number.parseInt(qty) || 1),
                          )}
                        </span>
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 flex-shrink-0"
                      onClick={handleAddLine}
                      data-ocid="new_po.add_to_order_button"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Order
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tip card when idle */}
            {!medicineName && cartLines.length === 0 && (
              <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
                <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Smart supplier matching
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Type any medicine name to instantly compare prices, stock
                    availability, delivery times and discount schemes across all
                    registered distributors. Best value and fastest delivery are
                    auto-highlighted.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <div>
            <Card className="shadow-card sticky top-4">
              <CardHeader className="pb-3 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <ShoppingCart className="w-4 h-4 text-accent" />
                    Order Summary
                  </CardTitle>
                  {cartLines.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-accent/20 text-accent font-mono text-xs"
                    >
                      {cartLines.length} item{cartLines.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                {cartLines.length === 0 ? (
                  <div
                    className="text-center py-8"
                    data-ocid="new_po.order_summary.empty_state"
                  >
                    <div className="w-12 h-12 bg-muted/60 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      No items yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Search a medicine and select a distributor
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Distributor banner */}
                    {cartLines[0] && (
                      <div className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
                        <Truck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Ordering from
                          </p>
                          <p className="text-sm font-bold text-foreground truncate">
                            {cartLines[0].offer.distributorName}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Line items */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {cartLines.map((line, idx) => (
                        <div
                          key={`cart-${line.medicineName}-${idx}`}
                          className="group flex items-start justify-between gap-2 py-2 border-b border-border last:border-0"
                          data-ocid={`new_po.cart_item.${idx + 1}`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate">
                              {line.medicineName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {line.qty} units ×{" "}
                              {formatCurrency(effectivePrice(line.offer))}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <p className="font-mono text-sm font-bold">
                              {formatCurrency(
                                effectivePrice(line.offer) * BigInt(line.qty),
                              )}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleRemoveLine(idx)}
                              className="opacity-0 group-hover:opacity-100 transition-smooth w-5 h-5 rounded text-muted-foreground hover:text-destructive flex items-center justify-center"
                              aria-label="Remove item"
                              data-ocid={`new_po.cart_remove.${idx + 1}`}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-1.5">
                      {totalSavings > BigInt(0) && (
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            Discount savings
                          </p>
                          <p className="font-mono text-xs font-semibold text-accent">
                            − {formatCurrency(totalSavings)}
                          </p>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-1">
                        <p className="text-sm font-bold">Total</p>
                        <p className="font-display font-bold text-xl text-accent">
                          {formatCurrency(totalAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Add another medicine */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full gap-1.5 text-accent border-accent/40 hover:bg-accent/10"
                      onClick={() => {
                        setMedicineName("");
                        setQty("1");
                        setSelectedOffer(null);
                      }}
                      data-ocid="new_po.add_medicine_button"
                    >
                      <Circle className="w-3 h-3" />
                      Add Another Medicine
                    </Button>

                    {/* Submit */}
                    <Button
                      type="button"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2"
                      onClick={handleSubmit}
                      disabled={createPO.isPending}
                      data-ocid="new_po.submit_button"
                    >
                      {createPO.isPending ? (
                        "Creating order..."
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
