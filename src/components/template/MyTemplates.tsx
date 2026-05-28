"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateRandomId } from "@/utils";
import { CATEGORY_STYLE } from "@/types/template-display";
import type { TemplateRow } from "@/types/template-display";
import Link from "next/link";

type Props = { templates: TemplateRow[]; userId: string };

export default function MyTemplates({ templates, userId }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleUse = async (template: TemplateRow) => {
    setLoadingId(template.id);
    const sb = createClient();
    try {
      const { data: page, error } = await sb.from("pages").insert({
        user_id: userId,
        template_id: template.id,
        slug: generateRandomId(8),
        title: template.name,
        custom_data_json: {},
        is_published: false,
      }).select("id").single();
      if (error || !page) throw error;
      startTransition(() => router.push(`/editor/${page.id}`));
    } catch (e) {
      console.error(e);
      setLoadingId(null);
    }
  };

  if (templates.length === 0) return (
    <div className="rounded-3xl p-16 text-center"
      style={{ background: "rgba(255,255,255,0.60)", border: "1.5px dashed rgba(240,65,90,0.15)" }}>
      <div className="text-4xl mb-4">🎨</div>
      <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>Belum ada template</p>
      <p className="text-xs mb-6" style={{ color: "var(--color-muted)" }}>
        Claim template gratis atau beli premium di marketplace
      </p>
      <Link href="/templates"
        className="inline-flex px-5 py-2.5 rounded-2xl text-sm font-medium text-white"
        style={{ background: "var(--rose-400)", boxShadow: "0 4px 16px rgba(240,65,90,0.20)" }}>
        Lihat Template →
      </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5">
      {templates.map((t, i) => {
        const s = CATEGORY_STYLE[t.category] ?? CATEGORY_STYLE.other;
        const isLoading = loadingId === t.id;

        return (
          <div key={t.id}
            className="group relative overflow-hidden rounded-[24px] sm:rounded-[34px] border border-white/60 bg-white/55
              shadow-[0_8px_30px_rgba(240,65,90,0.07)] backdrop-blur-2xl
              transition-all duration-500 hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}>

            <div className="p-2.5 sm:p-4">
              <div className="aspect-[1.1] overflow-hidden rounded-[18px] sm:rounded-[28px] p-3 sm:p-5"
                style={{ background: s.gradient }}>
                <div className="flex justify-between items-start">
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium"
                    style={{ color: "var(--color-text-2)" }}>
                    {t.category}
                  </span>
                  <span>{s.emoji}</span>
                </div>
                <div className="mt-4 sm:mt-10">
                  <h3 className="text-lg sm:text-3xl font-semibold leading-tight"
                    style={{ color: "#2b1d27", fontFamily: "var(--font-display)" }}>
                    {t.name}
                  </h3>
                </div>
              </div>

              <div className="mt-2.5 sm:mt-4 flex items-center justify-between px-0.5 sm:px-2">
                <div>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: "#32202b" }}>
                    {t.is_free ? "Gratis" : `Rp ${(t.price / 1000).toFixed(0)}K`}
                  </p>
                  <p className="text-[10px] sm:text-xs" style={{ color: "var(--color-muted)" }}>
                    ✓ Dimiliki
                  </p>
                </div>
                <button onClick={() => handleUse(t)} disabled={isLoading}
                  className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:-translate-y-px disabled:opacity-60"
                  style={{ background: "var(--rose-400)", boxShadow: "0 4px 12px rgba(240,65,90,0.22)" }}>
                  {isLoading ? "..." : "Gunakan"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}