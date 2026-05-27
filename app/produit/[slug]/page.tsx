import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Scoop } from "@/components/scoop";
import { ProductCard } from "@/components/product-card";
import { AddToCart } from "@/components/add-to-cart";
import { products, productBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: `${product.name} — Café IA`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-rose-deep transition mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour au menu
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] items-start">
        {/* Visuel */}
        <div className="relative h-[520px] rounded-[2.5rem] flex items-center justify-center overflow-hidden bg-cream-deep">
          <div
            aria-hidden
            className="blob absolute -top-16 -left-16 w-[280px] h-[280px] opacity-40"
            style={{ background: product.gradient }}
          />
          <div
            aria-hidden
            className="blob blob-slow absolute -bottom-16 -right-16 w-[260px] h-[260px] opacity-30"
            style={{ background: product.gradient }}
          />
          <Scoop
            emoji={product.emoji}
            gradient={product.gradient}
            size="xl"
            className="relative scale-125"
            tilt={-4}
          />
        </div>

        {/* Détails */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {product.isNew && (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-rose-deep text-cream">
                Nouveau
              </span>
            )}
            {product.isVegan && (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-moss/15 text-moss border border-moss/30">
                Vegan
              </span>
            )}
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-cream-deep text-cacao-soft border border-line">
              {product.category}
            </span>
          </div>

          <p className="text-sm uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
            {product.tagline}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-cacao tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl text-cacao">
              {formatPrice(product.price)}
            </span>
            <span className="text-muted text-sm">· {product.unit}</span>
          </div>

          <p className="mt-7 text-lg text-muted leading-relaxed">
            {product.longDescription}
          </p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          {/* Specs */}
          <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
            <Spec label="Origine" value={product.origin} />
            <Spec label="Format" value={product.unit} />
            <Spec label="Livraison" value="48 h au Québec" />
            <Spec
              label="Allergènes"
              value={
                product.allergens.length === 0
                  ? "Aucun"
                  : product.allergens.join(", ")
              }
            />
          </dl>

          {/* Accords */}
          <div className="mt-10 p-6 rounded-3xl border border-line bg-cream-deep/50">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
              S&apos;accorde avec
            </p>
            <ul className="space-y-2">
              {product.pairs.map((p) => (
                <li
                  key={p}
                  className="text-cacao-soft flex items-start gap-2.5 text-sm"
                >
                  <span
                    aria-hidden
                    className="w-1.5 h-1.5 rounded-full bg-rose-deep mt-2 shrink-0"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl text-cacao tracking-tight mb-8">
            Dans la même famille
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.15em] text-muted mb-1">
        {label}
      </dt>
      <dd className="text-cacao font-medium">{value}</dd>
    </div>
  );
}
