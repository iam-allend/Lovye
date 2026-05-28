// Shared display type — struktur dari Supabase select
export type TemplateRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  is_free: boolean;
};

export const CATEGORY_STYLE: Record<string, { gradient: string; emoji: string }> = {
  anniversary:    { gradient: "linear-gradient(135deg,#ffe4e9,#f3eeff)", emoji: "💍" },
  confess:        { gradient: "linear-gradient(135deg,#fff0f4,#ffe4e9)", emoji: "💘" },
  birthday:       { gradient: "linear-gradient(135deg,#fff8f4,#f8f5ff)", emoji: "🎂" },
  "long-message": { gradient: "linear-gradient(135deg,#f3eeff,#fff5f7)", emoji: "📝" },
  apology:        { gradient: "linear-gradient(135deg,#fff0f4,#fffdf8)", emoji: "🙏" },
  graduation:     { gradient: "linear-gradient(135deg,#f8f5ff,#fff8f4)", emoji: "🎓" },
  valentine:      { gradient: "linear-gradient(135deg,#ffe4e9,#fff0f4)", emoji: "💌" },
  farewell:       { gradient: "linear-gradient(135deg,#f3eeff,#fffdf7)", emoji: "👋" },
  other:          { gradient: "linear-gradient(135deg,#fff5f7,#f8f5ff)", emoji: "✨" },
};

export const TEMPLATE_CATEGORIES = [
  { id: "all",          label: "Semua",        emoji: "✨" },
  { id: "anniversary",  label: "Anniversary",  emoji: "💍" },
  { id: "birthday",     label: "Birthday",     emoji: "🎂" },
  { id: "confess",      label: "Confess",      emoji: "💘" },
  { id: "apology",      label: "Apology",      emoji: "🙏" },
  { id: "graduation",   label: "Graduation",   emoji: "🎓" },
  { id: "long-message", label: "Long Message", emoji: "📝" },
  { id: "valentine",    label: "Valentine",    emoji: "💌" },
  { id: "farewell",     label: "Farewell",     emoji: "👋" },
];

// Fallback jika DB belum di-seed
export const TEMPLATE_FALLBACK: TemplateRow[] = [
  { id:"1", name:"Romantic Night",  slug:"romantic-night",  category:"anniversary",  price:25000, is_free:false },
  { id:"2", name:"Soft Confess",    slug:"soft-confess",    category:"confess",      price:19000, is_free:false },
  { id:"3", name:"Sweet Memory",    slug:"sweet-memory",    category:"birthday",     price:22000, is_free:false },
  { id:"4", name:"Last Letter",     slug:"last-letter",     category:"long-message", price:30000, is_free:false },
  { id:"5", name:"I'm Sorry",       slug:"im-sorry",        category:"apology",      price:17000, is_free:false },
  { id:"6", name:"Graduate Star",   slug:"graduate-star",   category:"graduation",   price:24000, is_free:false },
];