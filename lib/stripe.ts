import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;

export const isStripeEnabled = Boolean(secret);

export const stripe: Stripe | null = secret
  ? new Stripe(secret, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    })
  : null;

export function getSiteUrl(req?: Request): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${stripTrailingSlash(vercelProd)}`;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${stripTrailingSlash(vercel)}`;

  if (req) {
    try {
      const url = new URL(req.url);
      return `${url.protocol}//${url.host}`;
    } catch {
      // fall through
    }
  }

  return "http://localhost:3000";
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}
