import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddMedicine, useUpdateMedicine } from "@/hooks/use-inventory";
import { GstRate } from "@/types";
import type { Medicine, MedicineInput } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface MedicineFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicine?: Medicine | null;
}

const EMPTY_FORM: {
  name: string;
  genericName: string;
  hsnCode: string;
  gstRate: GstRate;
  unitPrice: string;
  purchasePrice: string;
  stockQty: string;
  lowStockThreshold: string;
  rackLocation: string;
  barcodeId: string;
} = {
  name: "",
  genericName: "",
  hsnCode: "",
  gstRate: GstRate.gst12,
  unitPrice: "",
  purchasePrice: "",
  stockQty: "0",
  lowStockThreshold: "10",
  rackLocation: "",
  barcodeId: "",
};

export function MedicineFormDialog({
  open,
  onOpenChange,
  medicine,
}: MedicineFormDialogProps) {
  const isEdit = !!medicine;
  const addMedicine = useAddMedicine();
  const updateMedicine = useUpdateMedicine();
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    if (medicine) {
      setForm({
        name: medicine.name,
        genericName: medicine.genericName,
        hsnCode: medicine.hsnCode,
        gstRate: medicine.gstRate as GstRate,
        unitPrice: (Number(medicine.unitPrice) / 100).toString(),
        purchasePrice: (Number(medicine.purchasePrice) / 100).toString(),
        stockQty: medicine.stockQty.toString(),
        lowStockThreshold: medicine.lowStockThreshold.toString(),
        rackLocation: medicine.rackLocation,
        barcodeId: medicine.barcodeId ?? "",
      });
    } else {
      setForm({ ...EMPTY_FORM });
    }
  }, [medicine]);

  const set = (k: keyof typeof EMPTY_FORM, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const isPending = addMedicine.isPending || updateMedicine.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const input: MedicineInput = {
      name: form.name.trim(),
      genericName: form.genericName.trim(),
      hsnCode: form.hsnCode.trim(),
      gstRate: form.gstRate,
      unitPrice: BigInt(
        Math.round(Number.parseFloat(form.unitPrice || "0") * 100),
      ),
      purchasePrice: BigInt(
        Math.round(Number.parseFloat(form.purchasePrice || "0") * 100),
      ),
      stockQty: BigInt(Number.parseInt(form.stockQty || "0", 10)),
      lowStockThreshold: BigInt(
        Number.parseInt(form.lowStockThreshold || "10", 10),
      ),
      rackLocation: form.rackLocation.trim(),
      barcodeId: form.barcodeId.trim() || undefined,
    };

    if (isEdit && medicine) {
      updateMedicine.mutate(
        { id: medicine.id, input },
        {
          onSuccess: () => {
            toast.success(`${form.name} updated`);
            onOpenChange(false);
          },
          onError: () => toast.error("Failed to update medicine"),
        },
      );
    } else {
      addMedicine.mutate(input, {
        onSuccess: () => {
          toast.success(`${form.name} added to inventory`);
          onOpenChange(false);
        },
        onError: () => toast.error("Failed to add medicine"),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg"
        data-ocid={isEdit ? "inventory.edit_dialog" : "inventory.add_dialog"}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {isEdit ? "Edit Medicine" : "Add New Medicine"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label htmlFor="med-name" className="text-sm font-medium">
                Medicine Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="med-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Paracetamol 500mg"
                required
                autoFocus
                data-ocid="inventory.name_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="med-generic" className="text-sm font-medium">
                Generic Name
              </Label>
              <Input
                id="med-generic"
                value={form.genericName}
                onChange={(e) => set("genericName", e.target.value)}
                placeholder="e.g. Acetaminophen"
                data-ocid="inventory.generic_name_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="med-hsn" className="text-sm font-medium">
                HSN Code
              </Label>
              <Input
                id="med-hsn"
                value={form.hsnCode}
                onChange={(e) => set("hsnCode", e.target.value)}
                placeholder="e.g. 30049099"
                data-ocid="inventory.hsn_input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">GST Rate</Label>
              <Select
                value={form.gstRate}
                onValueChange={(v) => set("gstRate", v as GstRate)}
              >
                <SelectTrigger data-ocid="inventory.gst_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={GstRate.gst5}>5%</SelectItem>
                  <SelectItem value={GstRate.gst12}>12%</SelectItem>
                  <SelectItem value={GstRate.gst18}>18%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="med-mrp" className="text-sm font-medium">
                MRP / Unit Price (₹)
              </Label>
              <Input
                id="med-mrp"
                type="number"
                min="0"
                step="0.01"
                value={form.unitPrice}
                onChange={(e) => set("unitPrice", e.target.value)}
                placeholder="0.00"
                data-ocid="inventory.unit_price_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="med-purchase" className="text-sm font-medium">
                Purchase Price (₹)
              </Label>
              <Input
                id="med-purchase"
                type="number"
                min="0"
                step="0.01"
                value={form.purchasePrice}
                onChange={(e) => set("purchasePrice", e.target.value)}
                placeholder="0.00"
                data-ocid="inventory.purchase_price_input"
              />
            </div>
            {!isEdit && (
              <div className="space-y-1">
                <Label htmlFor="med-stock" className="text-sm font-medium">
                  Initial Stock Qty
                </Label>
                <Input
                  id="med-stock"
                  type="number"
                  min="0"
                  value={form.stockQty}
                  onChange={(e) => set("stockQty", e.target.value)}
                  data-ocid="inventory.stock_qty_input"
                />
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="med-threshold" className="text-sm font-medium">
                Low Stock Threshold
              </Label>
              <Input
                id="med-threshold"
                type="number"
                min="0"
                value={form.lowStockThreshold}
                onChange={(e) => set("lowStockThreshold", e.target.value)}
                data-ocid="inventory.threshold_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="med-rack" className="text-sm font-medium">
                Rack Location
              </Label>
              <Input
                id="med-rack"
                value={form.rackLocation}
                onChange={(e) => set("rackLocation", e.target.value)}
                placeholder="e.g. A-12"
                data-ocid="inventory.rack_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="med-barcode" className="text-sm font-medium">
                Barcode ID
              </Label>
              <Input
                id="med-barcode"
                value={form.barcodeId}
                onChange={(e) => set("barcodeId", e.target.value)}
                placeholder="Scan or type barcode"
                data-ocid="inventory.barcode_input"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              data-ocid="inventory.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !form.name.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              data-ocid="inventory.submit_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEdit ? "Save Changes" : "Add Medicine"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
