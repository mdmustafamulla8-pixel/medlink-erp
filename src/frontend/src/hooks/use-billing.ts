import type { CustomerInput, InvoiceId, InvoiceInput } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./use-backend";

export function useListInvoices() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listInvoices();
    },
    enabled: ready,
  });
}

export function useGetInvoice(id: InvoiceId | null) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["invoice", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getInvoice(id);
    },
    enabled: ready && !!id,
  });
}

export function useCreateInvoice() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: InvoiceInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createInvoice(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["invoices"] });
      qc.invalidateQueries({ queryKey: ["sales-summary"] });
    },
  });
}

export function useListCustomers() {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCustomers();
    },
    enabled: ready,
  });
}

export function useAddCustomer() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CustomerInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCustomer(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });
}

export function useCustomerLedger(customerId: bigint | null) {
  const { actor, ready } = useBackend();
  return useQuery({
    queryKey: ["customer-ledger", customerId?.toString()],
    queryFn: async () => {
      if (!actor || !customerId) return [];
      return actor.getCustomerLedger(customerId);
    },
    enabled: ready && !!customerId,
  });
}
