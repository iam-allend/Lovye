"use client";
// PATH: src/components/editor/CustomizationPanel.tsx
// Panel kustomisasi global template (ambient, warna, font, musik, background)

import { useEditorStore } from "@/store/editorStore";
import { MUSIC_PRESETS } from "@/lib/music-presets";
import type {
  TemplateConfig, AmbientType, FontStyle,
  BackgroundConfig, TemplateCustomizationOptions,
} from "@/types";
import type { Json } from "@/types/database";

const DEFAULT_OPTIONS: TemplateCustomizationOptions = {
  ambientAnimations: ["none", "petals", "hearts", "sparkles", "snow", "bubbles"],
  backgrounds: [
    { type: "gradient", value: "linear-gradient(160deg,#fff5f7,#fffcf8)" },
    { type: "gradient", value: "linear-gradient(160deg,#f8f5ff,#fff5f7)" },
    { type: "gradient", value: "linear-gradient(160deg,#fffdf7,#f8f5ff)" },
    { type: "solid", value: "#fffcf8" },
    { type: "solid", value: "#fdf6ff" },
  ],
  accentColors: ["#f0415a", "#c4aeff", "#f9906a", "#ffb8cb", "#a87fff", "#ff7eb3"],
  fontStyles: ["serif", "script", "modern"],
  musics: MUSIC_PRESETS.map((m) => m.id),
};

const AMBIENT_LABELS: Record<AmbientType, string> = {
  none: "Tanpa animasi", petals: "🌸 Kelopak",
  snow: "❄️ Salju", hearts: "💕 Hati",
  sparkles: "✨ Bintang", bubbles: "🫧 Gelembung",
};

const FONT_LABELS: Record<FontStyle, string> = {
  serif: "Elegan", script: "Kursif", modern: "Modern",
};

export default function CustomizationPanel({ templateConfig }: { templateConfig: TemplateConfig }) {
  const { customData, updateField } = useEditorStore();
  const opts = templateConfig.customizableOptions ?? DEFAULT_OPTIONS;
  const defaults = templateConfig.globalDefaults;

  const get = (key: string, fallback: unknown) => customData[`__global_${key.replace("__","")}`] ?? fallback;
  const set = (key: string, val: Json) => updateField("__global", key.replace("__", ""), val);

  const currentAmbient = get("__ambientAnimation", defaults?.ambientAnimation ?? "none") as AmbientType;
  const currentColor   = get("__accentColor", defaults?.accentColor ?? "#f0415a") as string;
  const currentFont    = get("__fontStyle", defaults?.fontStyle ?? "serif") as FontStyle;
  const currentMusic   = get("__music", defaults?.music ?? "") as string;
  const currentBg      = get("__background", defaults?.background ?? opts.backgrounds[0]) as BackgroundConfig;

  return (
    <div className="p-5 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b" style={{ borderColor: "rgba(240,65,90,0.08)" }}>
        <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--color-muted)" }}>
          kustomisasi
        </p>
        <h3 className="text-lg font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
          Gaya Template
        </h3>
        <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          Berlaku di semua scene
        </p>
      </div>

      {/* Ambient Animation */}
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-2)" }}>Animasi Latar</p>
        <div className="grid grid-cols-2 gap-1.5">
          {opts.ambientAnimations.map((a) => (
            <button key={a} onClick={() => set("__ambientAnimation", a)}
              className="px-3 py-2 rounded-xl text-xs text-left transition-all"
              style={{
                background: currentAmbient === a ? "rgba(240,65,90,0.09)" : "rgba(255,255,255,0.5)",
                border: `1px solid ${currentAmbient === a ? "rgba(240,65,90,0.25)" : "rgba(240,65,90,0.10)"}`,
                color: currentAmbient === a ? "var(--color-primary)" : "var(--color-text-2)",
                fontWeight: currentAmbient === a ? 500 : 400,
              }}>
              {AMBIENT_LABELS[a]}
            </button>
          ))}
        </div>
      </div>

      {/* Background */}
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-2)" }}>Background</p>
        <div className="flex flex-wrap gap-2">
          {opts.backgrounds.map((bg, i) => {
            const isSelected = JSON.stringify(currentBg) === JSON.stringify(bg);
            return (
              <button key={i} onClick={() => set("__background", bg as unknown as Json)}
                className="w-10 h-10 rounded-xl transition-all"
                style={{
                  background: bg.type === "gradient" ? bg.value : bg.value,
                  border: isSelected ? "2.5px solid var(--color-primary)" : "2px solid rgba(240,65,90,0.12)",
                  boxShadow: isSelected ? "0 0 0 3px rgba(240,65,90,0.12)" : "none",
                  transform: isSelected ? "scale(1.1)" : "scale(1)",
                }} />
            );
          })}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-2)" }}>Warna Aksen</p>
        <div className="flex flex-wrap gap-2">
          {opts.accentColors.map((color) => (
            <button key={color} onClick={() => set("__accentColor", color)}
              className="w-8 h-8 rounded-full transition-all"
              style={{
                background: color,
                border: currentColor === color ? "2.5px solid #333" : "2px solid transparent",
                boxShadow: currentColor === color ? `0 0 0 3px ${color}40` : "none",
                transform: currentColor === color ? "scale(1.15)" : "scale(1)",
              }} />
          ))}
        </div>
      </div>

      {/* Font Style */}
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-2)" }}>Gaya Font</p>
        <div className="flex gap-2">
          {opts.fontStyles.map((f) => (
            <button key={f} onClick={() => set("__fontStyle", f)}
              className="flex-1 py-2 rounded-xl text-xs transition-all"
              style={{
                background: currentFont === f ? "rgba(240,65,90,0.09)" : "rgba(255,255,255,0.5)",
                border: `1px solid ${currentFont === f ? "rgba(240,65,90,0.25)" : "rgba(240,65,90,0.10)"}`,
                color: currentFont === f ? "var(--color-primary)" : "var(--color-text-2)",
                fontFamily: f === "script" ? "var(--font-script)" : f === "serif" ? "var(--font-display)" : "var(--font-body)",
                fontWeight: currentFont === f ? 600 : 400,
              }}>
              {FONT_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Music */}
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-2)" }}>Musik Latar</p>
        <div className="space-y-1.5">
          {MUSIC_PRESETS.filter((m) => opts.musics.includes(m.id)).map((m) => (
            <button key={m.id} onClick={() => set("__music", m.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
              style={{
                background: currentMusic === m.id ? "rgba(240,65,90,0.07)" : "rgba(255,255,255,0.5)",
                border: `1px solid ${currentMusic === m.id ? "rgba(240,65,90,0.25)" : "rgba(240,65,90,0.10)"}`,
                color: "var(--color-text)",
              }}>
              <span style={{ color: currentMusic === m.id ? "var(--color-primary)" : "var(--color-muted)" }}>
                {currentMusic === m.id ? "▶" : "○"}
              </span>
              <span>{m.label}</span>
              <span className="ml-auto text-xs" style={{ color: "var(--color-muted)" }}>{m.mood}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}