import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  useAddDistributor,
  useBulkUpsertCatalog,
  useDeleteDistributor,
  useListDistributors,
  useUpdateDistributor,
  useUpsertCatalogEntry,
} from "@/hooks/use-purchase";
import type {
  CatalogEntryInput,
  Distributor,
  DistributorCatalogEntry,
  DistributorId,
  DistributorInput,
} from "@/types";
import {
  AlertTriangle,
  Download,
  FileSpreadsheet,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Trash2,
  Truck,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── types ──────────────────────────────────────────────────────────────────

type DistributorFormData = {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
};

type CatalogFormData = {
  medicineName: string;
  hsnCode: string;
  price: string;
  stockQty: string;
  deliveryDays: string;
  discountPct: string;
};

const EMPTY_FORM: DistributorFormData = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  gstNumber: "",
};

const EMPTY_CATALOG_FORM: CatalogFormData = {
  medicineName: "",
  hsnCode: "",
  price: "",
  stockQty: "",
  deliveryDays: "",
  discountPct: "0",
};

const SAMPLE_CSV_COLUMNS =
  "medicineName,hsnCode,price,stockQty,deliveryDays,discountPct";
const SAMPLE_CSV_ROWS = [
  "Paracetamol 500mg,30049099,1200,500,2,5",
  "Amoxicillin 250mg,30041011,2500,300,3,0",
  "Metformin 500mg,30049040,800,1000,1,10",
];
const SAMPLE_CSV = [SAMPLE_CSV_COLUMNS, ...SAMPLE_CSV_ROWS].join("\n");

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatPaisa(paisa: bigint) {
  return `₹${(Number(paisa) / 100).toFixed(2)}`;
}

