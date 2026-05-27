import { type VercelConfig } from "@vercel/config/v1";

// Vercel config-in-code (recommandé Vercel 2026). Remplace vercel.json.
// Lu par Vercel pendant le build pour configurer le projet sans dashboard.
//
// Régions choisies pour la proximité Montréal :
//   - iad1 (Washington, ~750 km)  → latence ~25 ms depuis Montréal
//   - sfo1 ne sert que de failover (côte ouest, latence ~75 ms)

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "next build",
  devCommand: "next dev",
  installCommand: "npm install",
  regions: ["iad1"],
  functionFailoverRegions: ["sfo1"],
  // Fluid Compute est activé par défaut en 2026, mais on l'explicite.
  fluid: true,
  functions: {
    "app/api/checkout/route.ts": {
      // Le checkout Stripe doit avoir le temps de créer une session
      // (latence Stripe US-East ≈ 200-400 ms + retries possibles).
      maxDuration: 30,
      memory: 256,
    },
  },
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
    {
      source: "/api/(.*)",
      headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
    },
  ],
};

export default config;
