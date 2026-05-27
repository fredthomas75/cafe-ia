export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  unit: string;
  category: string;
  origin: string;
  allergens: string[];
  isVegan?: boolean;
  isNew?: boolean;
  emoji: string;
  gradient: string;
  accentColor: string;
  pairs: string[];
};

export const categoryLabels: Record<string, string> = {
  espresso: "Cafés en grain",
  filtre: "Cafés filtre",
  patisserie: "Pâtisseries",
  boisson: "Boissons signature",
  accessoire: "Atelier & accessoires",
};

export const products: Product[] = [
  {
    slug: "millesime-rose-belledonne",
    name: "Millésime Rosé Belledonne",
    tagline: "Éthiopie florale, profil clair",
    description: "Espresso fruité aux notes de bergamote, pivoine et miel d'acacia.",
    longDescription:
      "Récolte 2025 de la coopérative Sidamo Bensa, Éthiopie, traitée en lavé. Torréfié claire trois jours avant départ d'atelier dans notre Probat L12 sur la rue Marie-Anne. Mouture ajustée pour extraction en 28 secondes.",
    price: 24,
    unit: "sachet 250 g",
    category: "espresso",
    origin: "Bensa, Sidamo · Éthiopie",
    allergens: [],
    isVegan: true,
    isNew: true,
    emoji: "☕",
    gradient: "radial-gradient(circle at 30% 30%, #f9d3d4 0%, #d97a6a 55%, #6b3328 100%)",
    accentColor: "#c5635a",
    pairs: ["Mille-feuille vanille", "Brioche fleur d'oranger", "Tarte aux framboises"],
  },
  {
    slug: "noir-saint-laurent",
    name: "Noir Saint-Laurent",
    tagline: "Espresso boulevard, corps dense",
    description: "Brésil et Honduras assemblés pour un crema cacao, finale praline.",
    longDescription:
      "Assemblage signature inspiré des comptoirs de la rue Saint-Laurent. Composé de Cerrado Mineiro lavé et de Honduras Marcala fermenté nature. Sucre brun caramélisé, noix de pécan grillée, kirsch.",
    price: 22,
    unit: "sachet 250 g",
    category: "espresso",
    origin: "Cerrado · Brésil + Marcala · Honduras",
    allergens: ["fruits à coque (notes aromatiques)"],
    isVegan: true,
    emoji: "🫘",
    gradient: "radial-gradient(circle at 35% 25%, #f4dac4 0%, #b87356 50%, #3a1e16 100%)",
    accentColor: "#8b4a30",
    pairs: ["Canelé bordelais", "Madeleine au beurre brun", "Chocolat 70 %"],
  },
  {
    slug: "filtre-bleuet-charlevoix",
    name: "Filtre Bleuet Charlevoix",
    tagline: "Kenya AA, profil sirupeux",
    description: "Bleuet sauvage, jasmin et cassis pour un filtre vibrant.",
    longDescription:
      "Lot AA de la coopérative Nyeri, Kenya. Torréfaction médium pour V60 et Chemex. Nous coupons l'orge dorée des Laurentides en garniture aromatique : cassis du Charlevoix, jasmin nocturne, finale rhubarbe.",
    price: 26,
    unit: "sachet 250 g",
    category: "filtre",
    origin: "Nyeri · Kenya",
    allergens: [],
    isVegan: true,
    emoji: "🫐",
    gradient: "radial-gradient(circle at 40% 30%, #efd6d8 0%, #9a587a 50%, #2c1626 100%)",
    accentColor: "#7a3b5e",
    pairs: ["Tartine ricotta-miel", "Sablé breton", "Yogourt nature"],
  },
  {
    slug: "decaf-paris-nuit",
    name: "Décaf Paris Nuit",
    tagline: "Colombie Swiss Water, sans caféine",
    description: "Toute la rondeur du café, sans la caféine. Cacao chaud et noisette.",
    longDescription:
      "Colombie Huila décaféiné par procédé Swiss Water — uniquement de l'eau, aucun solvant. Profil rond et chocolaté, parfait après le souper. Sucre roux, noisette torréfiée, écorce d'orange.",
    price: 23,
    unit: "sachet 250 g",
    category: "espresso",
    origin: "Huila · Colombie",
    allergens: ["fruits à coque (notes aromatiques)"],
    isVegan: true,
    emoji: "🌙",
    gradient: "radial-gradient(circle at 35% 30%, #f1e2d8 0%, #b39383 50%, #3a2a23 100%)",
    accentColor: "#8a6453",
    pairs: ["Crème brûlée", "Tarte au citron", "Truffes cacao"],
  },
  {
    slug: "croissant-laurier",
    name: "Croissant Laurier",
    tagline: "Beurre baratté Saint-Élie",
    description: "Croissant feuilleté façonné main, beurre fermier 84 % MG.",
    longDescription:
      "Pâte tourée 24 heures au beurre baratté de la ferme Saint-Élie-de-Caxton. Cuit dans notre four à sole chaque matin à 5 h 30. Vendu par boîte de 4 pour transport à froid, à réchauffer 4 minutes au four.",
    price: 14,
    unit: "boîte de 4",
    category: "patisserie",
    origin: "Atelier Marie-Anne · Montréal",
    allergens: ["gluten", "lait", "œufs"],
    emoji: "🥐",
    gradient: "radial-gradient(circle at 30% 25%, #fbe6c8 0%, #d9a160 55%, #5a3318 100%)",
    accentColor: "#b07a3f",
    pairs: ["Espresso noir", "Confiture d'abricot", "Café au lait"],
  },
  {
    slug: "canele-mille-iles",
    name: "Canelé Mille-Îles",
    tagline: "Rhum brun, vanille Bourbon",
    description: "Croûte caramélisée, cœur tendre à la vanille et au rhum.",
    longDescription:
      "Cuisson à 220 °C dans moules de cuivre étamé. Vanille Bourbon de Madagascar et rhum brun Domaine de Séverin. Boîte de 6 canelés moyens, conservation 48 heures à température ambiante dans un linge sec.",
    price: 18,
    unit: "boîte de 6",
    category: "patisserie",
    origin: "Atelier Marie-Anne · Montréal",
    allergens: ["gluten", "lait", "œufs"],
    isNew: true,
    emoji: "🍮",
    gradient: "radial-gradient(circle at 30% 30%, #f0d4a8 0%, #a5602c 55%, #2f1709 100%)",
    accentColor: "#8a4e22",
    pairs: ["Filtre Kenya", "Vin liquoreux", "Glace vanille"],
  },
  {
    slug: "chocolat-chaud-1924",
    name: "Chocolat Chaud 1924",
    tagline: "Cacao 70 % Tanzanie, lait d'avoine",
    description: "Mélange à diluer pour un chocolat épais à la française.",
    longDescription:
      "Cacao Kokoa Kamili (Tanzanie) broyé sur place avec sucre brut Demerara et écorce d'orange confite. Compter 30 g pour 200 ml de lait chaud. Sachet de 300 g, idéal pour douze tasses.",
    price: 19,
    unit: "sachet 300 g",
    category: "boisson",
    origin: "Kokoa Kamili · Tanzanie",
    allergens: ["soya (lécithine)"],
    isVegan: true,
    emoji: "🍫",
    gradient: "radial-gradient(circle at 35% 28%, #efd2c2 0%, #8e4a30 50%, #281008 100%)",
    accentColor: "#6e3a25",
    pairs: ["Croissant Laurier", "Brioche tressée", "Biscotti aux amandes"],
  },
  {
    slug: "tisane-marie-anne",
    name: "Tisane Marie-Anne",
    tagline: "Mélilot, mélisse, sapin baumier",
    description: "Infusion sauvage récoltée dans Lanaudière, finale résineuse.",
    longDescription:
      "Mélange d'herbes sauvages récoltées par la Forêt Nourricière (Sainte-Mélanie). Mélilot doré, mélisse citronnée, jeunes pousses de sapin baumier. Vrac compostable, environ 25 infusions par sachet.",
    price: 16,
    unit: "sachet 60 g",
    category: "boisson",
    origin: "Lanaudière · Québec",
    allergens: [],
    isVegan: true,
    emoji: "🌿",
    gradient: "radial-gradient(circle at 30% 25%, #e3f0d0 0%, #6f8e58 50%, #1e2b18 100%)",
    accentColor: "#4f6c40",
    pairs: ["Canelé Mille-Îles", "Sablé au citron", "Pomme rôtie"],
  },
  {
    slug: "carnet-degustation",
    name: "Carnet de Dégustation",
    tagline: "Journal pour palais curieux",
    description: "48 fiches pour noter vos extractions, arômes et coups de cœur.",
    longDescription:
      "Carnet broché à plat, papier recyclé 120 g, couverture lin teinté rose poudré. Imprimé à Montréal par Le Sablier. Inclut roue des arômes, gabarits V60 et espresso, lexique français-anglais des notes de dégustation.",
    price: 28,
    unit: "carnet 48 fiches",
    category: "accessoire",
    origin: "Le Sablier · Montréal",
    allergens: [],
    isVegan: true,
    emoji: "📓",
    gradient: "radial-gradient(circle at 30% 30%, #f6dad8 0%, #b87b85 50%, #3a1f2b 100%)",
    accentColor: "#8c5564",
    pairs: ["Filtre Bleuet", "Espresso millésimé", "Sablé breton"],
  },
  {
    slug: "trousse-decouverte",
    name: "Trousse Découverte",
    tagline: "Trois grands cafés à goûter",
    description: "Mini-sachets de Millésime Rosé, Noir Saint-Laurent et Filtre Bleuet.",
    longDescription:
      "Trois petits sachets de 80 g (équivalent 32 tasses) emballés dans une boîte en carton kraft. Idéal pour cadeau ou pour découvrir nos profils avant d'investir dans un grand format. Notes de dégustation incluses.",
    price: 32,
    unit: "coffret 3 × 80 g",
    category: "espresso",
    origin: "Atelier Marie-Anne · Montréal",
    allergens: [],
    isVegan: true,
    emoji: "🎁",
    gradient: "radial-gradient(circle at 30% 25%, #f7e0d2 0%, #c98a6b 50%, #4a2418 100%)",
    accentColor: "#a36f50",
    pairs: ["Croissant Laurier", "Canelé Mille-Îles", "Mille-feuille vanille"],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}
