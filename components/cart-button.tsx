"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/panier"
      aria-label={`Panier${mounted && count > 0 ? ` — ${count} articles` : ""}`}
      className="relative inline-flex items-center gap-2 px-4 h-10 rounded-full bg-cacao text-cream text-sm font-medium hover:bg-rose-deep transition-colors"
    >
      <ShoppingBag className="w-4 h-4" strokeWidth={2.2} />
      <span className="hidden sm:inline">Panier</span>
      {mounted && count > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 inline-flex items-center justify-center rounded-full bg-rose-deep text-cream text-[11px] font-semibold ring-2 ring-cream"
          aria-hidden
        >
          {count}
        </span>
      )}
    </Link>
  );
}
