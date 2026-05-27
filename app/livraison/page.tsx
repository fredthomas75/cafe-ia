import Link from "next/link";
import { Truck, Package, Clock, Mail } from "lucide-react";
import { Scoop } from "@/components/scoop";
import { formatPrice } from "@/lib/utils";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/lib/shipping";

export const metadata = {
  title: "Livraison — Café IA",
  description: "Livraison partout au Québec en 48 heures.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-semibold mb-3">
        Livraison
      </p>
      <h1 className="font-display text-5xl sm:text-6xl text-cacao tracking-tight leading-[0.95] mb-10">
        Partout au Québec,
        <br />
        <span className="italic text-rose-deep">en 48 heures.</span>
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 mb-16">
        <Feature
          icon={Truck}
          title="Vélo-courrier dans Montréal"
          text="Île de Montréal et Laval : livraison sous 24 heures par notre partenaire Chasseurs Courrier."
        />
        <Feature
          icon={Package}
          title={`Livraison Québec ${formatPrice(DELIVERY_FEE)}`}
          text={`Partout au Québec via Postes Canada Xpresspost. Offerte dès ${formatPrice(FREE_DELIVERY_THRESHOLD)} d'achat.`}
        />
        <Feature
          icon={Clock}
          title="Fraîcheur garantie"
          text="Le café est torréfié dans les 72 heures précédant votre commande. Les pâtisseries sont cuites le jour de l'expédition."
        />
        <Feature
          icon={Mail}
          title="Suivi par courriel"
          text="Vous recevez un courriel avec le numéro de suivi dès que votre paquet quitte l'atelier."
        />
      </div>

      <div className="rounded-[2rem] bg-cream-deep border border-line p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <Scoop
            emoji="📦"
            gradient="radial-gradient(circle at 30% 30%, #f3d6d2 0%, #d99a93 55%, #b66a62 100%)"
            size="lg"
            tilt={-6}
          />
          <div className="flex-1">
            <h2 className="font-display text-3xl text-cacao mb-3">
              Zones desservies
            </h2>
            <p className="text-muted leading-relaxed">
              Toutes les municipalités du Québec sont desservies. Pour
              l&apos;Ontario, le Nouveau-Brunswick et l&apos;Outaouais hors
              Gatineau, écrivez-nous —{" "}
              <a
                href="mailto:bonjour@cafe-ia.cc"
                className="text-rose-deep hover:underline"
              >
                bonjour@cafe-ia.cc
              </a>
              .
            </p>
            <p className="text-muted leading-relaxed mt-3">
              Vous êtes à Montréal et souhaitez venir chercher votre commande ?
              Sélectionnez « Cueillette à l&apos;atelier » à la caisse — on vous
              avertit dès que c&apos;est prêt.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-cacao text-cream font-medium hover:bg-rose-deep transition-colors"
        >
          Voir le menu
        </Link>
      </div>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text: string;
}) {
  return (
    <div className="p-7 rounded-3xl border border-line bg-cream-deep/40">
      <Icon className="w-6 h-6 text-rose-deep mb-4" strokeWidth={1.6} />
      <h3 className="font-display text-xl text-cacao mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{text}</p>
    </div>
  );
}
