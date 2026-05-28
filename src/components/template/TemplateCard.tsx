"use client";

import { CATEGORY_STYLE } from "@/types/template-display";
import type { TemplateRow } from "@/types/template-display";

type Props = {
  template: TemplateRow;
  owned: boolean;
  loading?: boolean;
  index?: number;
  // Mode: "preview" = landing page (tombol Preview → /register)
  //       "use"     = dashboard (tombol Gunakan/Unlock → action)
  mode: "preview" | "use";
  onUse?: () => void;
};

export default function TemplateCard({ template, owned, loading, index = 0, mode, onUse }: Props) {
  const s = CATEGORY_STYLE[template.category] ?? CATEGORY_STYLE.other;
  const isAvailable = template.is_free || owned;

  return (
    <div
      className="group relative overflow-hidden rounded-[34px] border border-white/60 bg-white/55 p-4
        shadow-[0_12px_40px_rgba(240,65,90,0.07)] backdrop-blur-2xl
        transition-all duration-500 hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}>

      {/* Lock badge — hanya di mode use dan belum owned */}
      {mode === "use" && !isAvailable && (
        <div className="absolute top-6 right-6 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs"
          style={{ background: "rgba(196,174,255,0.30)", border: "1px solid rgba(196,174,255,0.50)" }}>
          🔒
        </div>
      )}

      {/* Visual area */}
      <div className="aspect-[1.1] overflow-hidden rounded-[28px] p-5" style={{ background: s.gradient }}>
        <div className="flex justify-between items-start">
          <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium"
            style={{ color: "var(--color-text-2)" }}>
            {template.category}
          </span>
          <span className="text-sm">{s.emoji}</span>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-semibold leading-tight max-w-[220px]"
            style={{ color: "#2b1d27", fontFamily: "var(--font-display)" }}>
            {template.name}
          </h3>
          <p className="mt-3 text-sm leading-6" style={{ color: "var(--color-text-2)" }}>
            immersive emotional storytelling template.
          </p>
        </div>

        {/* Decorative color dots */}
        <div className="mt-6 flex gap-2">
          <div className="h-4 w-4 rounded-full bg-white/60" />
          <div className="h-4 w-4 rounded-full bg-white/40" />
          <div className="h-4 w-4 rounded-full bg-white/25" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between px-2">
        <div>
          <p className="text-sm font-medium" style={{ color: "#32202b" }}>
            {template.is_free ? "Gratis" : `Rp ${(template.price / 1000).toFixed(0)}K`}
          </p>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            {template.is_free
              ? "free template"
              : owned
              ? "✓ Sudah dimiliki"
              : "premium"}
          </p>
        </div>

        {mode === "preview" ? (
          <a href="/register"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[1px] glow-rose-1"
            style={{ background: "var(--rose-400)" }}>
            Preview
          </a>
        ) : (
          <button
            onClick={onUse}
            disabled={loading || !isAvailable}
            className="rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[1px] disabled:opacity-60"
            style={{
              background: isAvailable ? "var(--rose-400)" : "var(--lavender-400)",
              boxShadow: isAvailable ? "0 4px 14px rgba(240,65,90,0.22)" : "none",
            }}>
            {loading ? "..." : isAvailable ? "Gunakan" : "Unlock"}
          </button>
        )}
      </div>
    </div>
  );
}