function parseCsv(text: string): CatalogEntryInput[] {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];
  const header = lines[0].trim().toLowerCase();
  const required = [
    "medicinename",
    "hsncode",
    "price",
    "stockqty",
    "deliverydays",
    "discountpct",
  ];
  if (!required.every((h) => header.includes(h))) return [];
  const cols = header.split(",").map((c) => c.trim());
  return lines.slice(1).map((line) => {
    const vals = line.split(",").map((v) => v.trim());
    const get = (name: string) => vals[cols.indexOf(name)] ?? "";
    return {
      medicineName: get("medicinename"),
      hsnCode: get("hsncode"),
      price: BigInt(Math.round(Number(get("price")))),
      stockQty: BigInt(Math.round(Number(get("stockqty")))),
      deliveryDays: BigInt(Math.round(Number(get("deliverydays")))),
      discountPct: BigInt(Math.round(Number(get("discountpct")))),
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

// ─── DistributorForm ─────────────────────────────────────────────────────────

function DistributorForm({
  form,
  onChange,
}: {
  form: DistributorFormData;
  onChange: (f: DistributorFormData) => void;
}) {
  const set =
    (key: keyof DistributorFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...form, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2 space-y-1.5">
        <Label htmlFor="dist-name">
          Company Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="dist-name"
          placeholder="e.g. Sunrise Pharma Distributors"
          value={form.name}
          onChange={set("name")}
          data-ocid="distributors.form.name_input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dist-contact">Contact Person</Label>
        <Input
          id="dist-contact"
          placeholder="e.g. Rajesh Kumar"
          value={form.contactPerson}
          onChange={set("contactPerson")}
          data-ocid="distributors.form.contact_input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dist-phone">Phone</Label>
        <Input
          id="dist-phone"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={set("phone")}
          data-ocid="distributors.form.phone_input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dist-email">Email</Label>
        <Input
          id="dist-email"
          type="email"
          placeholder="orders@sunrise.com"
          value={form.email}
          onChange={set("email")}
          data-ocid="distributors.form.email_input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="dist-gst">GST Number</Label>
        <Input
          id="dist-gst"
          placeholder="22AAAAA0000A1Z5"
          value={form.gstNumber}
          onChange={set("gstNumber")}
          className="font-mono"
          data-ocid="distributors.form.gst_input"
        />
      </div>
      <div className="sm:col-span-2 space-y-1.5">
        <Label htmlFor="dist-addr">Address</Label>
        <Input
          id="dist-addr"
          placeholder="Street, City, State, PIN"
          value={form.address}
          onChange={set("address")}
          data-ocid="distributors.form.address_input"
        />
      </div>
    </div>
  );
}

// ─── CatalogEntryForm ─────────────────────────────────────────────────────────

function CatalogEntryForm({
  form,
  onChange,
  onSubmit,
  isPending,
}: {
  form: CatalogFormData;
  onChange: (f: CatalogFormData) => void;
  onSubmit: () => void;
  isPending: boolean;
}) {
  const set =
    (key: keyof CatalogFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...form, [key]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="border border-border rounded-xl p-4 bg-muted/30 space-y-4"
    >
      <p className="text-sm font-semibold text-foreground">Add Catalog Entry</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 space-y-1">
          <Label htmlFor="cat-med">Medicine Name</Label>
          <Input
            id="cat-med"
            placeholder="Paracetamol 500mg"
            value={form.medicineName}
            onChange={set("medicineName")}
            data-ocid="catalog.form.medicine_input"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cat-hsn">HSN Code</Label>
          <Input
            id="cat-hsn"
            placeholder="30049099"
            value={form.hsnCode}
            onChange={set("hsnCode")}
            className="font-mono"
            data-ocid="catalog.form.hsn_input"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cat-price">Price (₹ paise)</Label>
          <Input
            id="cat-price"
            type="number"
            placeholder="1200"
            value={form.price}
            onChange={set("price")}
            data-ocid="catalog.form.price_input"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cat-qty">Stock Qty</Label>
          <Input
            id="cat-qty"
            type="number"
            placeholder="500"
            value={form.stockQty}
            onChange={set("stockQty")}
            data-ocid="catalog.form.qty_input"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cat-days">Delivery Days</Label>
          <Input
            id="cat-days"
            type="number"
            placeholder="2"
            value={form.deliveryDays}
            onChange={set("deliveryDays")}
            data-ocid="catalog.form.delivery_input"
          />
        </div>
        <div className="col-span-2 space-y-1">
          <Label htmlFor="cat-disc">Discount %</Label>
          <Input
            id="cat-disc"
            type="number"
            placeholder="5"
            value={form.discountPct}
            onChange={set("discountPct")}
            data-ocid="catalog.form.discount_input"
          />
        </div>
      </div>
      <Button
        type="submit"
        size="sm"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={isPending || !form.medicineName}
        data-ocid="catalog.form.submit_button"
      >
        <Plus className="w-3.5 h-3.5 mr-1.5" />
        Add Entry
      </Button>
    </form>
  );
}

// ─── CatalogSheet ─────────────────────────────────────────────────────────────

function CatalogSheet({
  distributor,
  onClose,
}: {
  distributor: Distributor | null;
  onClose: () => void;
}) {
  const [catalogForm, setCatalogForm] =
    useState<CatalogFormData>(EMPTY_CATALOG_FORM);
  // Local catalog entries (session state since there's no direct list endpoint)
  const [localEntries, setLocalEntries] = useState<DistributorCatalogEntry[]>(
    [],
  );

  const upsertEntry = useUpsertCatalogEntry();
  const bulkUpsert = useBulkUpsertCatalog();
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleAddEntry = () => {
    if (!distributor) return;
    const input: CatalogEntryInput = {
      medicineName: catalogForm.medicineName,
      hsnCode: catalogForm.hsnCode,
      price: BigInt(Math.round(Number(catalogForm.price))),
      stockQty: BigInt(Math.round(Number(catalogForm.stockQty))),
      deliveryDays: BigInt(Math.round(Number(catalogForm.deliveryDays))),
      discountPct: BigInt(Math.round(Number(catalogForm.discountPct))),
    };
    upsertEntry.mutate(
      { distributorId: distributor.id, input },
      {
        onSuccess: (entry) => {
          setLocalEntries((prev) => {
            const exists = prev.findIndex(
              (e) => e.medicineName === entry.medicineName,
            );
            if (exists >= 0) {
              const updated = [...prev];
              updated[exists] = entry;
              return updated;
            }
            return [...prev, entry];
          });
          setCatalogForm(EMPTY_CATALOG_FORM);
          toast.success(`${entry.medicineName} added to catalog`);
        },
        onError: () => toast.error("Failed to add catalog entry"),
      },
    );
  };

  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !distributor) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const entries = parseCsv(text);
      if (entries.length === 0) {
        toast.error("Invalid CSV format. Please use the sample template.");
        return;
      }
      bulkUpsert.mutate(
        { distributorId: distributor.id, entries },
        {
          onSuccess: (count) => {
            toast.success(`${count} catalog entries imported successfully`);
            // Add locally with timestamps
            const now = BigInt(Date.now()) * BigInt(1_000_000);
            const newEntries: DistributorCatalogEntry[] = entries.map((e) => ({
              ...e,
              distributorId: distributor.id,
              updatedAt: now,
            }));
            setLocalEntries((prev) => {
              const merged = [...prev];
              for (const ne of newEntries) {
                const idx = merged.findIndex(
                  (m) => m.medicineName === ne.medicineName,
                );
                if (idx >= 0) merged[idx] = ne;
                else merged.push(ne);
              }
              return merged;
            });
          },
          onError: () => toast.error("CSV import failed"),
        },
      );
    };
    reader.readAsText(file);
    // Reset file input so the same file can be re-imported
    e.target.value = "";
  };

  return (
    <Sheet
      open={!!distributor}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl flex flex-col p-0 gap-0"
        data-ocid="distributors.catalog.sheet"
      >
        <SheetHeader className="px-6 py-4 border-b border-border bg-card">
          <SheetTitle className="font-display text-lg">
            {distributor?.name} — Catalog
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {distributor?.contactPerson} · {distributor?.phone}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* CSV import actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              ref={csvInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleCsvImport}
              data-ocid="catalog.csv_file_input"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => csvInputRef.current?.click()}
              disabled={bulkUpsert.isPending}
              data-ocid="catalog.csv_upload_button"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              {bulkUpsert.isPending ? "Importing…" : "Import CSV"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={downloadSampleCsv}
              data-ocid="catalog.sample_csv_button"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Sample CSV
            </Button>
            <p className="text-xs text-muted-foreground ml-auto">
              Columns: medicineName, hsnCode, price, stockQty, deliveryDays,
              discountPct
            </p>
          </div>

          {/* Catalog table */}
          {localEntries.length > 0 ? (
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Medicine</TableHead>
                    <TableHead>HSN</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Days</TableHead>
                    <TableHead className="text-right">Disc %</TableHead>
                    <TableHead className="text-right">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localEntries.map((entry, idx) => (
                    <TableRow
                      key={`${entry.medicineName}-${idx}`}
                      data-ocid={`catalog.item.${idx + 1}`}
                    >
                      <TableCell className="font-medium">
                        {entry.medicineName}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {entry.hsnCode}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatPaisa(entry.price)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {entry.stockQty.toString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {entry.deliveryDays.toString()}d
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {entry.discountPct.toString()}%
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {new Date(
                          Number(entry.updatedAt) / 1_000_000,
                        ).toLocaleDateString("en-IN")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-10 rounded-xl border border-dashed border-border text-center"
              data-ocid="catalog.empty_state"
            >
              <FileSpreadsheet className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">
                No catalog entries yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Add entries manually or import via CSV
              </p>
            </div>
          )}

          {/* Add entry form */}
          <CatalogEntryForm
            form={catalogForm}
            onChange={setCatalogForm}
            onSubmit={handleAddEntry}
            isPending={upsertEntry.isPending}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── DeleteConfirmDialog ─────────────────────────────────────────────────────

function DeleteConfirmDialog({
  distributor,
  onConfirm,
  onCancel,
  isPending,
}: {
  distributor: Distributor | null;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog
      open={!!distributor}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent data-ocid="distributors.delete.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Remove Distributor
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to remove{" "}
          <span className="font-semibold text-foreground">
            {distributor?.name}
          </span>
          ? This will also delete all their catalog entries and cannot be
          undone.
        </p>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-ocid="distributors.delete.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="distributors.delete.confirm_button"
          >
            {isPending ? "Removing…" : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── DistributorDialog ────────────────────────────────────────────────────────

function DistributorDialog({
  open,
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  isPending,
}: {
  open: boolean;
  mode: "add" | "edit";
  form: DistributorFormData;
  onChange: (f: DistributorFormData) => void;
  onSubmit: () => void;
  onClose: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="max-w-lg"
        data-ocid={
          mode === "add"
            ? "distributors.add.dialog"
            : "distributors.edit.dialog"
        }
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {mode === "add" ? "Add Distributor" : "Edit Distributor"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          <DistributorForm form={form} onChange={onChange} />
          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid={
                mode === "add"
                  ? "distributors.add.cancel_button"
                  : "distributors.edit.cancel_button"
              }
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isPending || !form.name.trim()}
              data-ocid={
                mode === "add"
                  ? "distributors.add.submit_button"
                  : "distributors.edit.submit_button"
              }
            >
              {isPending
                ? mode === "add"
                  ? "Adding…"
                  : "Saving…"
                : mode === "add"
                  ? "Add Distributor"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── DistributorCard ──────────────────────────────────────────────────────────

function DistributorCard({
  dist,
  idx,
  onEdit,
  onDelete,
  onViewCatalog,
}: {
  dist: Distributor;
  idx: number;
  onEdit: (d: Distributor) => void;
  onDelete: (d: Distributor) => void;
  onViewCatalog: (d: Distributor) => void;
}) {
  return (
    <Card
      className="shadow-card hover:shadow-elevated transition-smooth group"
      data-ocid={`distributors.item.${idx}`}
    >
      <CardContent className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="font-display font-bold text-base text-foreground truncate leading-tight">
              {dist.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {dist.contactPerson}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`text-[11px] flex-shrink-0 font-medium ${
              dist.isActive
                ? "bg-accent/15 text-accent border-accent/25"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {dist.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Contact info */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
            <span className="truncate">{dist.phone}</span>
          </div>
          {dist.email && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
              <span className="truncate">{dist.email}</span>
            </div>
          )}
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-accent" />
            <span className="line-clamp-2">{dist.address}</span>
          </div>
        </div>

        {/* GST */}
        {dist.gstNumber && (
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              GST
            </span>
            <span className="text-[11px] font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
              {dist.gstNumber}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 pt-3 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs flex-1 text-accent hover:text-accent hover:bg-accent/10"
            onClick={() => onViewCatalog(dist)}
            data-ocid={`distributors.catalog_button.${idx}`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
            View Catalog
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => onEdit(dist)}
            data-ocid={`distributors.edit_button.${idx}`}
          >
            <Pencil className="w-3.5 h-3.5 mr-1" />
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(dist)}
            data-ocid={`distributors.delete_button.${idx}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DistributorsPage() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Distributor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Distributor | null>(null);
  const [catalogTarget, setCatalogTarget] = useState<Distributor | null>(null);
  const [addForm, setAddForm] = useState<DistributorFormData>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<DistributorFormData>(EMPTY_FORM);

  const { data: distributors, isLoading } = useListDistributors();
  const addDistributor = useAddDistributor();
  const updateDistributor = useUpdateDistributor();
  const deleteDistributor = useDeleteDistributor();

  const filtered = (distributors ?? []).filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      d.phone?.includes(search),
  );

  const toInput = (f: DistributorFormData): DistributorInput => ({
    name: f.name.trim(),
    contactPerson: f.contactPerson.trim(),
    phone: f.phone.trim(),
    email: f.email.trim() || undefined,
    address: f.address.trim(),
    gstNumber: f.gstNumber.trim() || undefined,
  });

  const handleAdd = () => {
    addDistributor.mutate(toInput(addForm), {
      onSuccess: () => {
        toast.success(`${addForm.name} added successfully`);
        setAddOpen(false);
        setAddForm(EMPTY_FORM);
      },
      onError: () => toast.error("Failed to add distributor"),
    });
  };

  const handleEdit = () => {
    if (!editTarget) return;
    updateDistributor.mutate(
      { id: editTarget.id as DistributorId, input: toInput(editForm) },
      {
        onSuccess: () => {
          toast.success(`${editForm.name} updated`);
          setEditTarget(null);
        },
        onError: () => toast.error("Failed to update distributor"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteDistributor.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(`${deleteTarget.name} removed`);
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to remove distributor"),
    });
  };

  const openEdit = (d: Distributor) => {
    setEditForm({
      name: d.name,
      contactPerson: d.contactPerson,
      phone: d.phone,
      email: d.email ?? "",
      address: d.address,
      gstNumber: d.gstNumber ?? "",
    });
    setEditTarget(d);
  };

  return (
    <div data-ocid="distributors.page" className="flex flex-col h-full">
      <PageHeader
        title="Distributors"
        subtitle="Manage your supplier network, pricing catalogs, and delivery performance"
        actions={
          <Button
            type="button"
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => {
              setAddForm(EMPTY_FORM);
              setAddOpen(true);
            }}
            data-ocid="distributors.add_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Distributor
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Search + count */}
        <div className="flex items-center gap-3 mb-5">
          <SearchInput
            placeholder="Search by name, contact or phone…"
            value={search}
            onChange={setSearch}
            className="max-w-sm"
            data-ocid="distributors.search_input"
          />
          {!isLoading && (
            <Badge variant="secondary" className="font-mono text-xs">
              {filtered.length}{" "}
              {filtered.length === 1 ? "distributor" : "distributors"}
            </Badge>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton key={k} className="h-52 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Truck className="w-8 h-8" />}
            title={search ? "No distributors found" : "No distributors yet"}
            description={
              search
                ? "Try a different search term"
                : "Add your first distributor to start comparing prices and managing orders"
            }
            action={
              !search
                ? { label: "Add Distributor", onClick: () => setAddOpen(true) }
                : undefined
            }
            data-ocid="distributors.empty_state"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((dist, idx) => (
              <DistributorCard
                key={dist.id.toString()}
                dist={dist}
                idx={idx + 1}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
                onViewCatalog={setCatalogTarget}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add dialog */}
      <DistributorDialog
        open={addOpen}
        mode="add"
        form={addForm}
        onChange={setAddForm}
        onSubmit={handleAdd}
        onClose={() => setAddOpen(false)}
        isPending={addDistributor.isPending}
      />

      {/* Edit dialog */}
      <DistributorDialog
        open={!!editTarget}
        mode="edit"
        form={editForm}
        onChange={setEditForm}
        onSubmit={handleEdit}
        onClose={() => setEditTarget(null)}
        isPending={updateDistributor.isPending}
      />

      {/* Delete confirm */}
      <DeleteConfirmDialog
        distributor={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteDistributor.isPending}
      />

      {/* Catalog sheet */}
      <CatalogSheet
        distributor={catalogTarget}
        onClose={() => setCatalogTarget(null)}
      />
    </div>
  );
}
