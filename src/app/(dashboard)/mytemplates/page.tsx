import { createClient } from "@/lib/supabase/server";
import { TEMPLATE_FALLBACK } from "@/types/template-display";
import type { TemplateRow } from "@/types/template-display";
import MyTemplates from "@/components/template/MyTemplates";
import Link from "next/link";

export const metadata = { title: "Template Saya — Lovye" };

export default async function DashboardTemplatesPage() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();

  const { data: purchases } = await sb
    .from("purchases")
    .select("template_id, templates(id, name, slug, category, price, is_free)")
    .eq("user_id", user!.id)
    .eq("payment_status", "paid");

  const ownedTemplates: TemplateRow[] = (purchases ?? [])
    .map((p) => p.templates as unknown as TemplateRow)
    .filter(Boolean);

  const templates = ownedTemplates.length > 0
    ? ownedTemplates
    : TEMPLATE_FALLBACK.filter((t) => t.is_free);

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-muted)" }}>
            koleksi saya
          </p>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
            Template Saya
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
            {templates.length} template tersedia
          </p>
        </div>
        <Link href="/templates"
          className="px-4 py-2 rounded-2xl text-sm font-medium transition-all hover:-translate-y-px"
          style={{ background: "rgba(240,65,90,0.07)", color: "var(--color-primary)", border: "1px solid rgba(240,65,90,0.15)" }}>
          + Cari Template
        </Link>
      </div>
      <MyTemplates templates={templates} userId={user!.id} />
    </div>
  );
}