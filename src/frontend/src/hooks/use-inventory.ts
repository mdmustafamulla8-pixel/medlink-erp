import type { BatchInput, MedicineId, MedicineInput } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./use-backend";

export function useListMedicines() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMedicines();
    },
    enabled: ready,
  });
}

export function useSearchMedicines(term: string) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["medicines", "search", term],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchMedicines(term);
    },
    enabled: ready && term.length > 1,
  });
}

export function useGetMedicine(id: MedicineId | null) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["medicine", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getMedicine(id);
    },
    enabled: ready && !!id,
  });
}

export function useLowStockAlerts() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["low-stock-alerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLowStockAlerts();
    },
    enabled: ready,
    refetchInterval: 60_000,
  });
}

export function useExpiryAlerts(withinDays = BigInt(30)) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["expiry-alerts", withinDays.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExpiryAlerts(withinDays);
    },
    enabled: ready,
    refetchInterval: 60_000,
  });
}

export function useAddMedicine() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: MedicineInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addMedicine(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["medicines"] }),
  });
}

export function useUpdateMedicine() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: MedicineId; input: MedicineInput }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateMedicine(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["medicines"] }),
  });
}

export function useDeleteMedicine() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: MedicineId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteMedicine(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["medicines"] }),
  });
}

export function useAddBatch() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: BatchInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addBatch(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["medicines"] }),
  });
}

export function useListBatchesForMedicine(medicineId: MedicineId | null) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["batches", medicineId?.toString()],
    queryFn: async () => {
      if (!actor || !medicineId) return [];
      return actor.listBatchesForMedicine(medicineId);
    },
    enabled: ready && !!medicineId,
  });
}
