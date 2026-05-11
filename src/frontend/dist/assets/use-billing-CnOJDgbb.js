import { aa as useBackend, ab as useQuery, ah as useQueryClient, ai as useMutation } from "./index-D0FyCSZw.js";
function useListInvoices() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listInvoices();
    },
    enabled: ready
  });
}
function useCreateInvoice() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createInvoice(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invoices"] });
      qc.invalidateQueries({ queryKey: ["sales-summary"] });
    }
  });
}
function useListCustomers() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCustomers();
    },
    enabled: ready
  });
}
function useAddCustomer() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCustomer(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] })
  });
}
export {
  useListCustomers as a,
  useCreateInvoice as b,
  useAddCustomer as c,
  useListInvoices as u
};
