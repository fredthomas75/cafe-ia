import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import { Scoop } from "@/components/scoop";
import { ClearCartOnMount } from "./clear-cart";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
    simulated?: string;
    ref?: string;
    total?: string;
    email?: string;
  }>;
}) {
  const sp = await searchParams;

  let ref: string;
  let total: number | null = null;
  let email: string | null = null;

  if (sp.simulated) {
    ref = sp.ref ?? `CAF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    total = sp.total ? Number(sp.total) : null;
    email = sp.email ?? null;
  } else if (sp.session_id && isStripeEnabled && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sp.session_id);
      ref = session.id.slice(-8).toUpperCase();
      total = session.amount_total ? session.amount_total / 100 : null;
      email = session.customer_details?.email ?? null;
    } catch {
      ref = `CAF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    }
  } else {
    ref = `CAF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <ClearCartOnMount />

      <div className="flex justify-center mb-8">
        <div className="relative">
          <Scoop
            emoji="☕"
            gradient="radial-gradient(circle at 35% 30%, #f3d6d2 0%, #d99a93 55%, #b66a62 100%)"
            size="xl"
            tilt={-6}
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-moss inline-flex items-center justify-center text-cream ring-4 ring-cream"
          >
            <Check className="w-7 h-7" strokeWidth={2.5} />
          </span>
        </div>
      </div>

      <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
        Commande confirmée
      </p>
      <h1 className="font-display text-5xl text-cacao tracking-tight mb-5">
        Merci, à <span className="italic text-rose-deep">très vite.</span>
      </h1>

      {sp.simulated && (
        <p className="mb-6 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-cream-deep border border-line text-muted">
          Mode démo · Stripe non configuré
        </p>
      )}

      <p className="text-lg text-muted leading-relaxed mb-10 max-w-md mx-auto">
        Votre commande est en route vers notre atelier. Vous recevrez un courriel
        de confirmation dans quelques minutes.
      </p>

      <dl className="inline-grid gap-4 p-6 rounded-3xl border border-line bg-cream-deep/50 text-left mb-10">
        <Detail label="N° de commande" value={ref} />
        {total !== null && (
          <Detail label="Total payé" value={formatPrice(total)} />
        )}
        {email && <Detail label="Confirmation envoyée à" value={email} />}
        <Detail label="Livraison estimée" value="48 h" />
      </dl>

      <Link
        href="/menu"
        className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-cacao text-cream font-medium hover:bg-rose-deep transition-colors"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
        Continuer mes courses
      </Link>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4 items-baseline">
      <dt className="text-xs uppercase tracking-[0.15em] text-muted">
        {label}
      </dt>
      <dd className="text-cacao font-medium">{value}</dd>
    </div>
  );
}
