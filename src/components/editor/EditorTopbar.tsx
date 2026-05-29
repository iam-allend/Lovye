"use client";
// PATH: src/components/editor/EditorTopbar.tsx

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEditorStore } from "@/store/editorStore";
import type { Page } from "@/types/database";

export default function EditorTopbar({ page, templateSlug }: { page: Page; templateSlug: string }) {
  const { isSaving, isDirty } = useEditorStore();
  const [publishing, setPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(page.is_published);
  const [copied, setCopied] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    createClient().from("profiles").select("username").eq("id", page.user_id).single()
      .then(({ data }) => setUsername(data?.username ?? null));
  }, [page.user_id]);

  const pageUrl = username
    ? `${window.location.origin}/u/${username}/${page.slug}`
    : null;

  const togglePublish = async () => {
    setPublishing(true);
    const sb = createClient();
    const { error } = await sb.from("pages")
      .update({ is_published: !isPublished })
      .eq("id", page.id);
    if (!error) setIsPublished((p) => !p);
    setPublishing(false);
  };

  const handleCopy = async () => {
    if (!pageUrl) return;
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveStatus = isSaving ? "Menyimpan..." : isDirty ? "Belum tersimpan" : "Tersimpan ✓";

  return (
    <div className="flex items-center justify-between px-4 border-b flex-shrink-0"
      style={{
        minHeight: 52,
        background: "rgba(255,252,248,0.98)",
        borderColor: "rgba(240,65,90,0.08)",
      }}>

      <div className="flex items-center gap-3">
        <Link href="/dashboard"
          className="text-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-muted)" }}>
          ← Dashboard
        </Link>
        <span style={{ color: "rgba(240,65,90,0.20)" }}>|</span>
        <p className="text-sm font-medium truncate max-w-[120px] sm:max-w-[200px]"
          style={{ color: "var(--color-text)" }}>
          {page.title}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs hidden sm:block" style={{ color: "var(--color-muted)" }}>
          {saveStatus}
        </span>

        {isPublished && pageUrl && (
          <button onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl text-xs transition-all hover:opacity-80"
            style={{
              background: "rgba(240,65,90,0.07)",
              color: "var(--color-primary)",
              border: "1px solid rgba(240,65,90,0.15)",
            }}>
            {copied ? "✓ Tersalin" : "Salin Link"}
          </button>
        )}

        {isPublished && pageUrl && (
          <Link href={pageUrl} target="_blank"
            className="px-3 py-1.5 rounded-xl text-xs transition-all hover:opacity-80 hidden sm:block"
            style={{
              background: "rgba(16,185,129,0.08)",
              color: "#059669",
              border: "1px solid rgba(16,185,129,0.18)",
            }}>
            Lihat →
          </Link>
        )}

        <button onClick={togglePublish} disabled={publishing}
          className="px-4 py-1.5 rounded-xl text-xs font-medium text-white transition-all hover:-translate-y-px disabled:opacity-60"
          style={{
            background: isPublished ? "#6b7280" : "var(--rose-400)",
            boxShadow: isPublished ? "none" : "0 4px 12px rgba(240,65,90,0.22)",
          }}>
          {publishing ? "..." : isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>
    </div>
  );
}