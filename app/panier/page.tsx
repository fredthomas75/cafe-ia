"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, X, ArrowRight, ArrowLeft } from "lucide-react";
import { Scoop } from "@/components/scoop";
import { useCart, computeDeliveryFee, FREE_DELIVERY_THRESHOLD } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="h-8 w-32 rounded-full bg-cream-deep animate-pulse" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="flex justify-center mb-8">
          <Scoop
            emoji="🧺"
            gradient="radial-gradient(circle at 35% 30%, #f3d6d2 0%, #d99a93 55%, #b66a62 100%)"
            size="xl"
            tilt={-6}
          />
        </div>
        <h1 className="font-display text-5xl text-cacao tracking-tight mb-4">
          Votre panier <span className="italic text-rose-deep">attend.</span>
        </h1>
        <p className="text-lg text-muted mb-8">
          Une bonne torréfaction, un croissant tiède — on commence par quoi ?
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-cacao text-cream font-medium hover:bg-rose-deep transition-colors"
        >
          Voir le menu
          <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
        </Link>
      </div>
    );
  }

  const deliveryFee = computeDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-rose-deep transition mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Continuer mes courses
      </Link>

      <h1 className="font-display text-5xl text-cacao tracking-tight mb-10">
        Votre <span className="italic text-rose-deep">panier</span>
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
        {/* Lines */}
        <ul className="space-y-3">
          {lines.map((line) => (
            <li
              key={line.slug}
              className="flex gap-4 p-5 rounded-3xl border border-line bg-cream-deep/40"
            >
              <Scoop
                emoji={line.emoji}
                gradient={`radial-gradient(circle at 30% 30%, #f3d6d2 0%, ${line.accentColor} 55%, #3a1b14 100%)`}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-display text-xl text-cacao leading-tight">
                  {line.name}
                </p>
                <p className="text-xs text-muted mt-1">{line.unit}</p>

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center rounded-full border border-line bg-cream overflow-hidden h-9">
                    <button
                      onClick={() => setQty(line.slug, line.quantity - 1)}
                      className="w-9 h-9 inline-flex items-center justify-center text-cacao hover:bg-cream-deep transition"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" strokeWidth={2.2} />
                    </button>
                    <span className="w-8 text-center font-display text-base text-cacao tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => setQty(line.slug, line.quantity + 1)}
                      className="w-9 h-9 inline-flex items-center justify-center text-cacao hover:bg-cream-deep transition"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.2} />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(line.slug)}
                    className="inline-flex items-center gap-1 text-xs text-muted hover:text-rose-deep transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    Retirer
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-lg text-cacao tabular-nums">
                  {formatPrice(line.price * line.quantity)}
                </p>
                <p className="text-xs text-muted mt-1 tabular-nums">
                  {formatPrice(line.price)} / {line.unit}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="rounded-3xl p-7 bg-cream-deep border border-line sticky top-24">
          <h2 className="font-display text-2xl text-cacao mb-5">Récapitulatif</h2>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Sous-total</dt>
              <dd className="text-cacao tabular-nums">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Livraison</dt>
              <dd className="text-cacao tabular-nums">
                {deliveryFee === 0 ? "Offerte" : formatPrice(deliveryFee)}
              </dd>
            </div>
          </dl>

          {remainingForFree > 0 && (
            <p className="mt-4 text-xs text-rose-deep font-medium">
              Plus que {formatPrice(remainingForFree)} pour la livraison gratuite.
            </p>
          )}

          <div className="flex justify-between pt-5 mt-5 border-t border-line items-baseline">
            <span className="font-display text-lg text-cacao">Total</span>
            <span className="font-display text-2xl text-cacao tabular-nums">
              {formatPrice(total)}
            </span>
          </div>

          <Link
            href="/commande"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-cacao text-cream font-medium hover:bg-rose-deep transition-colors"
          >
            Passer la commande
            <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </Link>

          <p className="mt-3 text-xs text-muted text-center">
            Paiement sécurisé · Stripe
          </p>
        </aside>
      </div>
    </div>
  );
}
