// PATH: src/app/u/[username]/[slug]/page.tsx
// URL:  /u/[username]/[slug] — PUBLIC, no auth required

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getTemplate } from "@/templates/_base/registry";
import PublicPageRenderer from "@/components/public/PublicPageRenderer";

type Props = { params: Promise<{ username: string; slug: string }> };

// ── SEO Metadata ──────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, slug } = await params;
  const sb = await createClient();

  const { data: profile } = await sb
    .from("profiles")
    .select("id, display_name, username")
    .eq("username", username)
    .single();

  if (!profile) return { title: "Lovye" };

  const { data: page } = await sb
    .from("pages")
    .select("title, template_id, templates(name, category)")
    .eq("user_id", profile.id)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!page) return { title: "Lovye" };

const category = (page.templates as unknown as { category: string } | null)?.category ?? "";

  return {
    title: `${page.title} — Lovye`,
    description: `Halaman ucapan digital dari @${username}. Dibuat dengan Lovye.`,
    openGraph: {
      title: page.title,
      description: `Halaman ucapan digital dari @${username}`,
      url: `https://lovye.vercel.app/u/${username}/${slug}`,
      siteName: "Lovye",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: `Halaman ucapan digital dari @${username}`,
    },
  };
}

// ── Page Component ────────────────────────────────────────
export default async function PublicPage({ params }: Props) {
  const { username, slug } = await params;
  const sb = await createClient();

  // 1. Resolve username → profile
  const { data: profile } = await sb
    .from("profiles")
    .select("id, username, display_name")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  // 2. Fetch published page
  const { data: page } = await sb
    .from("pages")
    .select("*, templates(id, slug, is_free, config_json)")
    .eq("user_id", profile.id)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!page) notFound();

  // 3. Increment view count (fire and forget)
  sb.rpc("increment_view_count", { page_id: page.id }).then(() => {});

  // 4. Resolve template dari registry
  const templateSlug = (page.templates as { slug: string } | null)?.slug ?? "";
  const isFree = (page.templates as { is_free: boolean } | null)?.is_free ?? true;
  const entry = getTemplate(templateSlug) ?? getTemplate("romantic-pink");

  if (!entry) notFound();

  // 5. Cek apakah perlu watermark
  // Template gratis → watermark tampil
  // Premium yang sudah dibeli → tidak ada watermark
  const showWatermark = isFree;

  return (
    <PublicPageRenderer
      page={page}
      templateSlug={entry.config.id ?? templateSlug}
      templateConfig={entry.config}
      customData={page.custom_data_json}
      showWatermark={showWatermark}
      username={profile.username}
    />
  );
}