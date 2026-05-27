"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useCart, computeDeliveryFee } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <h1 className="font-display text-4xl text-cacao mb-4">
          Panier vide
        </h1>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-cacao text-cream font-medium hover:bg-rose-deep transition-colors"
        >
          Voir le menu
        </Link>
      </div>
    );
  }

  const deliveryFee = computeDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            email: fd.get("email"),
            name: fd.get("name"),
            phone: fd.get("phone"),
          },
          shipping: {
            address: fd.get("address"),
            city: fd.get("city"),
            postal: fd.get("postal"),
            province: fd.get("province"),
          },
          lines: lines.map((l) => ({
            slug: l.slug,
            quantity: l.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de paiement.");

      if (data.url) {
        // Real Stripe checkout
        window.location.href = data.url;
        return;
      }

      if (data.simulated) {
        // Fallback no-Stripe mode
        const ref = `CAF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
        clear();
        router.push(
          `/commande/success?simulated=1&ref=${ref}&total=${data.total}&email=${encodeURIComponent(String(fd.get("email") || ""))}`
        );
        return;
      }

      throw new Error("Réponse inattendue du serveur.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href="/panier"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-rose-deep transition mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Modifier le panier
      </Link>

      <h1 className="font-display text-5xl text-cacao tracking-tight mb-10">
        Finaliser la <span className="italic text-rose-deep">commande</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start"
      >
        {/* Form fields */}
        <div className="space-y-8">
          <Fieldset legend="Vos coordonnées">
            <Field label="Courriel" name="email" type="email" required />
            <Field label="Nom complet" name="name" required />
            <Field label="Téléphone" name="phone" type="tel" />
          </Fieldset>

          <Fieldset legend="Adresse de livraison">
            <Field label="Adresse" name="address" required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Ville" name="city" required />
              <Field label="Code postal" name="postal" required />
            </div>
            <Field label="Province" name="province" defaultValue="QC" required />
          </Fieldset>

          <Fieldset legend="Paiement">
            <p className="text-sm text-muted leading-relaxed">
              Vous serez redirigé vers Stripe Checkout pour finaliser le
              paiement (carte, Apple Pay, Google Pay). Aucune information de
              carte n&apos;est stockée chez nous.
            </p>
          </Fieldset>
        </div>

        {/* Summary */}
        <aside className="rounded-3xl p-7 bg-cream-deep border border-line sticky top-24">
          <h2 className="font-display text-2xl text-cacao mb-5">
            Votre commande
          </h2>

          <ul className="space-y-3 mb-5">
            {lines.map((l) => (
              <li
                key={l.slug}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <div>
                  <p className="text-cacao">{l.name}</p>
                  <p className="text-xs text-muted">
                    {l.quantity} × {formatPrice(l.price)}
                  </p>
                </div>
                <p className="text-cacao tabular-nums shrink-0">
                  {formatPrice(l.price * l.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 text-sm border-t border-line pt-4">
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

          <div className="flex justify-between pt-4 mt-4 border-t border-line items-baseline">
            <span className="font-display text-lg text-cacao">Total</span>
            <span className="font-display text-2xl text-cacao tabular-nums">
              {formatPrice(total)}
            </span>
          </div>

          {error && (
            <p className="mt-4 p-3 rounded-2xl bg-rose-pale/60 text-rose-deep text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-cacao text-cream font-medium hover:bg-rose-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirection...
              </>
            ) : (
              <>Payer {formatPrice(total)}</>
            )}
          </button>

          <p className="mt-3 text-xs text-muted text-center">
            Vous serez redirigé vers Stripe
          </p>
        </aside>
      </form>
    </div>
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-3xl border border-line bg-cream-deep/40 p-6">
      <legend className="px-3 font-display text-xl text-cacao">{legend}</legend>
      <div className="space-y-3 mt-3">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted mb-1.5">
        {label}
        {required && <span className="text-rose-deep ml-1">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full h-11 px-4 rounded-full border border-line bg-cream focus:outline-none focus:border-rose-deep focus:ring-2 focus:ring-rose-pale transition-colors text-cacao"
      />
    </label>
  );
}
