import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListInvoices } from "@/hooks/use-billing";
import { useExpiryAlerts, useLowStockAlerts } from "@/hooks/use-inventory";
import { useListPurchaseOrders } from "@/hooks/use-purchase";
import { useSalesSummary } from "@/hooks/use-reports";
import {
  daysUntil,
  formatCurrency,
  formatDate,
  formatDateShort,
} from "@/lib/utils";
import type { ExpiryAlert, Invoice, LowStockAlert } from "@/types";
import { OrderStatus, PaymentMode } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Package,
  ReceiptText,
  ShoppingCart,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  accent,
  onClick,
  ocid,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  accent?: boolean;
  onClick?: () => void;
  ocid?: string;
}) {
  return (
    <Card
      className={`shadow-card transition-smooth ${
        onClick ? "cursor-pointer hover:shadow-elevated" : ""
      }`}
      onClick={onClick}
      data-ocid={ocid}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
              {title}
            </p>
            <p
              className={`font-display font-bold text-2xl ${
                accent ? "text-accent" : "text-foreground"
              }`}
            >
              {value}
            </p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              accent ? "bg-accent/15" : "bg-muted"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                accent ? "text-accent" : "text-muted-foreground"
              }`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Revenue Chart ─────────────────────────────────────────────────────────────
function RevenueTrendChart({ invoices }: { invoices: Invoice[] }) {
  const data = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const dayStart = d.setHours(0, 0, 0, 0);
      const dayEnd = dayStart + 86_400_000;
      const dayRevenue = invoices
        .filter((inv) => {
          const ms = Number(inv.createdAt) / 1_000_000;
          return !inv.isReturn && ms >= dayStart && ms < dayEnd;
        })
        .reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
      return {
        day: new Date(dayStart).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        revenue: dayRevenue / 100,
      };
    });
  }, [invoices]);

  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="oklch(0.6 0.15 145)"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="oklch(0.6 0.15 145)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(0.9 0.008 230 / 0.5)"
        />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 10, fill: "oklch(0.5 0.012 230)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "oklch(0.5 0.012 230)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`
          }
          width={42}
        />
        <Tooltip
          formatter={(v: number) =>
            new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(v)
          }
          contentStyle={{
            background: "oklch(1.0 0.004 230)",
            border: "1px solid oklch(0.9 0.008 230)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="oklch(0.6 0.15 145)"
          strokeWidth={2}
          fill="url(#revenueGrad)"
          dot={{ r: 3, fill: "oklch(0.6 0.15 145)", strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Top Medicines ─────────────────────────────────────────────────────────────
function TopMedicinesTable({ invoices }: { invoices: Invoice[] }) {
  const topMeds = useMemo(() => {
    const map = new Map<
      string,
      { name: string; qty: number; revenue: number }
    >();
    for (const inv of invoices) {
      if (inv.isReturn) continue;
      for (const line of inv.lineItems) {
        const key = line.medicineName;
        const existing = map.get(key) ?? {
          name: line.medicineName,
          qty: 0,
          revenue: 0,
        };
        map.set(key, {
          name: line.medicineName,
          qty: existing.qty + Number(line.qty),
          revenue: existing.revenue + Number(line.lineTotal),
        });
      }
    }
    return Array.from(map.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [invoices]);

  if (topMeds.length === 0) {
    return (
      <div
        className="py-8 text-center text-sm text-muted-foreground"
        data-ocid="dashboard.top_medicines.empty_state"
      >
        No sales data yet
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {topMeds.map((med, idx) => (
        <div
          key={med.name}
          className="flex items-center gap-3 px-4 py-2.5"
          data-ocid={`dashboard.top_medicine.item.${idx + 1}`}
        >
          <span className="w-5 h-5 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">
            {idx + 1}
          </span>
          <p className="flex-1 text-sm font-medium text-foreground truncate min-w-0">
            {med.name}
          </p>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-semibold font-mono">
              {formatCurrency(BigInt(med.revenue))}
            </p>
            <p className="text-xs text-muted-foreground">{med.qty} units</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Recent Invoices ───────────────────────────────────────────────────────────
const PAYMENT_LABELS: Record<string, string> = {
  [PaymentMode.cash]: "Cash",
  [PaymentMode.upi]: "UPI",
  [PaymentMode.card]: "Card",
};

function RecentInvoicesList({
  invoices,
  onViewAll,
}: {
  invoices: Invoice[];
  onViewAll: () => void;
}) {
  const recent = invoices.slice(0, 5);

  return (
    <Card className="shadow-card" data-ocid="dashboard.recent_invoices_section">
      <CardHeader className="pb-2 pt-4 px-5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide">
          Recent Invoices
        </CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-xs h-7"
          onClick={onViewAll}
          data-ocid="dashboard.view_all_invoices_link"
        >
          View all
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {recent.length === 0 ? (
          <div
            className="py-8 text-center text-sm text-muted-foreground"
            data-ocid="dashboard.invoices.empty_state"
          >
            No invoices yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((inv, idx) => (
              <div
                key={inv.id.toString()}
                className="flex items-center gap-3 px-4 py-3"
                data-ocid={`dashboard.invoice.item.${idx + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {inv.customerName}
                    </p>
                    {inv.isReturn && (
                      <Badge
                        variant="destructive"
                        className="text-[10px] px-1.5 py-0 h-4"
                      >
                        Return
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    #{inv.invoiceNumber} · {formatDateShort(inv.createdAt)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold font-mono">
                    {formatCurrency(inv.totalAmount)}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 mt-0.5"
                  >
                    {PAYMENT_LABELS[String(inv.paymentMode)] ??
                      String(inv.paymentMode)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Expandable Low Stock Panel ────────────────────────────────────────────────
function LowStockPanel({ alerts }: { alerts: LowStockAlert[] }) {
  const [open, setOpen] = useState(false);
  if (alerts.length === 0) return null;

  return (
    <div
      className="rounded-lg border border-destructive/30 overflow-hidden"
      data-ocid="dashboard.low_stock_panel"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-destructive/8 hover:bg-destructive/12 transition-smooth"
        onClick={() => setOpen((p) => !p)}
        data-ocid="dashboard.low_stock_panel.toggle"
      >
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">
            Low Stock Alerts
          </span>
          <span className="text-xs font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full">
            {alerts.length}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-destructive" />
        ) : (
          <ChevronDown className="w-4 h-4 text-destructive" />
        )}
      </button>
      {open && (
        <div className="divide-y divide-destructive/10 bg-destructive/5">
          {alerts.map((alert, idx) => (
            <div
              key={alert.medicineId.toString()}
              className="flex items-center justify-between px-4 py-2.5"
              data-ocid={`dashboard.low_stock_alert.item.${idx + 1}`}
            >
              <p className="text-sm font-medium text-foreground truncate flex-1 min-w-0">
                {alert.medicineName}
              </p>
              <div className="flex items-center gap-4 flex-shrink-0 ml-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-sm font-bold text-destructive">
                    {Number(alert.currentStock)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Threshold</p>
                  <p className="text-sm font-semibold text-foreground">
                    {Number(alert.threshold)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Expandable Expiry Alerts Panel ───────────────────────────────────────────
function ExpiryAlertsPanel({ alerts }: { alerts: ExpiryAlert[] }) {
  const [open, setOpen] = useState(false);
  if (alerts.length === 0) return null;

  return (
    <div
      className="rounded-lg border border-yellow-400/40 overflow-hidden"
      data-ocid="dashboard.expiry_panel"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-yellow-400/8 hover:bg-yellow-400/14 transition-smooth"
        onClick={() => setOpen((p) => !p)}
        data-ocid="dashboard.expiry_panel.toggle"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
            Expiry Alerts
          </span>
          <span className="text-xs font-bold bg-yellow-500 text-foreground px-1.5 py-0.5 rounded-full">
            {alerts.length}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        )}
      </button>
      {open && (
        <div className="divide-y divide-yellow-400/20 bg-yellow-400/5">
          {alerts.map((alert, idx) => {
            const days = daysUntil(alert.expiryDate);
            return (
              <div
                key={alert.batchId.toString()}
                className="flex items-center justify-between px-4 py-2.5"
                data-ocid={`dashboard.expiry_alert.item.${idx + 1}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {alert.medicineName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Batch: {alert.batchNumber}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 ml-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Expires</p>
                    <p className="text-sm font-medium">
                      {formatDate(alert.expiryDate)}
                    </p>
                  </div>
                  <Badge
                    variant={days <= 7 ? "destructive" : "outline"}
                    className="text-xs min-w-[60px] justify-center"
                  >
                    {days <= 0 ? "Expired" : `${days}d`}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: sales, isLoading: salesLoading } = useSalesSummary();
  const { data: lowStock = [] } = useLowStockAlerts();
  const { data: expiry = [] } = useExpiryAlerts(BigInt(30));
  const { data: orders = [] } = useListPurchaseOrders();
  const { data: invoices = [], isLoading: invoicesLoading } = useListInvoices();

  const pendingOrders = orders.filter(
    (o) => String(o.status) === String(OrderStatus.pending),
  );

  return (
    <div data-ocid="dashboard.page" className="flex flex-col h-full">
      <PageHeader
        title="Dashboard"
        subtitle={`Today's overview — ${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}`}
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate({ to: "/billing" })}
              data-ocid="dashboard.new_bill_button"
            >
              <ReceiptText className="w-4 h-4 mr-1.5" />
              New Bill
              <kbd className="ml-1.5 text-[10px] bg-muted px-1 py-0.5 rounded font-mono">
                F1
              </kbd>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate({ to: "/inventory" })}
              data-ocid="dashboard.check_inventory_button"
            >
              <FlaskConical className="w-4 h-4 mr-1.5" />
              Inventory
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => navigate({ to: "/purchase-orders/new" })}
              data-ocid="dashboard.new_po_button"
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              New PO
            </Button>
          </>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ── Stat Cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {salesLoading ? (
            ["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-24 rounded-xl" />
            ))
          ) : (
            <>
              <StatCard
                title="Today's Revenue"
                value={formatCurrency(sales?.totalSales ?? BigInt(0))}
                sub={`${sales?.totalInvoices ?? 0} invoices today`}
                icon={TrendingUp}
                accent
                ocid="dashboard.revenue_stat"
              />
              <StatCard
                title="Net Revenue"
                value={formatCurrency(sales?.netRevenue ?? BigInt(0))}
                sub={`Returns: ${formatCurrency(sales?.totalReturns ?? BigInt(0))}`}
                icon={ReceiptText}
                ocid="dashboard.net_revenue_stat"
              />
              <StatCard
                title="Low Stock"
                value={String(lowStock.length)}
                sub="Items need reorder"
                icon={Package}
                onClick={
                  lowStock.length > 0
                    ? () => navigate({ to: "/inventory" })
                    : undefined
                }
                ocid="dashboard.low_stock_stat"
              />
              <StatCard
                title="Pending Orders"
                value={String(pendingOrders.length)}
                sub="Purchase orders"
                icon={Clock}
                onClick={
                  pendingOrders.length > 0
                    ? () => navigate({ to: "/purchase-orders" })
                    : undefined
                }
                ocid="dashboard.pending_orders_stat"
              />
            </>
          )}
        </div>

        {/* ── Revenue Trend + Top Medicines ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card
            className="shadow-card lg:col-span-3"
            data-ocid="dashboard.revenue_chart_section"
          >
            <CardHeader className="pb-1 pt-4 px-5">
              <CardTitle className="text-sm font-semibold uppercase tracking-wide">
                Revenue Trend — Last 7 Days
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {invoicesLoading ? (
                <Skeleton className="h-40 w-full rounded-lg" />
              ) : (
                <RevenueTrendChart invoices={invoices} />
              )}
            </CardContent>
          </Card>

          <Card
            className="shadow-card lg:col-span-2"
            data-ocid="dashboard.top_medicines_section"
          >
            <CardHeader className="pb-1 pt-4 px-5">
              <CardTitle className="text-sm font-semibold uppercase tracking-wide">
                Top 5 Medicines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              {invoicesLoading ? (
                <div className="px-4 space-y-2 py-2">
                  {["a", "b", "c", "d", "e"].map((k) => (
                    <Skeleton key={k} className="h-9 w-full rounded" />
                  ))}
                </div>
              ) : (
                <TopMedicinesTable invoices={invoices} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Alerts + Recent Orders ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alert Panels */}
          <div className="space-y-3" data-ocid="dashboard.alerts_section">
            <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
              Alerts
            </h2>
            <LowStockPanel alerts={lowStock} />
            <ExpiryAlertsPanel alerts={expiry} />
            {lowStock.length === 0 && expiry.length === 0 && (
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
                <p className="text-sm font-medium text-accent">
                  All systems healthy
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  No critical alerts today
                </p>
              </div>
            )}
            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-12 flex-col gap-1 text-xs"
                onClick={() => navigate({ to: "/inventory" })}
                data-ocid="dashboard.inventory_shortcut"
              >
                <FlaskConical className="w-4 h-4" />
                Inventory
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-12 flex-col gap-1 text-xs"
                onClick={() => navigate({ to: "/distributors" })}
                data-ocid="dashboard.distributors_shortcut"
              >
                <Truck className="w-4 h-4" />
                Distributors
              </Button>
            </div>
          </div>

          {/* Recent Purchase Orders */}
          <div
            className="lg:col-span-2"
            data-ocid="dashboard.recent_orders_section"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
                Recent Purchase Orders
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => navigate({ to: "/purchase-orders" })}
                data-ocid="dashboard.view_all_orders_link"
              >
                View all
              </Button>
            </div>
            <Card className="shadow-card">
              <CardContent className="p-0">
                {orders.length === 0 ? (
                  <div
                    className="py-10 text-center"
                    data-ocid="dashboard.orders.empty_state"
                  >
                    <ShoppingCart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No purchase orders yet
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => navigate({ to: "/purchase-orders/new" })}
                      data-ocid="dashboard.empty_po.create_button"
                    >
                      Create first order
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {orders.slice(0, 5).map((order, idx) => (
                      <div
                        key={order.id.toString()}
                        className="flex items-center justify-between px-4 py-3"
                        data-ocid={`dashboard.order.item.${idx + 1}`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {order.distributorName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(order.createdAt)} · {order.lines.length}{" "}
                            items
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                          <span className="text-sm font-semibold font-mono">
                            {formatCurrency(order.totalAmount)}
                          </span>
                          <StatusBadge status={order.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Recent Invoices + GST Summary ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {invoicesLoading ? (
              <Skeleton className="h-64 w-full rounded-xl" />
            ) : (
              <RecentInvoicesList
                invoices={invoices}
                onViewAll={() => navigate({ to: "/billing" })}
              />
            )}
          </div>

          {/* GST Summary */}
          {sales && (
            <Card
              className="shadow-card"
              data-ocid="dashboard.gst_summary_section"
            >
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide">
                  Today's GST
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-4 space-y-3">
                {[
                  { label: "GST 5%", value: sales.gst5Total },
                  { label: "GST 12%", value: sales.gst12Total },
                  { label: "GST 18%", value: sales.gst18Total },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold font-mono">
                      {formatCurrency(value)}
                    </p>
                  </div>
                ))}
                <div className="border-t border-border pt-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">
                    Total GST
                  </p>
                  <p className="text-base font-bold font-mono text-accent">
                    {formatCurrency(sales.totalGst)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
