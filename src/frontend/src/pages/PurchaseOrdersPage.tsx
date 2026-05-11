import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  useListPurchaseOrders,
  useUpdateOrderStatus,
} from "@/hooks/use-purchase";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronRight,
  Package,
  Plus,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";

type FilterStatus = "all" | OrderStatus;

const FILTER_TABS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: OrderStatus.pending, label: "Pending" },
  { value: OrderStatus.confirmed, label: "Confirmed" },
  { value: OrderStatus.shipped, label: "Shipped" },
  { value: OrderStatus.delivered, label: "Delivered" },
];

const NEXT_STATUS: Partial<
  Record<OrderStatus, { status: OrderStatus; label: string; icon: ReactNode }>
> = {
  [OrderStatus.pending]: {
    status: OrderStatus.confirmed,
    label: "Confirm",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  [OrderStatus.confirmed]: {
    status: OrderStatus.shipped,
    label: "Mark Shipped",
    icon: <Truck className="w-3 h-3" />,
  },
  [OrderStatus.shipped]: {
    status: OrderStatus.delivered,
    label: "Mark Delivered",
    icon: <Package className="w-3 h-3" />,
  },
};

export default function PurchaseOrdersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const { data: orders, isLoading } = useListPurchaseOrders();
  const updateStatus = useUpdateOrderStatus();

  const filtered = (orders ?? []).filter((o) => {
    const matchSearch =
      o.distributorName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toString().includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const countByStatus = (status: OrderStatus) =>
    (orders ?? []).filter((o) => o.status === status).length;

  return (
    <div data-ocid="purchase_orders.page" className="flex flex-col h-full">
      <PageHeader
        title="Purchase Orders"
        subtitle="Track and manage orders from distributors"
        actions={
          <Button
            type="button"
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5"
            onClick={() => navigate({ to: "/purchase-orders/new" })}
            data-ocid="purchase_orders.new_button"
          >
            <Plus className="w-4 h-4" />
            New Order
            <kbd className="text-[10px] bg-accent-foreground/20 px-1 py-0.5 rounded font-mono">
              F3
            </kbd>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1 w-fit">
          {FILTER_TABS.map((tab) => {
            const count =
              tab.value === "all"
                ? (orders ?? []).length
                : countByStatus(tab.value as OrderStatus);
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                data-ocid={`purchase_orders.filter.${tab.value}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                  statusFilter === tab.value
                    ? "bg-card shadow-subtle text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1 py-0 h-4 min-w-4 ${
                      statusFilter === tab.value
                        ? "bg-accent/20 text-accent"
                        : ""
                    }`}
                  >
                    {count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <SearchInput
          placeholder="Search by distributor name or order ID..."
          value={search}
          onChange={setSearch}
          className="max-w-sm"
          data-ocid="purchase_orders.search_input"
        />

        {/* Table */}
        {isLoading ? (
          <div className="space-y-2">
            {["a", "b", "c", "d", "e"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="w-8 h-8" />}
            title={search ? "No matching orders" : "No purchase orders yet"}
            description={
              search
                ? "Try a different search term"
                : "Create a new order to start comparing distributor prices"
            }
            action={{
              label: "Create New Order",
              onClick: () => navigate({ to: "/purchase-orders/new" }),
            }}
            data-ocid="purchase_orders.empty_state"
          />
        ) : (
          <Card className="shadow-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-xs uppercase tracking-wide pl-5">
                      Order ID
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Distributor
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-center">
                      Items
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                      Total
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-right pr-5">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order, idx) => {
                    const nextStep = NEXT_STATUS[order.status as OrderStatus];
                    return (
                      <TableRow
                        key={order.id.toString()}
                        data-ocid={`purchase_orders.item.${idx + 1}`}
                        className="hover:bg-muted/20 transition-colors group"
                      >
                        <TableCell className="font-mono text-sm font-bold text-primary pl-5">
                          #PO-{order.id.toString().padStart(4, "0")}
                        </TableCell>
                        <TableCell>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-foreground truncate max-w-[160px]">
                              {order.distributorName}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="secondary"
                            className="font-mono text-xs"
                          >
                            {order.lines.length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-sm">
                          {formatCurrency(order.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-right pr-5">
                          <div className="flex items-center justify-end gap-2">
                            {nextStep &&
                              order.status !== OrderStatus.cancelled && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs gap-1 text-accent border-accent/40 hover:bg-accent/10 hover:text-accent"
                                  onClick={() =>
                                    updateStatus.mutate({
                                      id: order.id,
                                      status: nextStep.status,
                                    })
                                  }
                                  disabled={updateStatus.isPending}
                                  data-ocid={`purchase_orders.advance_button.${idx + 1}`}
                                >
                                  {nextStep.icon}
                                  {nextStep.label}
                                </Button>
                              )}
                            {(order.status === OrderStatus.pending ||
                              order.status === OrderStatus.confirmed) && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                  updateStatus.mutate({
                                    id: order.id,
                                    status: OrderStatus.cancelled,
                                  })
                                }
                                disabled={updateStatus.isPending}
                                data-ocid={`purchase_orders.cancel_button.${idx + 1}`}
                              >
                                <X className="w-3 h-3" />
                                Cancel
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-smooth"
                              data-ocid={`purchase_orders.view_button.${idx + 1}`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
