// Plain module — no "use client". Imported by both server route handler
// (/api/checkout) and client cart store. Keeping it free of directives lets
// Next.js inline the constants on both sides without a hydration boundary.

export const DELIVERY_FEE = 7.5;
export const FREE_DELIVERY_THRESHOLD = 65;

export function computeDeliveryFee(subtotal: number) {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}
