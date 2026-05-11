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
import { useAddBatch } from "@/hooks/use-inventory";
import type { Medicine, MedicineId } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AddBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicines: Medicine[];
  preselectedId?: MedicineId | null;
}

export function AddBatchDialog({
  open,
  onOpenChange,
  medicines,
  preselectedId,
}: AddBatchDialogProps) {
  const addBatch = useAddBatch();
  const [medicineId, setMedicineId] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [qty, setQty] = useState("1");
  const [purchasePrice, setPurchasePrice] = useState("");

  useEffect(() => {
    if (open) {
      setMedicineId(preselectedId ? preselectedId.toString() : "");
      setBatchNumber("");
      setExpiryDate("");
      setQty("1");
      setPurchasePrice("");
    }
  }, [open, preselectedId]);

  const isValid =
    medicineId && batchNumber.trim() && expiryDate && Number(qty) > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const expiryTs = BigInt(new Date(expiryDate).getTime()) * BigInt(1_000_000);
    addBatch.mutate(
      {
        medicineId: BigInt(medicineId),
        batchNumber: batchNumber.trim(),
        expiryDate: expiryTs,
        qty: BigInt(Number.parseInt(qty, 10)),
        purchasePrice: BigInt(
          Math.round(Number.parseFloat(purchasePrice || "0") * 100),
        ),
      },
      {
        onSuccess: () => {
          toast.success("Batch added successfully");
          onOpenChange(false);
        },
        onError: () => toast.error("Failed to add batch"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-ocid="inventory.batch_dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Add Stock Batch
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label className="text-sm font-medium">
              Medicine <span className="text-destructive">*</span>
            </Label>
            <Select value={medicineId} onValueChange={setMedicineId}>
              <SelectTrigger data-ocid="inventory.batch_medicine_select">
                <SelectValue placeholder="Select medicine" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((m) => (
                  <SelectItem key={m.id.toString()} value={m.id.toString()}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="batch-no" className="text-sm font-medium">
                Batch Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="batch-no"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="e.g. BT2024001"
                required
                data-ocid="inventory.batch_number_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="batch-expiry" className="text-sm font-medium">
                Expiry Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="batch-expiry"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                data-ocid="inventory.batch_expiry_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="batch-qty" className="text-sm font-medium">
                Quantity <span className="text-destructive">*</span>
              </Label>
              <Input
                id="batch-qty"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                required
                data-ocid="inventory.batch_qty_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="batch-price" className="text-sm font-medium">
                Purchase Price (₹)
              </Label>
              <Input
                id="batch-price"
                type="number"
                min="0"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="0.00"
                data-ocid="inventory.batch_price_input"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={addBatch.isPending}
              data-ocid="inventory.batch_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addBatch.isPending || !isValid}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              data-ocid="inventory.batch_submit_button"
            >
              {addBatch.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Add Batch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
