import Link from "next/link";
import { getFeaturedTemplates } from "@/lib/supabase/server-queries";
import TemplateCard from "@/components/template/TemplateCard";
import { TEMPLATE_FALLBACK } from "@/types/template-display";
import type { TemplateRow } from "@/types/template-display";

export default async function FeaturedTemplates() {
  const { data } = await getFeaturedTemplates(4);
  const templates: TemplateRow[] = (data && data.length > 0) ? data : TEMPLATE_FALLBACK.slice(0, 4);

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
          {templates.map((t, i) => (
            <TemplateCard key={t.id} template={t} owned={false} index={i} mode="preview" />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/register"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all hover:-translate-y-px"
            style={{ borderColor: "rgba(240,65,90,0.20)", color: "var(--color-primary)", background: "rgba(240,65,90,0.04)" }}>
            Lihat semua template →
          </Link>
        </div>
      </div>
    </section>
  );
}