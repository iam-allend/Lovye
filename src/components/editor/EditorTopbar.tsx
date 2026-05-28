"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEditorStore } from "@/store/editorStore";
import { buildPageUrl } from "@/utils";
import { useShareLink } from "@/hooks/useShareLink";
import type { Page } from "@/types/database";

export default function EditorTopbar({ page, templateSlug }: { page: Page; templateSlug: string }) {
  const { isSaving, isDirty } = useEditorStore();
  const { copy } = useShareLink();
  const [publishing, setPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(page.is_published);
  const [copied, setCopied] = useState(false);

  const togglePublish = async () => {
    setPublishing(true);
    const sb = createClient();
    const { error } = await sb.from("pages")
      .update({ is_published: !isPublished }).eq("id", page.id);
    if (!error) setIsPublished((p) => !p);
    setPublishing(false);
  };

  const handleCopy = async () => {
    // Need username — fetch from profile
    const sb = createClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return;
    const { data: profile } = await sb.from("profiles").select("username").eq("id", user.id).single();
    if (!profile) return;
    const url = buildPageUrl(profile.username, page.slug);
    await copy(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between px-4 h-13 border-b flex-shrink-0"
      style={{ background: "rgba(255,252,248,0.98)", borderColor: "rgba(240,65,90,0.08)", minHeight: 52 }}>
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="text-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-muted)" }}>← Dashboard</Link>
        <span style={{ color: "rgba(240,65,90,0.20)" }}>|</span>
        <p className="text-sm font-medium truncate max-w-[140px]" style={{ color: "var(--color-text)" }}>
          {page.title}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Save status */}
        <span className="text-xs hidden sm:block" style={{ color: "var(--color-muted)" }}>
          {isSaving ? "Menyimpan..." : isDirty ? "Belum tersimpan" : "Tersimpan ✓"}
        </span>

        {/* Copy link — only if published */}
        {isPublished && (
          <button onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl text-xs transition-all hover:opacity-80"
            style={{ background: "rgba(240,65,90,0.07)", color: "var(--color-primary)", border: "1px solid rgba(240,65,90,0.15)" }}>
            {copied ? "Tersalin ✓" : "Salin Link"}
          </button>
        )}

        {/* Publish toggle */}
        <button onClick={togglePublish} disabled={publishing}
          className="px-4 py-1.5 rounded-xl text-xs font-medium text-white transition-all hover:-translate-y-px disabled:opacity-60"
          style={{ background: isPublished ? "#6b7280" : "var(--rose-400)", boxShadow: isPublished ? "none" : "0 4px 12px rgba(240,65,90,0.22)" }}>
          {publishing ? "..." : isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>
    </div>
  );
}