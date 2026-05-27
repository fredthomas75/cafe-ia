import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { stripe, isStripeEnabled, getSiteUrl } from "@/lib/stripe";
import { productBySlug } from "@/lib/products";
import { computeDeliveryFee } from "@/lib/shipping";

type LineInput = { slug: string; quantity: number };

type Payload = {
  customer?: { email?: string; name?: string; phone?: string };
  shipping?: {
    address?: string;
    city?: string;
    postal?: string;
    province?: string;
  };
  lines?: LineInput[];
};

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  const inputs = body.lines ?? [];
  if (inputs.length === 0) {
    return Response.json({ error: "Panier vide." }, { status: 400 });
  }

  const resolved = inputs
    .map((line) => {
      const product = productBySlug(line.slug);
      if (!product) return null;
      const quantity = Math.min(
        50,
        Math.max(1, Math.floor(Number(line.quantity) || 1))
      );
      return { product, quantity };
    })
    .filter((x): x is { product: NonNullable<ReturnType<typeof productBySlug>>; quantity: number } => x !== null);

  if (resolved.length === 0) {
    return Response.json({ error: "Aucun produit valide." }, { status: 400 });
  }

  const subtotal = resolved.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );
  const deliveryFee = computeDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;

  // Fallback: no Stripe configured → return simulated response
  if (!isStripeEnabled || !stripe) {
    return Response.json({
      simulated: true,
      subtotal,
      deliveryFee,
      total,
    });
  }

  const siteUrl = getSiteUrl(request);
  const email = body.customer?.email ?? undefined;

  // Idempotency: hash of the resolved cart + email
  const idempotencyKey = createHash("sha256")
    .update(
      JSON.stringify({
        email,
        lines: resolved.map(({ product, quantity }) => ({
          slug: product.slug,
          quantity,
          price: product.price,
        })),
        deliveryFee,
      })
    )
    .digest("hex");

  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        locale: "fr-CA",
        currency: "cad",
        customer_email: email,
        // Methods (card / Apple Pay / Google Pay / Link) are auto-displayed
        // from the Stripe Dashboard config — Checkout handles this natively.
        line_items: [
          ...resolved.map(({ product, quantity }) => ({
            quantity,
            price_data: {
              currency: "cad",
              unit_amount: Math.round(product.price * 100),
              product_data: {
                name: product.name,
                description: `${product.tagline} · ${product.unit}`,
                metadata: { slug: product.slug },
              },
            },
          })),
          ...(deliveryFee > 0
            ? [
                {
                  quantity: 1,
                  price_data: {
                    currency: "cad",
                    unit_amount: Math.round(deliveryFee * 100),
                    product_data: { name: "Livraison" },
                  },
                },
              ]
            : []),
        ],
        success_url: `${siteUrl}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/panier`,
        metadata: {
          source: "cafe-ia-shop",
          subtotal: subtotal.toFixed(2),
          delivery: deliveryFee.toFixed(2),
        },
      },
      { idempotencyKey }
    );

    return Response.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur Stripe inconnue.";
    return Response.json({ error: message }, { status: 500 });
  }
}
