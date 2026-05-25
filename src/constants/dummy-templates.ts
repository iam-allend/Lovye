export type DummyTemplate = {
  id: string;
  slug: string;
  name: string;
  category:
    | "birthday"
    | "anniversary"
    | "confess"
    | "apology"
    | "graduation"
    | "long-message";
  description: string;
  cover: string;
  price: number;
  premium: boolean;
  accent: {
    primary: string;
    secondary: string;
  };
};

export const dummyTemplates: DummyTemplate[] = [
  {
    id: "tpl-romantic-night",
    slug: "romantic-night",
    name: "Romantic Night",
    category: "anniversary",
    description:
      "Template cinematic dengan nuansa malam romantis dan transisi emotional.",
    cover:
      "linear-gradient(135deg, #ffe4e9 0%, #f3eeff 100%)",
    price: 25000,
    premium: true,
    accent: {
      primary: "#f7687e",
      secondary: "#c4aeff",
    },
  },

  {
    id: "tpl-soft-confess",
    slug: "soft-confess",
    name: "Soft Confess",
    category: "confess",
    description:
      "Buat confess jadi lebih aesthetic, immersive, dan gak cringe.",
    cover:
      "linear-gradient(135deg, #fff0f4 0%, #ffe4e9 100%)",
    price: 19000,
    premium: true,
    accent: {
      primary: "#f0415a",
      secondary: "#ffb8cb",
    },
  },

  {
    id: "tpl-sweet-memory",
    slug: "sweet-memory",
    name: "Sweet Memory",
    category: "birthday",
    description:
      "Template playful dengan galeri foto dan efek dreamy glow.",
    cover:
      "linear-gradient(135deg, #fff8f4 0%, #f8f5ff 100%)",
    price: 22000,
    premium: false,
    accent: {
      primary: "#ff9db0",
      secondary: "#c4aeff",
    },
  },

  {
    id: "tpl-last-letter",
    slug: "last-letter",
    name: "Last Letter",
    category: "long-message",
    description:
      "Long message storytelling dengan scroll cinematic dan ambience music.",
    cover:
      "linear-gradient(135deg, #f3eeff 0%, #fff5f7 100%)",
    price: 30000,
    premium: true,
    accent: {
      primary: "#a87fff",
      secondary: "#f7687e",
    },
  },

  {
    id: "tpl-im-sorry",
    slug: "im-sorry",
    name: "I'm Sorry",
    category: "apology",
    description:
      "Nuansa mellow dengan efek blur dan transisi emotional lembut.",
    cover:
      "linear-gradient(135deg, #fff0f4 0%, #fffdf8 100%)",
    price: 17000,
    premium: false,
    accent: {
      primary: "#f7687e",
      secondary: "#ffd6c2",
    },
  },

  {
    id: "tpl-graduate-star",
    slug: "graduate-star",
    name: "Graduate Star",
    category: "graduation",
    description:
      "Celebration vibes dengan floating particles dan aesthetic card layout.",
    cover:
      "linear-gradient(135deg, #f8f5ff 0%, #fff8f4 100%)",
    price: 24000,
    premium: true,
    accent: {
      primary: "#c4aeff",
      secondary: "#f9906a",
    },
  },
];