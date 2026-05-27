import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-deep">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span aria-hidden className="text-2xl">
              ☕
            </span>
            <span className="font-display text-lg text-cacao">
              Café <span className="italic text-rose-deep">IA</span>
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            Torréfaction parisienne, racines montréalaises. Né d&apos;un atelier
            d&apos;IA chez Talsom — devenu un vrai café.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base text-cacao mb-3">Boutique</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/menu" className="hover:text-rose-deep transition">
                Tout le menu
              </Link>
            </li>
            <li>
              <Link href="/menu?cat=espresso" className="hover:text-rose-deep transition">
                Cafés en grain
              </Link>
            </li>
            <li>
              <Link href="/menu?cat=patisserie" className="hover:text-rose-deep transition">
                Pâtisseries
              </Link>
            </li>
            <li>
              <Link href="/livraison" className="hover:text-rose-deep transition">
                Livraison
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-cacao mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>4421 rue Marie-Anne Est</li>
            <li>Montréal, QC H1V 1Z2</li>
            <li>
              <a
                href="mailto:bonjour@cafe-ia.cc"
                className="hover:text-rose-deep transition"
              >
                bonjour@cafe-ia.cc
              </a>
            </li>
            <li>(514) 555-0312</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-cacao mb-3">Atelier</h4>
          <p className="text-sm text-muted leading-relaxed">
            Ouvert mardi au samedi, 7 h à 17 h. Torréfaction visible tous les
            jeudis matin. Dégustations sur rendez-vous.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Café IA · Montréal</p>
          <p>
            Conçu et torréfié à Montréal · livré partout au Québec
          </p>
        </div>
      </div>
    </footer>
  );
}
