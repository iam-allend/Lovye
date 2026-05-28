"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateRandomId } from "@/utils";
import TemplateCard from "./TemplateCard";
import { TEMPLATE_CATEGORIES } from "@/types/template-display";
import type { TemplateRow } from "@/types/template-display";

type Props = {
  templates: TemplateRow[];
  ownedIds: Set<string>;
  userId: string;
};

export default function TemplateShop({ templates, ownedIds, userId }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const filtered = activeCategory === "all"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const handleUse = async (template: TemplateRow) => {
    const isAvailable = template.is_free || ownedIds.has(template.id);
    if (!isAvailable) return;

    setLoadingId(template.id);
    const sb = createClient();

    try {
      // Claim free template jika belum punya purchase record
      if (template.is_free && !ownedIds.has(template.id)) {
        await sb.from("purchases").upsert({
          user_id: userId,
          template_id: template.id,
          payment_status: "paid",
          price_at_purchase: 0,
        }, { onConflict: "user_id,template_id", ignoreDuplicates: true });
      }

      // Buat page baru
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

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-muted)" }}>
          koleksi template
        </p>
        <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
          Pilih Template
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Pilih template, edit isi, lalu bagikan linknya.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
        {TEMPLATE_CATEGORIES.map((cat) => (
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

      {/* Grid — card identik dengan landing page */}
      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: "var(--color-muted)" }}>
          <p className="text-sm">Belum ada template untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((t, i) => (
            <TemplateCard
              key={t.id}
              template={t}
              owned={ownedIds.has(t.id)}
              loading={loadingId === t.id}
              index={i}
              mode="use"
              onUse={() => handleUse(t)}
            />
          ))}
        </div>
      )}
    </div>
  );
}