"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { dummyTemplates, type DummyTemplate } from "@/constants/dummy-templates";
import { createClient } from "@/lib/supabase/client";
import { generateRandomId } from "@/utils";

const CATEGORIES = [
  { id: "all",          label: "Semua",        emoji: "✨" },
  { id: "anniversary",  label: "Anniversary",  emoji: "💍" },
  { id: "birthday",     label: "Birthday",     emoji: "🎂" },
  { id: "confess",      label: "Confess",      emoji: "💘" },
  { id: "apology",      label: "Apology",      emoji: "🙏" },
  { id: "graduation",   label: "Graduation",   emoji: "🎓" },
  { id: "long-message", label: "Long Message", emoji: "📝" },
];

type Props = { ownedSlugs: Set<string>; userId: string };

export default function TemplateShop({ ownedSlugs, userId }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const filtered = activeCategory === "all"
    ? dummyTemplates
    : dummyTemplates.filter((t) => t.category === activeCategory);

  const handleUse = async (template: DummyTemplate) => {
    setLoadingSlug(template.slug);
    const sb = createClient();
    try {
      const slug = generateRandomId(8);
      const { data: page, error } = await sb.from("pages").insert({
        user_id: userId,
        template_id: template.id,
        slug,
        title: template.name,
        custom_data_json: {},
        is_published: false,
      }).select().single();
      if (error || !page) throw error;
      startTransition(() => router.push(`/editor/${page.id}`));
    } catch (e) {
      console.error(e);
      setLoadingSlug(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-muted)" }}>koleksi template</p>
        <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
          Pilih Template
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Pilih template, edit isi, lalu bagikan linknya.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200"
            style={{
              background: activeCategory === cat.id ? "var(--rose-400)" : "rgba(255,255,255,0.65)",
              color: activeCategory === cat.id ? "white" : "var(--color-text-2)",
              border: activeCategory === cat.id ? "none" : "1px solid rgba(240,65,90,0.12)",
              fontWeight: activeCategory === cat.id ? 500 : 400,
              boxShadow: activeCategory === cat.id ? "0 4px 14px rgba(240,65,90,0.22)" : "0 2px 8px rgba(0,0,0,0.04)",
            }}>
            <span>{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((template, i) => {
          const owned = ownedSlugs.has(template.slug) || !template.premium;
          return (
            <TemplateCard key={template.id} template={template}
              owned={owned}
              loading={loadingSlug === template.slug}
              index={i}
              onUse={() => handleUse(template)} />
          );
        })}
      </div>
    </div>
  );
}

function TemplateCard({ template, owned, loading, index, onUse }: {
  template: DummyTemplate; owned: boolean; loading: boolean; index: number; onUse: () => void;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-[34px] border border-white/60 bg-white/55 p-4
        shadow-[0_12px_40px_rgba(240,65,90,0.07)] backdrop-blur-2xl transition-all duration-500
        hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}>

      {/* Lock badge */}
      {template.premium && !owned && (
        <div className="absolute top-6 right-6 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs"
          style={{ background: "rgba(196,174,255,0.30)", border: "1px solid rgba(196,174,255,0.50)" }}>
          🔒
        </div>
      )}

      {/* Visual area */}
      <div className="aspect-[1.1] overflow-hidden rounded-[28px] p-5" style={{ background: template.cover }}>
        <div className="flex justify-between items-start">
          <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium" style={{ color: "var(--color-text-2)" }}>
            {template.category}
          </span>
          <span className="text-sm">✨</span>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-semibold leading-tight max-w-[220px]"
            style={{ color: "#2b1d27", fontFamily: "var(--font-display)" }}>
            {template.name}
          </h3>
          <p className="mt-3 text-sm leading-6" style={{ color: "var(--color-text-2)" }}>
            {template.description}
          </p>
        </div>

        {/* Accent color swatches */}
        <div className="mt-6 flex gap-2">
          <div className="h-5 w-5 rounded-full border-2 border-white/80"
            style={{ background: template.accent.primary }} />
          <div className="h-5 w-5 rounded-full border-2 border-white/80"
            style={{ background: template.accent.secondary }} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between px-2">
        <div>
          <p className="text-sm font-medium" style={{ color: "#32202b" }}>
            {template.premium ? `Rp ${(template.price / 1000).toFixed(0)}K` : "Gratis"}
          </p>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            {!template.premium ? "free template" : owned ? "✓ Sudah dimiliki" : "premium"}
          </p>
        </div>

        <button onClick={onUse} disabled={loading || !owned}
          className="rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[1px] disabled:opacity-60 glow-rose-1"
          style={{ background: owned ? "var(--rose-400)" : "var(--lavender-400)" }}>
          {loading ? "..." : owned ? "Gunakan" : "Unlock"}
        </button>
      </div>
    </div>
  );
}