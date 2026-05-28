import { getFeaturedTemplates } from "@/lib/supabase/server-queries";
import Link from "next/link";

// Gradient per kategori
const categoryStyle: Record<string, { gradient: string; emoji: string }> = {
  anniversary:  { gradient: "linear-gradient(135deg,#ffe4e9,#f3eeff)", emoji: "💍" },
  confess:      { gradient: "linear-gradient(135deg,#fff0f4,#ffe4e9)", emoji: "💘" },
  birthday:     { gradient: "linear-gradient(135deg,#fff8f4,#f8f5ff)", emoji: "🎂" },
  "long-message":{ gradient: "linear-gradient(135deg,#f3eeff,#fff5f7)", emoji: "📝" },
  apology:      { gradient: "linear-gradient(135deg,#fff0f4,#fffdf8)", emoji: "🙏" },
  graduation:   { gradient: "linear-gradient(135deg,#f8f5ff,#fff8f4)", emoji: "🎓" },
  valentine:    { gradient: "linear-gradient(135deg,#ffe4e9,#fff0f4)", emoji: "💌" },
  farewell:     { gradient: "linear-gradient(135deg,#f3eeff,#fffdf7)", emoji: "👋" },
  other:        { gradient: "linear-gradient(135deg,#fff5f7,#f8f5ff)", emoji: "✨" },
};

type TemplateRow = {
  id: string; name: string; slug: string;
  category: string; price: number; is_free: boolean;
};

// Fallback dummy jika DB belum di-seed
const FALLBACK: TemplateRow[] = [
  { id:"1", name:"Romantic Night",  slug:"romantic-night",  category:"anniversary",   price:25000, is_free:false },
  { id:"2", name:"Soft Confess",    slug:"soft-confess",    category:"confess",        price:19000, is_free:false },
  { id:"3", name:"Sweet Memory",    slug:"sweet-memory",    category:"birthday",       price:22000, is_free:false },
  { id:"4", name:"Last Letter",     slug:"last-letter",     category:"long-message",   price:30000, is_free:false },
];

export default async function FeaturedTemplates() {
  const { data } = await getFeaturedTemplates(4);
  const templates: TemplateRow[] = (data && data.length > 0) ? data : FALLBACK;

  return (
    <section id="templates" className="px-4 pb-20 pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>template pilihan</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight" style={{ color: "#2b1d27" }}>
            floating cinematic cards.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {templates.map((t, i) => {
            const style = categoryStyle[t.category] ?? categoryStyle.other;
            return (
              <div key={t.id}
                className="group relative overflow-hidden rounded-[34px] border border-white/60 bg-white/55 p-4
                  shadow-[0_12px_40px_rgba(240,65,90,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1">

                <div className="aspect-[1.1] overflow-hidden rounded-[28px] p-5" style={{ background: style.gradient }}>
                  <div className="flex justify-between">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium"
                      style={{ color: "var(--color-text-2)" }}>
                      {t.category}
                    </span>
                    <span className="text-sm">{style.emoji}</span>
                  </div>

                  <div className="mt-10">
                    <h3 className="max-w-[220px] text-3xl font-semibold leading-tight"
                      style={{ color: "#2b1d27", fontFamily: "var(--font-display)" }}>
                      {t.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: "var(--color-text-2)" }}>
                      immersive emotional storytelling template.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-2">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#32202b" }}>
                      {t.is_free ? "Gratis" : `Rp ${(t.price / 1000).toFixed(0)}K`}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                      {t.is_free ? "free template" : "premium aesthetic"}
                    </p>
                  </div>
                  <Link href="/templates"
                    className="rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[1px] glow-rose-1"
                    style={{ background: "var(--rose-400)" }}>
                    Preview
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/templates"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all hover:-translate-y-px"
            style={{ borderColor: "rgba(240,65,90,0.20)", color: "var(--color-primary)", background: "rgba(240,65,90,0.04)" }}>
            Lihat semua template →
          </Link>
        </div>
      </div>
    </section>
  );
}