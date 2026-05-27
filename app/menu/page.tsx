import { ProductCard } from "@/components/product-card";
import { products, categoryLabels } from "@/lib/products";

export const metadata = {
  title: "Menu — Café IA",
  description: "Cafés, pâtisseries et carnets — sélection complète.",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; tag?: string }>;
}) {
  const { cat, tag } = await searchParams;
  const filtered = products.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (tag === "vegan" && !p.isVegan) return false;
    return true;
  });

  const categories = Object.entries(categoryLabels);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
          {filtered.length} {filtered.length > 1 ? "produits" : "produit"}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-cacao tracking-tight">
          Tout ce qu&apos;on
          <br />
          <span className="italic text-rose-deep">torréfie & cuit.</span>
        </h1>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-12">
        <FilterPill href="/menu" active={!cat && !tag} label="Tout" />
        {categories.map(([key, label]) => (
          <FilterPill
            key={key}
            href={`/menu?cat=${key}`}
            active={cat === key}
            label={label}
          />
        ))}
        <FilterPill
          href="/menu?tag=vegan"
          active={tag === "vegan"}
          label="Vegan"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted py-12">Aucun produit ne correspond.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center px-4 h-9 rounded-full text-sm font-medium border transition-colors ${
        active
          ? "bg-cacao border-cacao text-cream"
          : "border-line text-cacao-soft hover:border-rose hover:text-rose-deep"
      }`}
    >
      {label}
    </a>
  );
}
