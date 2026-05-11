import type { DateRange } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useBackend } from "./use-backend";

function todayRange(): DateRange {
  const now = BigInt(Date.now()) * BigInt(1_000_000);
  const startOfDay =
    BigInt(new Date().setHours(0, 0, 0, 0)) * BigInt(1_000_000);
  return { fromTime: startOfDay, toTime: now };
}

function last30DaysRange(): DateRange {
  const now = BigInt(Date.now()) * BigInt(1_000_000);
  const past =
    BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000);
  return { fromTime: past, toTime: now };
}

export function useSalesSummary(range?: DateRange) {
  const { actor, ready } = useBackend();
  const r = range ?? todayRange();
  return useQuery({
    queryKey: ["sales-summary", r.fromTime.toString(), r.toTime.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSalesSummary(r);
    },
    enabled: ready,
    refetchInterval: 60_000,
  });
}

export function usePurchaseSummary(range?: DateRange) {
  const { actor, ready } = useBackend();
  const r = range ?? last30DaysRange();
  return useQuery({
    queryKey: ["purchase-summary", r.fromTime.toString(), r.toTime.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPurchaseSummary(r);
    },
    enabled: ready,
  });
}

export function useGstBreakdown(range?: DateRange) {
  const { actor, ready } = useBackend();
  const r = range ?? last30DaysRange();
  return useQuery({
    queryKey: ["gst-breakdown", r.fromTime.toString(), r.toTime.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGstBreakdown(r);
    },
    enabled: ready,
  });
}
