"use client";
// PATH: src/components/public/ShareButton.tsx

import { useState } from "react";

type Props = { username: string; slug: string; title: string };

export default function ShareButton({ username, slug, title }: Props) {
  const [copied, setCopied] = useState(false);

  // window hanya tersedia di client — buat URL saat handleShare dipanggil
  const getUrl = () => `${window.location.origin}/u/${username}/${slug}`;

  const handleShare = async () => {
    const url = getUrl();
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:-translate-y-px"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(240,65,90,0.15)",
        color: "var(--color-primary)",
        boxShadow: "0 4px 16px rgba(240,65,90,0.10)",
      }}>
      {copied ? "✓ Tersalin" : "🔗 Bagikan"}
    </button>
  );
}