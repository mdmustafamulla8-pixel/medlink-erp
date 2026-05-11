import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteMedicine } from "@/hooks/use-inventory";
import type { Medicine } from "@/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteMedicineDialogProps {
  medicine: Medicine | null;
  onClose: () => void;
}

export function DeleteMedicineDialog({
  medicine,
  onClose,
}: DeleteMedicineDialogProps) {
  const deleteMedicine = useDeleteMedicine();

  const handleConfirm = () => {
    if (!medicine) return;
    deleteMedicine.mutate(medicine.id, {
      onSuccess: () => {
        toast.success(`${medicine.name} deleted`);
        onClose();
      },
      onError: () => toast.error("Failed to delete medicine"),
    });
  };

  return (
    <AlertDialog open={!!medicine} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent data-ocid="inventory.delete_dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">
            Delete Medicine?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove{" "}
            <span className="font-semibold text-foreground">
              {medicine?.name}
            </span>{" "}
            from inventory. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteMedicine.isPending}
            data-ocid="inventory.delete_cancel_button"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteMedicine.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-ocid="inventory.delete_confirm_button"
          >
            {deleteMedicine.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
