import { createClient } from "@/lib/supabase/server";
import { getUserPages } from "@/lib/supabase/queries";
import Link from "next/link";
import type { PageWithTemplate } from "@/types/database";

const categoryEmoji: Record<string, string> = {
  birthday:"🎂", anniversary:"💍", valentine:"💌",
  confess:"💘", apology:"🙏", graduation:"🎓",
  farewell:"👋", "long-message":"📝", other:"✨",
};

export default async function DashboardPage() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data: pages } = await getUserPages(user!.id);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-muted)" }}>dashboard</p>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
            Halaman Saya
          </h1>
        </div>
        <Link href="/templates"
          className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white transition-all hover:-translate-y-px"
          style={{ background: "var(--rose-400)", boxShadow: "0 4px 16px rgba(240,65,90,0.22)" }}>
          + Buat Baru
        </Link>
      </div>

      {/* Stats row */}
      {!!pages?.length && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Halaman", value: pages.length },
            { label: "Published",     value: pages.filter((p) => p.is_published).length },
            { label: "Total Views",   value: pages.reduce((a, p) => a + (p.view_count ?? 0), 0) },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(240,65,90,0.08)", backdropFilter: "blur(12px)" }}>
              <p className="text-2xl font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!pages?.length ? (
        <div className="rounded-3xl p-16 text-center animate-fade-up delay-100"
          style={{ background: "rgba(255,255,255,0.60)", border: "1.5px dashed rgba(240,65,90,0.15)", backdropFilter: "blur(12px)" }}>
          <div className="text-4xl mb-4">💌</div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>Belum ada halaman</p>
          <p className="text-xs mb-6" style={{ color: "var(--color-muted)" }}>Mulai dengan memilih template yang kamu suka</p>
          <Link href="/templates"
            className="inline-flex px-5 py-2.5 rounded-2xl text-sm font-medium text-white transition-all hover:-translate-y-px"
            style={{ background: "var(--rose-400)", boxShadow: "0 4px 16px rgba(240,65,90,0.20)" }}>
            Pilih Template →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(pages as PageWithTemplate[]).map((page, i) => (
            <div key={page.id}
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{
                background: "rgba(255,255,255,0.70)",
                border: "1px solid rgba(240,65,90,0.09)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px rgba(180,80,100,0.07)",
                animationDelay: `${i * 0.06}s`,
              }}>
              {/* Thumbnail */}
              <div className="aspect-video relative flex items-center justify-center text-4xl"
                style={{ background: "linear-gradient(135deg, #fff5f7, #f8f5ff)" }}>
                <span>{categoryEmoji[page.templates?.category ?? "other"] ?? "✨"}</span>
                {page.is_published && (
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: "rgba(16,185,129,0.10)", color: "#059669", border: "1px solid rgba(16,185,129,0.18)" }}>
                    Live
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-medium text-sm truncate" style={{ color: "var(--color-text)" }}>{page.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                    {page.templates?.name} · {page.view_count ?? 0} views
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/editor/${page.id}`}
                    className="flex-1 text-center text-xs py-2 rounded-xl transition-all hover:opacity-80"
                    style={{ background: "rgba(240,65,90,0.05)", color: "var(--color-primary)", border: "1px solid rgba(240,65,90,0.12)" }}>
                    Edit
                  </Link>
                  {page.is_published && (
                    <Link href={`/u/${page.slug}`}
                      className="flex-1 text-center text-xs py-2 rounded-xl font-medium transition-all hover:opacity-80"
                      style={{ background: "var(--rose-400)", color: "white" }}>
                      Lihat →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}