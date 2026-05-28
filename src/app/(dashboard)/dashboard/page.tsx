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

  // Stats
  const total     = pages?.length ?? 0;
  const published = pages?.filter((p) => p.is_published).length ?? 0;
  const views     = pages?.reduce((a, p) => a + (p.view_count ?? 0), 0) ?? 0;

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
        <Link href="/dashboard/templates"
          className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white transition-all hover:-translate-y-px"
          style={{ background: "var(--rose-400)", boxShadow: "0 4px 16px rgba(240,65,90,0.22)" }}>
          + Buat Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Halaman", value: total,     icon: "📄" },
          { label: "Published",     value: published,  icon: "🌐" },
          { label: "Total Views",   value: views,      icon: "👁" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(240,65,90,0.08)", backdropFilter: "blur(12px)" }}>
            <p className="text-xl mb-1">{s.icon}</p>
            <p className="text-2xl font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
              {s.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/dashboard/templates"
          className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
          style={{ background: "rgba(240,65,90,0.05)", border: "1px solid rgba(240,65,90,0.12)" }}>
          <span className="text-2xl">🎨</span>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>Template Saya</p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>Lihat koleksi template</p>
          </div>
        </Link>
        <Link href="/templates"
          className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
          style={{ background: "rgba(196,174,255,0.08)", border: "1px solid rgba(196,174,255,0.20)" }}>
          <span className="text-2xl">🛍</span>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>Marketplace</p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>Cari template baru</p>
          </div>
        </Link>
      </div>

      {/* Pages list */}
      {!pages?.length ? (
        <div className="rounded-3xl p-14 text-center"
          style={{ background: "rgba(255,255,255,0.60)", border: "1.5px dashed rgba(240,65,90,0.15)", backdropFilter: "blur(12px)" }}>
          <div className="text-4xl mb-4">💌</div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>Belum ada halaman</p>
          <p className="text-xs mb-6" style={{ color: "var(--color-muted)" }}>
            Mulai dengan claim template gratis, lalu edit dan bagikan
          </p>
          <Link href="/templates"
            className="inline-flex px-5 py-2.5 rounded-2xl text-sm font-medium text-white"
            style={{ background: "var(--rose-400)", boxShadow: "0 4px 16px rgba(240,65,90,0.20)" }}>
            Pilih Template →
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>Semua Halaman</p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>{total} halaman</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(pages as PageWithTemplate[]).map((page, i) => (
              <PageCard key={page.id} page={page} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PageCard({ page, index }: { page: PageWithTemplate; index: number }) {
  const emoji = categoryEmoji[page.templates?.category ?? "other"] ?? "✨";
  const updatedAt = new Date(page.updated_at).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-fade-up"
      style={{
        background: "rgba(255,255,255,0.70)",
        border: "1px solid rgba(240,65,90,0.09)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 16px rgba(180,80,100,0.07)",
        animationDelay: `${index * 0.06}s`,
      }}>

      {/* Thumbnail */}
      <div className="aspect-video relative flex items-center justify-center text-4xl"
        style={{ background: "linear-gradient(135deg,#fff5f7,#f8f5ff)" }}>
        <span>{emoji}</span>
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          {page.is_published ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{ background: "rgba(16,185,129,0.10)", color: "#059669", border: "1px solid rgba(16,185,129,0.18)" }}>
              ● Live
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--color-muted)" }}>
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <p className="font-medium text-sm truncate" style={{ color: "var(--color-text)" }}>{page.title}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
            {page.templates?.name} · {page.view_count ?? 0} views · {updatedAt}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/editor/${page.id}`}
            className="flex-1 text-center text-xs py-2 rounded-xl transition-all hover:opacity-80"
            style={{ background: "rgba(240,65,90,0.05)", color: "var(--color-primary)", border: "1px solid rgba(240,65,90,0.12)" }}>
            ✏️ Edit
          </Link>
          {page.is_published && (
            <Link href={`/u/${page.slug}`}
              className="flex-1 text-center text-xs py-2 rounded-xl font-medium transition-all hover:opacity-80"
              style={{ background: "var(--rose-400)", color: "white" }}>
              🔗 Lihat
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}