# Café IA

Café parisien torréfié à Montréal. Boutique transactionnelle Next.js + Stripe.

## Stack

- **Next.js 16** App Router · React 19 · TypeScript
- **Tailwind CSS v4** (tokens Berry & Cream, palette café latte)
- **Zustand** (panier persisté `localStorage`)
- **Stripe Checkout** (paiement carte / Apple Pay / Google Pay)
- **Vercel** (déploiement)

## Démarrage local

```bash
npm install
cp .env.example .env.local      # remplir les clés Stripe (optionnel)
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

> Sans `STRIPE_SECRET_KEY`, le checkout tourne en **mode démo** — la commande
> est confirmée sans paiement réel. Idéal pour tester les flux sans configurer
> Stripe.

## Structure

```
app/
  page.tsx                # Hero, marquee, sélection, story, valeurs
  menu/                   # Grille filtrable par catégorie/tag
  produit/[slug]/         # Fiche produit (SSG)
  panier/                 # Panier client (Zustand)
  commande/               # Form coordonnées + redirection Stripe
  commande/success/       # Confirmation (retrieve session Stripe)
  notre-histoire/         # Récit de marque
  livraison/              # Zones desservies + features
  api/checkout/           # POST → session Stripe (prix serveur)
components/
  header.tsx, footer.tsx, cart-button.tsx
  scoop.tsx               # Boule arrondie avec emoji + gradient
  product-card.tsx, add-to-cart.tsx
lib/
  utils.ts                # cn(), formatPrice()
  shipping.ts             # constants (partagé serveur/client)
  products.ts             # catalogue (10 produits)
  cart.ts                 # store Zustand persisté
  stripe.ts               # client Stripe + getSiteUrl()
```

## Variables d'environnement

| Variable | Description | Obligatoire |
|---|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_live_…` ou `sk_test_…`) | Non — sans elle, mode démo |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | Non |
| `NEXT_PUBLIC_SITE_URL` | URL publique pour redirections Stripe | Non — dérivée de Vercel |

## Garanties de sécurité Stripe

- Les prix sont **toujours résolus côté serveur** depuis `lib/products.ts` ;
  jamais trustés depuis le client.
- Les quantités sont **clampées** entre 1 et 50.
- Chaque session Stripe utilise une **clé d'idempotence** (hash du panier +
  email), évitant les doublons en cas de double-clic.

## Déploiement

```bash
npm run vercel:link    # première fois — lie le repo à un projet Vercel
npm run deploy         # → preview URL
npm run deploy:prod    # → production
```

Le premier `vercel:link` crée `.vercel/project.json` (non commit). Les
commandes suivantes utilisent ce lien automatiquement.

### Variables d'environnement Vercel

Une fois le projet lié, ajouter les clés Stripe :

```bash
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
```

Ou via le dashboard : *Project → Settings → Environment Variables*.

### Configuration en code — `vercel.ts`

[`vercel.ts`](vercel.ts) configure la plateforme (framework, région `iad1`,
`maxDuration: 30s` pour `/api/checkout`, headers de sécurité) sans passer par
le dashboard. Méthode recommandée par Vercel depuis 2026.

## Prochaines étapes

- Brancher un webhook Stripe (`checkout.session.completed`) vers une route
  d'envoi de courriel + création de tâche dans le système d'expédition.
- Ajouter des photos produits (placeholders emoji actuellement).
- Connecter Vercel Blob pour les images.
- Brancher Vercel Analytics et Speed Insights.
