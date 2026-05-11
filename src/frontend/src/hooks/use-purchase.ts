import type {
  CatalogEntryInput,
  DistributorId,
  DistributorInput,
  OrderId,
  PurchaseOrderInput,
} from "@/types";
import type { OrderStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./use-backend";

export function useListPurchaseOrders() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["purchase-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPurchaseOrders();
    },
    enabled: ready,
    refetchInterval: 30_000,
  });
}

export function useGetPurchaseOrder(id: OrderId | null) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["purchase-order", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getPurchaseOrder(id);
    },
    enabled: ready && !!id,
  });
}

export function useCreatePurchaseOrder() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: PurchaseOrderInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPurchaseOrder(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["purchase-orders"] }),
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: OrderId; status: OrderStatus }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["purchase-orders"] }),
  });
}

export function useSearchDistributorOffers(medicineName: string) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["distributor-offers", medicineName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchDistributorOffers(medicineName);
    },
    enabled: ready && medicineName.length > 1,
  });
}

export function useListDistributors() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["distributors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDistributors();
    },
    enabled: ready,
  });
}

export function useAddDistributor() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: DistributorInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addDistributor(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] }),
  });
}

export function useUpdateDistributor() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: { id: DistributorId; input: DistributorInput }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateDistributor(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] }),
  });
}

export function useDeleteDistributor() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: DistributorId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteDistributor(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] }),
  });
}

export function useUpsertCatalogEntry() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      distributorId,
      input,
    }: { distributorId: DistributorId; input: CatalogEntryInput }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.upsertCatalogEntry(distributorId, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] }),
  });
}

export function useBulkUpsertCatalog() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      distributorId,
      entries,
    }: { distributorId: DistributorId; entries: Array<CatalogEntryInput> }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bulkUpsertCatalog(distributorId, entries);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] }),
  });
}

export function useGetDistributorCatalog(distributorId: DistributorId | null) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["distributor-catalog", distributorId?.toString()],
    queryFn: async () => {
      if (!actor || !distributorId) return [];
      const offers = await actor.searchDistributorOffers("");
      return offers.filter((o) => o.distributorId === distributorId);
    },
    enabled: ready && !!distributorId,
  });
}
