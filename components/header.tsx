import Link from "next/link";
import { CartButton } from "./cart-button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-cream/85 border-b border-line">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Café IA — accueil"
        >
          <span
            aria-hidden
            className="text-2xl"
            style={{ filter: "drop-shadow(0 2px 3px rgba(74,42,32,0.25))" }}
          >
            ☕
          </span>
          <span className="font-display text-xl tracking-tight text-cacao group-hover:text-rose-deep transition-colors">
            Café <span className="italic text-rose-deep">IA</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-cacao-soft">
          <Link href="/menu" className="hover:text-rose-deep transition-colors">
            Menu
          </Link>
          <Link
            href="/notre-histoire"
            className="hover:text-rose-deep transition-colors"
          >
            Notre histoire
          </Link>
          <Link
            href="/livraison"
            className="hover:text-rose-deep transition-colors"
          >
            Livraison
          </Link>
        </nav>

        <CartButton />
      </div>
    </header>
  );
}
