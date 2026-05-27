import Link from "next/link";
import { Scoop } from "./scoop";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group relative flex flex-col rounded-3xl p-6 bg-cream-deep/60 hover:bg-cream-deep border border-line hover:border-rose transition-all duration-300 hover:-translate-y-1"
    >
      {(product.isNew || product.isVegan) && (
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
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
        </div>
      )}

      <div className="flex justify-center mb-4">
        <Scoop
          emoji={product.emoji}
          gradient={product.gradient}
          size="lg"
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <p className="text-xs uppercase tracking-wider text-rose-deep font-semibold mb-1">
        {product.tagline}
      </p>
      <h3 className="font-display text-2xl text-cacao leading-tight mb-2">
        {product.name}
      </h3>
      <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-5 flex-1">
        {product.description}
      </p>

      <div className="flex items-baseline justify-between pt-4 border-t border-line">
        <span className="text-xs text-muted">{product.unit}</span>
        <span className="font-display text-xl text-cacao">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
