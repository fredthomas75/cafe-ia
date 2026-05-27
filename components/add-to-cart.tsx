"use client";

import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <div className="inline-flex items-center gap-0 rounded-full border border-line bg-cream overflow-hidden h-12">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-12 h-12 inline-flex items-center justify-center text-cacao hover:bg-cream-deep transition disabled:opacity-30"
          disabled={qty <= 1}
          aria-label="Diminuer la quantité"
        >
          <Minus className="w-4 h-4" strokeWidth={2.2} />
        </button>
        <span
          className="w-10 text-center font-display text-lg text-cacao tabular-nums"
          aria-live="polite"
        >
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(50, q + 1))}
          className="w-12 h-12 inline-flex items-center justify-center text-cacao hover:bg-cream-deep transition disabled:opacity-30"
          disabled={qty >= 50}
          aria-label="Augmenter la quantité"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`flex-1 h-12 px-6 rounded-full font-medium text-sm inline-flex items-center justify-center gap-2 transition-all ${
          added
            ? "bg-moss text-cream"
            : "bg-cacao text-cream hover:bg-rose-deep"
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" strokeWidth={2.5} />
            Ajouté au panier
          </>
        ) : (
          <>Ajouter au panier</>
        )}
      </button>
    </div>
  );
}
