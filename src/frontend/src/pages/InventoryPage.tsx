import { AddBatchDialog } from "@/components/inventory/AddBatchDialog";
import { DeleteMedicineDialog } from "@/components/inventory/DeleteMedicineDialog";
import { MedicineFormDialog } from "@/components/inventory/MedicineFormDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { GstBadge } from "@/components/shared/GstBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useExpiryAlerts,
  useListMedicines,
  useLowStockAlerts,
} from "@/hooks/use-inventory";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { Medicine, MedicineId } from "@/types";
import {
  AlertTriangle,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Layers,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 20;
const SKELETON_ROWS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

function StockQtyCell({ qty, threshold }: { qty: bigint; threshold: bigint }) {
  const isLow = qty <= threshold;
  return (
    <span
      className={cn(
        "font-mono font-semibold text-sm tabular-nums",
        isLow ? "text-destructive" : "text-foreground",
      )}
    >
      {qty.toString()}
      {isLow && (
        <AlertTriangle className="inline ml-1 w-3 h-3 text-destructive" />
      )}
    </span>
  );
}

function ExpiryCell({ expiry }: { expiry: bigint | undefined }) {
  if (!expiry) return <span className="text-muted-foreground text-sm">—</span>;
  const ms = Number(expiry) / 1_000_000;
  const daysLeft = Math.ceil((ms - Date.now()) / (1000 * 60 * 60 * 24));
  const urgent = daysLeft <= 30;
  const expired = daysLeft < 0;
  return (
    <span
      className={cn(
        "text-sm font-medium",
        expired
          ? "text-destructive"
          : urgent
            ? "text-amber-600 dark:text-amber-400"
            : "text-muted-foreground",
      )}
    >
      {formatDate(expiry)}
      {urgent && !expired && (
        <span className="ml-1 text-[10px] font-bold">({daysLeft}d)</span>
      )}
      {expired && <span className="ml-1 text-[10px] font-bold">(EXPIRED)</span>}
    </span>
  );
}

function MedicineTable({
  medicines,
  onEdit,
  onDelete,
  onAddBatch,
}: {
  medicines: Medicine[];
  onEdit: (m: Medicine) => void;
  onDelete: (m: Medicine) => void;
  onAddBatch: (id: MedicineId) => void;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(medicines.length / PAGE_SIZE));
  const slice = medicines.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 if medicines list changes length
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally track array length only
  useEffect(() => {
    setPage(1);
  }, [medicines.length]);

  if (medicines.length === 0) {
    return null; // handled by parent
  }

  return (
    <>
      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-semibold text-xs uppercase tracking-wide w-[220px]">
                  Medicine
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide">
                  Generic
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide">
                  HSN
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                  Stock
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                  MRP
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                  Purchase
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide">
                  GST
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide">
                  Nearest Expiry
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide">
                  Rack
                </TableHead>
                <TableHead className="w-28" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {slice.map((med, idx) => (
                <TableRow
                  key={med.id.toString()}
                  data-ocid={`inventory.item.${(page - 1) * PAGE_SIZE + idx + 1}`}
                  className={cn(
                    "hover:bg-muted/30 transition-colors",
                    med.stockQty <= med.lowStockThreshold &&
                      "bg-destructive/5 hover:bg-destructive/10",
                  )}
                >
                  <TableCell>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground truncate max-w-[200px]">
                        {med.name}
                      </p>
                      {med.barcodeId && (
                        <p className="text-[11px] text-muted-foreground font-mono leading-tight">
                          {med.barcodeId}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[140px] truncate">
                    {med.genericName || "—"}
                  </TableCell>
                  <TableCell className="text-sm font-mono text-muted-foreground">
                    {med.hsnCode || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <StockQtyCell
                      qty={med.stockQty}
                      threshold={med.lowStockThreshold}
                    />
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm tabular-nums">
                    {formatCurrency(med.unitPrice)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm tabular-nums text-muted-foreground">
                    {formatCurrency(med.purchasePrice)}
                  </TableCell>
                  <TableCell>
                    <GstBadge rate={med.gstRate} />
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-accent underline underline-offset-2 transition-colors"
                      onClick={() => onAddBatch(med.id)}
                      title="Open batch list to view expiry dates"
                    >
                      View Batches
                    </button>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {med.rackLocation || "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5 justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-accent"
                        onClick={() => onAddBatch(med.id)}
                        title="Add Batch"
                        data-ocid={`inventory.add_batch_button.${(page - 1) * PAGE_SIZE + idx + 1}`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                        onClick={() => onEdit(med)}
                        title="Edit"
                        data-ocid={`inventory.edit_button.${(page - 1) * PAGE_SIZE + idx + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(med)}
                        title="Delete"
                        data-ocid={`inventory.delete_button.${(page - 1) * PAGE_SIZE + idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, medicines.length)} of {medicines.length}{" "}
            medicines
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              data-ocid="inventory.pagination_prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium tabular-nums">
              {page} / {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              data-ocid="inventory.pagination_next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editMedicine, setEditMedicine] = useState<Medicine | null>(null);
  const [deleteMedicine, setDeleteMedicine] = useState<Medicine | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [batchPreselect, setBatchPreselect] = useState<MedicineId | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: medicines = [], isLoading } = useListMedicines();
  const { data: lowStockAlerts = [] } = useLowStockAlerts();
  const { data: expiryAlerts = [] } = useExpiryAlerts(BigInt(30));

  // Keyboard shortcut: N = New Medicine
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "n" || e.key === "N") {
        setAddOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const lowStockIds = useMemo(
    () => new Set(lowStockAlerts.map((a) => a.medicineId.toString())),
    [lowStockAlerts],
  );

  const expiringMedicineIds = useMemo(
    () => new Set(expiryAlerts.map((a) => a.medicineId.toString())),
    [expiryAlerts],
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return medicines.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.genericName.toLowerCase().includes(term) ||
        m.hsnCode.toLowerCase().includes(term),
    );
  }, [medicines, search]);

  const lowStockMedicines = useMemo(
    () => filtered.filter((m) => lowStockIds.has(m.id.toString())),
    [filtered, lowStockIds],
  );

  const expiringMedicines = useMemo(
    () => filtered.filter((m) => expiringMedicineIds.has(m.id.toString())),
    [filtered, expiringMedicineIds],
  );

  const handleAddBatch = (id: MedicineId) => {
    setBatchPreselect(id);
    setBatchOpen(true);
  };

  const handleEdit = (med: Medicine) => setEditMedicine(med);
  const handleDelete = (med: Medicine) => setDeleteMedicine(med);

  return (
    <div
      ref={pageRef}
      data-ocid="inventory.page"
      className="flex flex-col h-full"
      tabIndex={-1}
    >
      <PageHeader
        title="Inventory"
        subtitle="Manage medicines, stock batches and alerts"
        actions={
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setBatchOpen(true)}
              data-ocid="inventory.open_batch_button"
            >
              <Layers className="w-4 h-4 mr-1.5" />
              Add Batch
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setAddOpen(true)}
              data-ocid="inventory.add_button"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Medicine
              <kbd className="ml-2 text-[10px] font-mono opacity-60 border border-accent-foreground/30 rounded px-1">
                N
              </kbd>
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Search + count row */}
        <div className="flex items-center gap-3 mb-5">
          <SearchInput
            placeholder="Search by name, generic, HSN code..."
            value={search}
            onChange={setSearch}
            className="max-w-sm"
            data-ocid="inventory.search_input"
          />
          {!isLoading && (
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs tabular-nums"
              >
                {filtered.length} total
              </Badge>
              {lowStockAlerts.length > 0 && (
                <Badge
                  variant="secondary"
                  className="font-mono text-xs bg-destructive/10 text-destructive border-0"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {lowStockAlerts.length} low stock
                </Badge>
              )}
              {expiryAlerts.length > 0 && (
                <Badge
                  variant="secondary"
                  className="font-mono text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0"
                >
                  <CalendarClock className="w-3 h-3 mr-1" />
                  {expiryAlerts.length} expiring
                </Badge>
              )}
            </div>
          )}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          data-ocid="inventory.tabs"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="all" data-ocid="inventory.all_tab">
              All Medicines
              <Badge
                variant="secondary"
                className="ml-2 text-xs font-mono tabular-nums h-4 px-1.5"
              >
                {filtered.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="low-stock" data-ocid="inventory.low_stock_tab">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-destructive" />
              Low Stock
              {lowStockMedicines.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 text-xs font-mono bg-destructive/10 text-destructive border-0 h-4 px-1.5"
                >
                  {lowStockMedicines.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="expiring" data-ocid="inventory.expiring_tab">
              <CalendarClock className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              Expiring Soon
              {expiringMedicines.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 h-4 px-1.5"
                >
                  {expiringMedicines.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="space-y-2">
              {SKELETON_ROWS.map((k) => (
                <Skeleton key={k} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="all" className="m-0">
                {filtered.length === 0 ? (
                  <EmptyState
                    icon={<FlaskConical className="w-8 h-8" />}
                    title={search ? "No medicines found" : "No medicines yet"}
                    description={
                      search
                        ? "Try adjusting your search"
                        : "Add your first medicine to get started"
                    }
                    action={
                      !search
                        ? {
                            label: "Add Medicine",
                            onClick: () => setAddOpen(true),
                          }
                        : undefined
                    }
                    data-ocid="inventory.empty_state"
                  />
                ) : (
                  <MedicineTable
                    medicines={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAddBatch={handleAddBatch}
                  />
                )}
              </TabsContent>

              <TabsContent value="low-stock" className="m-0">
                {lowStockMedicines.length === 0 ? (
                  <EmptyState
                    icon={
                      <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                    }
                    title="No low stock alerts"
                    description="All medicines are above their threshold quantities"
                    data-ocid="inventory.low_stock_empty_state"
                  />
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      The following medicines are at or below their low stock
                      threshold.
                    </p>
                    <MedicineTable
                      medicines={lowStockMedicines}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddBatch={handleAddBatch}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="expiring" className="m-0">
                {expiryAlerts.length === 0 ? (
                  <EmptyState
                    icon={
                      <CalendarClock className="w-8 h-8 text-muted-foreground" />
                    }
                    title="No expiring batches"
                    description="No batches expiring within the next 30 days"
                    data-ocid="inventory.expiring_empty_state"
                  />
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Batches expiring within the next 30 days.
                    </p>
                    <Card className="shadow-card">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                              <TableHead className="font-semibold text-xs uppercase tracking-wide">
                                Medicine
                              </TableHead>
                              <TableHead className="font-semibold text-xs uppercase tracking-wide">
                                Batch No.
                              </TableHead>
                              <TableHead className="font-semibold text-xs uppercase tracking-wide">
                                Expiry Date
                              </TableHead>
                              <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                                Qty
                              </TableHead>
                              <TableHead className="w-24" />
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {expiryAlerts.map((alert, idx) => {
                              const daysLeft = Math.ceil(
                                (Number(alert.expiryDate) / 1_000_000 -
                                  Date.now()) /
                                  (1000 * 60 * 60 * 24),
                              );
                              return (
                                <TableRow
                                  key={alert.batchId.toString()}
                                  data-ocid={`inventory.expiry_item.${idx + 1}`}
                                  className={cn(
                                    "hover:bg-muted/30 transition-colors",
                                    daysLeft <= 7 &&
                                      "bg-destructive/5 hover:bg-destructive/10",
                                    daysLeft > 7 &&
                                      daysLeft <= 30 &&
                                      "bg-amber-500/5",
                                  )}
                                >
                                  <TableCell className="font-medium text-sm">
                                    {alert.medicineName}
                                  </TableCell>
                                  <TableCell className="font-mono text-sm">
                                    {alert.batchNumber}
                                  </TableCell>
                                  <TableCell>
                                    <ExpiryCell expiry={alert.expiryDate} />
                                  </TableCell>
                                  <TableCell className="text-right font-mono text-sm tabular-nums">
                                    {alert.qty.toString()}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="secondary"
                                      className={cn(
                                        "text-[11px] font-bold border-0",
                                        daysLeft <= 0
                                          ? "bg-destructive/15 text-destructive"
                                          : daysLeft <= 7
                                            ? "bg-destructive/10 text-destructive"
                                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                                      )}
                                    >
                                      {daysLeft <= 0
                                        ? "EXPIRED"
                                        : `${daysLeft}d left`}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      {/* Dialogs */}
      <MedicineFormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        medicine={null}
      />
      <MedicineFormDialog
        open={!!editMedicine}
        onOpenChange={(open) => !open && setEditMedicine(null)}
        medicine={editMedicine}
      />
      <DeleteMedicineDialog
        medicine={deleteMedicine}
        onClose={() => setDeleteMedicine(null)}
      />
      <AddBatchDialog
        open={batchOpen}
        onOpenChange={setBatchOpen}
        medicines={medicines}
        preselectedId={batchPreselect}
      />
    </div>
  );
}
