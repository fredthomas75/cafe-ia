"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  computeDeliveryFee,
} from "./shipping";

export { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, computeDeliveryFee };

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  emoji: string;
  accentColor: string;
};

type CartState = {
  lines: CartLine[];
  add: (product: Product, quantity?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],

      add: (product, quantity = 1) =>
        set((state) => {
          const qty = Math.max(1, Math.floor(quantity));
          const existing = state.lines.find((l) => l.slug === product.slug);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.slug === product.slug
                  ? { ...l, quantity: Math.min(50, l.quantity + qty) }
                  : l
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                unit: product.unit,
                quantity: Math.min(50, qty),
                emoji: product.emoji,
                accentColor: product.accentColor,
              },
            ],
          };
        }),

      remove: (slug) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.slug !== slug),
        })),

      setQty: (slug, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { lines: state.lines.filter((l) => l.slug !== slug) };
          }
          return {
            lines: state.lines.map((l) =>
              l.slug === slug
                ? { ...l, quantity: Math.min(50, Math.floor(quantity)) }
                : l
            ),
          };
        }),

      clear: () => set({ lines: [] }),

      count: () => get().lines.reduce((acc, l) => acc + l.quantity, 0),

      subtotal: () =>
        get().lines.reduce((acc, l) => acc + l.price * l.quantity, 0),
    }),
    {
      name: "cafe-ia-cart",
      version: 1,
    }
  )
);
