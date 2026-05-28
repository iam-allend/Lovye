"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateRandomId } from "@/utils";
import { TEMPLATE_CATEGORIES, CATEGORY_STYLE } from "@/types/template-display";
import type { TemplateRow } from "@/types/template-display";

type Props = {
  templates: TemplateRow[];
  ownedIds: Set<string>;
  userId: string | null;
};

export default function TemplateMarketplace({ templates, ownedIds, userId }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set(ownedIds));
  const router = useRouter();
  const [, startTransition] = useTransition();

  const filtered = activeCategory === "all"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const handleClaim = async (template: TemplateRow) => {
    if (!userId) { router.push("/register"); return; }
    if (!template.is_free) return;
    if (claimedIds.has(template.id)) {
      // Sudah claim — langsung buat page baru
      await createAndRedirect(template);
      return;
    }
    setLoadingId(template.id);
    const sb = createClient();
    try {
      await sb.from("purchases").upsert({
        user_id: userId,
        template_id: template.id,
        payment_status: "paid",
        price_at_purchase: 0,
      }, { onConflict: "user_id,template_id", ignoreDuplicates: true });
      setClaimedIds((prev) => new Set([...prev, template.id]));
      await createAndRedirect(template);
    } catch (e) {
      console.error(e);
      setLoadingId(null);
    }
  };

  const createAndRedirect = async (template: TemplateRow) => {
    const sb = createClient();
    const { data: page, error } = await sb.from("pages").insert({
      user_id: userId,
      template_id: template.id,
      slug: generateRandomId(8),
      title: template.name,
      custom_data_json: {},
      is_published: false,
    }).select("id").single();
    if (error || !page) { setLoadingId(null); return; }
    startTransition(() => router.push(`/editor/${page.id}`));
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#fff5f7 0%,#fffcf8 60%,#f8f5ff 100%)" }}>
      {/* Navbar spacer */}
      <div className="h-20" />

      <div className="max-w-5xl mx-auto px-4 pb-20 pt-15">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "var(--color-muted)" }}>
            semua template
          </p>
          <h1 className="text-4xl font-light mb-3" style={{ fontFamily: "var(--font-display)", color: "#2b1d27" }}>
            Pilih yang paling{" "}
            <span className="gradient-text">menyentuh hati</span>
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--color-text-2)" }}>
            {templates.length} template aesthetic siap dipakai. Gratis & premium tersedia.
          </p>
        </div>

        {/* Category filter — horizontal scroll mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 animate-fade-up delay-100"
          style={{ scrollbarWidth: "none" }}>
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200"
              style={{
                background: activeCategory === cat.id ? "var(--rose-400)" : "rgba(255,255,255,0.70)",
                color: activeCategory === cat.id ? "white" : "var(--color-text-2)",
                border: activeCategory === cat.id ? "none" : "1px solid rgba(240,65,90,0.12)",
                fontWeight: activeCategory === cat.id ? 500 : 400,
                boxShadow: activeCategory === cat.id ? "0 4px 14px rgba(240,65,90,0.22)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}>
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Grid — 2 kolom di mobile, 2 kolom di desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {filtered.map((t, i) => {
            const s = CATEGORY_STYLE[t.category] ?? CATEGORY_STYLE.other;
            const owned = claimedIds.has(t.id);
            const isLoading = loadingId === t.id;

            return (
              <div key={t.id}
                className="group relative overflow-hidden rounded-[24px] sm:rounded-[34px] border border-white/60 bg-white/55
                  shadow-[0_8px_30px_rgba(240,65,90,0.07)] backdrop-blur-2xl
                  transition-all duration-500 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}>

                {/* Premium lock */}
                {!t.is_free && !owned && (
                  <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                    style={{ background: "rgba(196,174,255,0.35)", border: "1px solid rgba(196,174,255,0.55)" }}>
                    🔒
                  </div>
                )}

                {/* Claimed badge */}
                {owned && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ background: "rgba(16,185,129,0.12)", color: "#059669", border: "1px solid rgba(16,185,129,0.20)" }}>
                    ✓ Dimiliki
                  </div>
                )}

                {/* Visual area — lebih compact di mobile */}
                <div className="p-2.5 sm:p-4">
                  <div className="aspect-[1.1] overflow-hidden rounded-[18px] sm:rounded-[28px] p-3 sm:p-5"
                    style={{ background: s.gradient }}>
                    <div className="flex justify-between items-start">
                      <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium"
                        style={{ color: "var(--color-text-2)" }}>
                        {t.category}
                      </span>
                      <span className="text-sm sm:text-base">{s.emoji}</span>
                    </div>

                    <div className="mt-4 sm:mt-10">
                      <h3 className="text-lg sm:text-3xl font-semibold leading-tight"
                        style={{ color: "#2b1d27", fontFamily: "var(--font-display)" }}>
                        {t.name}
                      </h3>
                      <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 hidden sm:block"
                        style={{ color: "var(--color-text-2)" }}>
                        immersive emotional storytelling template.
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-2.5 sm:mt-4 flex items-center justify-between px-0.5 sm:px-2">
                    <div>
                      <p className="text-xs sm:text-sm font-medium" style={{ color: "#32202b" }}>
                        {t.is_free ? "Gratis" : `Rp ${(t.price / 1000).toFixed(0)}K`}
                      </p>
                      <p className="text-[10px] sm:text-xs hidden sm:block" style={{ color: "var(--color-muted)" }}>
                        {t.is_free ? "free template" : owned ? "✓ Sudah dimiliki" : "premium"}
                      </p>
                    </div>

                    <button
                      onClick={() => t.is_free ? handleClaim(t) : router.push("/register")}
                      disabled={isLoading}
                      className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[1px] disabled:opacity-60"
                      style={{
                        background: t.is_free ? "var(--rose-400)" : "var(--lavender-400)",
                        boxShadow: t.is_free ? "0 4px 12px rgba(240,65,90,0.22)" : "none",
                      }}>
                      {isLoading ? "..." : t.is_free ? (owned ? "Buat Lagi" : "Claim") : "Unlock"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--color-muted)" }}>
            <p className="text-sm">Belum ada template untuk kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}