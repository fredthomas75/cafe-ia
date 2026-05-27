import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Scoop } from "@/components/scoop";

export const metadata = {
  title: "Notre histoire — Café IA",
  description:
    "Café IA est né d'un atelier d'intelligence artificielle chez Talsom. Aujourd'hui, c'est une torréfaction sur la rue Marie-Anne.",
};

export default function StoryPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
        Notre histoire
      </p>
      <h1 className="font-display text-5xl sm:text-6xl text-cacao tracking-tight leading-[0.95] mb-8">
        D&apos;un <span className="italic">atelier d&apos;IA</span>
        <br />
        à une <span className="italic text-rose-deep">torréfaction</span>.
      </h1>

      <div className="flex justify-center my-12">
        <div className="relative h-72 w-full max-w-md flex items-center justify-center">
          <Scoop
            emoji="☕"
            gradient="radial-gradient(circle at 30% 30%, #f9d3d4 0%, #d97a6a 55%, #6b3328 100%)"
            size="xl"
            tilt={-6}
          />
          <Scoop
            emoji="🥐"
            gradient="radial-gradient(circle at 30% 25%, #fbe6c8 0%, #d9a160 55%, #5a3318 100%)"
            size="lg"
            className="absolute -top-4 right-0"
            tilt={8}
          />
        </div>
      </div>

      <div className="prose prose-lg text-muted leading-relaxed space-y-6 [&_p]:text-lg">
        <p>
          À l&apos;origine, Café IA n&apos;était pas censé exister. C&apos;est sorti
          d&apos;un atelier de design organisé chez Talsom à l&apos;automne 2023.
          On nous a demandé d&apos;imaginer une marque AI-native — un commerce qui
          n&apos;aurait pas de raison d&apos;être sans intelligence artificielle.
        </p>
        <p>
          Notre fondateur, Frédéric, est consultant en IA. Au lieu de proposer un
          chatbot ou un outil SaaS, il a écrit dans son carnet :{" "}
          <span className="text-cacao italic">
            « Je voudrais que mon café du matin soit aussi bon que ceux du
            5<sup>e</sup> arrondissement à Paris. »
          </span>
        </p>
        <p>
          Trois mois plus tard, il avait acheté une torréfacteuse Probat L12
          d&apos;occasion et louait un atelier sur la rue Marie-Anne, entre une
          fromagerie et un atelier de tatouage. L&apos;IA n&apos;a pas disparu —
          elle aide à optimiser les courbes de torréfaction, à analyser les notes
          de dégustation, et à choisir les lots verts auprès des producteurs.
          Mais elle ne touche jamais aux mains qui pétrissent la pâte à
          croissant.
        </p>
        <p>
          Aujourd&apos;hui, nous travaillons avec sept producteurs (Éthiopie,
          Kenya, Colombie, Brésil, Honduras, Tanzanie) et trois boulangers
          montréalais. Tout est cuit, torréfié, emballé sur place. Et on livre
          partout au Québec en 48 heures.
        </p>
      </div>

      <div className="mt-16 p-8 rounded-3xl border border-line bg-cream-deep/50">
        <h2 className="font-display text-2xl text-cacao mb-3">
          Visiter l&apos;atelier
        </h2>
        <p className="text-muted leading-relaxed mb-4">
          Nous accueillons les curieux mardi au samedi, de 7 h à 17 h. La
          torréfaction est visible tous les jeudis matin entre 9 h et 11 h.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-medium text-cacao hover:text-rose-deep transition group"
        >
          Commander en ligne
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </article>
  );
}
