import { create } from "zustand";
import type { CartItem } from "../types";

interface CartState {
  items: CartItem[];
  customerName: string;
  customerId: bigint | undefined;
  paymentMode: "cash" | "upi" | "card";
  addItem: (item: CartItem) => void;
  removeItem: (medicineId: bigint, batchId: bigint) => void;
  updateQty: (medicineId: bigint, batchId: bigint, qty: number) => void;
  updateDiscount: (
    medicineId: bigint,
    batchId: bigint,
    discountPct: number,
  ) => void;
  clearCart: () => void;
  setCustomer: (name: string, id?: bigint) => void;
  setPaymentMode: (mode: "cash" | "upi" | "card") => void;
  getSubtotal: () => bigint;
  getTotal: () => bigint;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  customerName: "",
  customerId: undefined,
  paymentMode: "cash",

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.medicineId === item.medicineId && i.batchId === item.batchId,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.medicineId === item.medicineId && i.batchId === item.batchId
              ? {
                  ...i,
                  qty: i.qty + item.qty,
                  lineTotal: i.unitPrice * BigInt(i.qty + item.qty),
                }
              : i,
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (medicineId, batchId) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.medicineId === medicineId && i.batchId === batchId),
      ),
    })),

  updateQty: (medicineId, batchId, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.medicineId === medicineId && i.batchId === batchId
          ? { ...i, qty, lineTotal: i.unitPrice * BigInt(qty) }
          : i,
      ),
    })),

  updateDiscount: (medicineId, batchId, discountPct) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.medicineId === medicineId && i.batchId === batchId
          ? { ...i, discountPct }
          : i,
      ),
    })),

  clearCart: () =>
    set({
      items: [],
      customerName: "",
      customerId: undefined,
      paymentMode: "cash",
    }),

  setCustomer: (name, id) => set({ customerName: name, customerId: id }),
  setPaymentMode: (mode) => set({ paymentMode: mode }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + i.lineTotal, BigInt(0));
  },

  getTotal: () => {
    const { items } = get();
    return items.reduce((sum, i) => {
      const disc = (i.lineTotal * BigInt(i.discountPct)) / BigInt(100);
      return sum + i.lineTotal - disc;
    }, BigInt(0));
  },
}));
