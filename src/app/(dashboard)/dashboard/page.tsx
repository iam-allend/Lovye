import { createClient } from "@/lib/supabase/server";
import { getUserPages } from "@/lib/supabase/queries";
import Link from "next/link";
import type { PageWithTemplate } from "@/types/database";

export default async function DashboardPage() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data: pages } = await getUserPages(user!.id);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}>
            Halaman Saya
          </h1>
          <p className="text-sm text-white/30 mt-1">
            {pages?.length ?? 0} halaman dibuat
          </p>
        </div>
        <Link href="/templates"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #f63d5e 0%, #ab65ff 100%)" }}>
          <span className="text-base leading-none">+</span> Buat Baru
        </Link>
      </div>

      {/* Empty state */}
      {!pages?.length ? (
        <div className="glass rounded-3xl p-16 text-center animate-fade-up delay-100">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-5"
            style={{ background: "linear-gradient(135deg, rgba(246,61,94,0.2), rgba(171,101,255,0.2))", border: "1px solid rgba(255,255,255,0.08)" }}>
            💌
          </div>
          <p className="text-white/50 text-sm mb-1">Belum ada halaman</p>
          <p className="text-white/25 text-xs mb-6">Mulai dengan memilih template yang kamu suka</p>
          <Link href="/templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium text-white transition-all"
            style={{ background: "linear-gradient(135deg, #f63d5e 0%, #ab65ff 100%)" }}>
            Pilih Template →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(pages as PageWithTemplate[]).map((page, i) => (
            <PageCard key={page.id} page={page} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function PageCard({ page, index }: { page: PageWithTemplate; index: number }) {
  const categoryEmoji: Record<string, string> = {
    birthday: "🎂", anniversary: "💍", valentine: "💌",
    confess: "💘", apology: "🙏", graduation: "🎓",
    farewell: "👋", "long-message": "📝", other: "✨",
  };
  const emoji = categoryEmoji[page.templates?.category ?? "other"] ?? "✨";

  return (
    <div
      className="glass rounded-2xl overflow-hidden group transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5 animate-fade-up"
      style={{ animationDelay: `${index * 0.07}s` }}>
      {/* Thumbnail area */}
      <div className="aspect-video relative overflow-hidden flex items-center justify-center text-4xl"
        style={{ background: "linear-gradient(135deg, rgba(246,61,94,0.08), rgba(171,101,255,0.12))" }}>
        <span className="opacity-50">{emoji}</span>
        {page.is_published && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-xs font-medium text-emerald-300"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.2)" }}>
            Live
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <p className="font-medium text-white text-sm truncate">{page.title}</p>
          <p className="text-xs text-white/30 mt-0.5">
            {page.templates?.name} · {page.view_count} views
          </p>
        </div>

        <div className="flex gap-2">
          <Link href={`/editor/${page.id}`}
            className="flex-1 text-center text-xs py-2 rounded-xl text-white/60 hover:text-white transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Edit
          </Link>
          {page.is_published ? (
            <Link href={`/u/${page.slug}`}
              className="flex-1 text-center text-xs py-2 rounded-xl font-medium text-rose-300 hover:text-rose-200 transition-all duration-200"
              style={{ background: "rgba(246,61,94,0.08)", border: "1px solid rgba(246,61,94,0.15)" }}>
              Lihat →
            </Link>
          ) : (
            <Link href={`/editor/${page.id}`}
              className="flex-1 text-center text-xs py-2 rounded-xl text-white/30 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              Draft
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}