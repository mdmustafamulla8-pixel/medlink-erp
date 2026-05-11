import { aa as useBackend, ab as useQuery, ah as useQueryClient, ai as useMutation } from "./index-D0FyCSZw.js";
function useListPurchaseOrders() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["purchase-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPurchaseOrders();
    },
    enabled: ready,
    refetchInterval: 3e4
  });
}
function useCreatePurchaseOrder() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPurchaseOrder(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["purchase-orders"] })
  });
}
function useUpdateOrderStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["purchase-orders"] })
  });
}
function useSearchDistributorOffers(medicineName) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["distributor-offers", medicineName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchDistributorOffers(medicineName);
    },
    enabled: ready && medicineName.length > 1
  });
}
function useListDistributors() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["distributors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDistributors();
    },
    enabled: ready
  });
}
function useAddDistributor() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addDistributor(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] })
  });
}
function useUpdateDistributor() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateDistributor(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] })
  });
}
function useDeleteDistributor() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteDistributor(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] })
  });
}
function useUpsertCatalogEntry() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      distributorId,
      input
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.upsertCatalogEntry(distributorId, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] })
  });
}
function useBulkUpsertCatalog() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      distributorId,
      entries
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bulkUpsertCatalog(distributorId, entries);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["distributors"] })
  });
}
export {
  useUpdateOrderStatus as a,
  useSearchDistributorOffers as b,
  useCreatePurchaseOrder as c,
  useListDistributors as d,
  useAddDistributor as e,
  useUpdateDistributor as f,
  useDeleteDistributor as g,
  useUpsertCatalogEntry as h,
  useBulkUpsertCatalog as i,
  useListPurchaseOrders as u
};
