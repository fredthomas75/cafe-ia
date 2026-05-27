import Link from "next/link";
import { ArrowRight, Coffee, Leaf, MapPin } from "lucide-react";
import { Scoop } from "@/components/scoop";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 4);
  const marqueeItems = [
    "Torréfié à Montréal",
    "Livré au Québec",
    "Sans intermédiaire",
    "Vegan disponible",
    "Atelier rue Marie-Anne",
    "Café de spécialité",
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="blob absolute -top-40 -left-32 w-[460px] h-[460px] opacity-50"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #f3d6d2 0%, #d99a93 55%, #b66a62 100%)",
          }}
        />
        <div
          aria-hidden
          className="blob blob-slow absolute -top-20 -right-24 w-[380px] h-[380px] opacity-40"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #f4e8dc 0%, #c8956a 55%, #6a3a2c 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-28 lg:pt-28 lg:pb-36">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-6">
                <span className="w-8 h-px bg-rose-deep" />
                Plateau Mont-Royal · depuis 2024
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-cacao leading-[0.95] tracking-tight">
                Le café <span className="italic text-rose-deep">parisien</span>,
                <br />
                torréfié à <span className="italic">Montréal</span>.
              </h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">
                Espresso fruité, filtre vibrant, croissants tournés au beurre fermier.
                Tout est sorti de notre atelier rue Marie-Anne — et arrive chez vous
                sous 48 heures.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-cacao text-cream font-medium hover:bg-rose-deep transition-colors"
                >
                  Découvrir le menu
                  <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                </Link>
                <Link
                  href="/notre-histoire"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-cacao/20 text-cacao font-medium hover:bg-cream-deep transition-colors"
                >
                  Notre histoire
                </Link>
              </div>
            </div>

            <div className="relative h-[440px] flex items-center justify-center">
              <Scoop
                emoji="☕"
                gradient="radial-gradient(circle at 30% 30%, #f9d3d4 0%, #d97a6a 55%, #6b3328 100%)"
                size="xl"
                className="float-slow"
                tilt={-6}
              />
              <Scoop
                emoji="🥐"
                gradient="radial-gradient(circle at 30% 25%, #fbe6c8 0%, #d9a160 55%, #5a3318 100%)"
                size="lg"
                className="absolute -top-2 right-8"
                tilt={9}
              />
              <Scoop
                emoji="🫐"
                gradient="radial-gradient(circle at 40% 30%, #efd6d8 0%, #9a587a 50%, #2c1626 100%)"
                size="md"
                className="absolute bottom-10 left-2"
                tilt={-12}
              />
              <Scoop
                emoji="🍮"
                gradient="radial-gradient(circle at 30% 30%, #f0d4a8 0%, #a5602c 55%, #2f1709 100%)"
                size="md"
                className="absolute bottom-2 right-2"
                tilt={5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-line bg-cream-deep/60 overflow-hidden py-5">
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-display text-2xl text-cacao/80 italic flex items-center gap-12"
            >
              {item}
              <span className="w-2 h-2 rounded-full bg-rose-deep inline-block" />
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
              Sélection de la semaine
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-cacao tracking-tight">
              Ce qui sort du four
              <br />
              <span className="italic text-rose-deep">cette semaine.</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-medium text-cacao hover:text-rose-deep transition group"
          >
            Voir tout le menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="bg-cream-deep py-24">
        <div className="max-w-5xl mx-auto px-6 grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
          <div className="relative flex justify-center">
            <Scoop
              emoji="🥐"
              gradient="radial-gradient(circle at 30% 25%, #fbe6c8 0%, #d9a160 55%, #5a3318 100%)"
              size="xl"
              tilt={-4}
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
              Notre maison
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-cacao tracking-tight mb-6">
              Né d&apos;un atelier
              <br />
              <span className="italic">devenu une obsession.</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Café IA, c&apos;est l&apos;histoire d&apos;un consultant en
              intelligence artificielle qui a passé un atelier de design à se
              demander à quoi ressemblerait son café idéal. Trois mois plus tard,
              il torréfiait dans Mile-End.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Aujourd&apos;hui, on travaille avec sept producteurs et trois
              boulangers québécois. Tout est cuit, torréfié, emballé sur la rue
              Marie-Anne.
            </p>
            <Link
              href="/notre-histoire"
              className="inline-flex items-center gap-2 text-sm font-medium text-cacao hover:text-rose-deep transition group"
            >
              Lire la suite
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Coffee,
              title: "Torréfié sur place",
              text: "Probat L12 dans l'atelier visible depuis la rue Marie-Anne, tous les jeudis matin.",
            },
            {
              icon: MapPin,
              title: "Livré au Québec",
              text: "48 heures partout en province, gratuit dès 65 $. Vélo-courrier dans Montréal.",
            },
            {
              icon: Leaf,
              title: "Sans intermédiaire",
              text: "On achète notre vert directement aux coopératives. Prix juste, traçabilité totale.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="p-8 rounded-3xl border border-line bg-cream-deep/40"
            >
              <v.icon
                className="w-7 h-7 text-rose-deep mb-4"
                strokeWidth={1.6}
              />
              <h3 className="font-display text-2xl text-cacao mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-[2.5rem] bg-cacao text-cream p-10 sm:p-14 relative overflow-hidden">
          <div
            aria-hidden
            className="blob absolute -top-24 -right-24 w-[300px] h-[300px] opacity-30"
            style={{
              background:
                "radial-gradient(circle, #f3d6d2 0%, #d99a93 60%, transparent 100%)",
            }}
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight mb-4">
                Premier sachet —
                <br />
                <span className="italic text-rose-pale">offert avec ça.</span>
              </h2>
              <p className="text-cream/75 text-lg leading-relaxed max-w-md">
                Toute commande de 65 $ et plus arrive avec un petit sachet
                surprise — sélection du torréfacteur.
              </p>
            </div>
            <div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-cream text-cacao font-medium hover:bg-rose-pale transition-colors"
              >
                Commander
                <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
