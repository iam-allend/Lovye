import type { SceneProps } from "@/templates/_base/types";
import { getField } from "@/templates/_base/types";

export function ClosingScene({ data, sceneId, showWatermark }: SceneProps) {
  const closingText = getField(data, sceneId, "closing_text", "dengan sepenuh hati");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8f5ff 0%, #fff5f7 100%)" }}>

      {/* Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #ddd0ff, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #ffc9d3, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative z-10 text-center max-w-xs mx-auto">
        {/* Heart icon */}
        <div className="animate-float mb-8 inline-block" style={{ animationDuration: "4s" }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 42C24 42 6 30 6 17.5C6 11.7 10.7 7 16.5 7C19.7 7 22.6 8.5 24 11C25.4 8.5 28.3 7 31.5 7C37.3 7 42 11.7 42 17.5C42 30 24 42 24 42Z"
              fill="url(#heartGrad)" />
            <defs>
              <linearGradient id="heartGrad" x1="6" y1="7" x2="42" y2="42">
                <stop offset="0%" stopColor="#f7687e" />
                <stop offset="100%" stopColor="#c4aeff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Closing script text */}
        <p className="text-4xl font-light mb-3"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text)", fontStyle: "italic" }}>
          {closingText}
        </p>

        {/* Share prompt */}
        <p className="text-sm mt-8" style={{ color: "var(--color-muted)" }}>
          bagikan halaman ini kepada orang yang kamu sayangi 💌
        </p>
      </div>

      {/* Watermark */}
      {showWatermark && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <a href="https://lovye.site" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-opacity hover:opacity-70"
            style={{
              background: "rgba(240,65,90,0.06)",
              border: "1px solid rgba(240,65,90,0.15)",
              color: "var(--color-primary)",
            }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M5 9C5 9 1 6.3 1 3.8C1 2.3 2.1 1 3.5 1C4.2 1 4.8 1.4 5 2C5.2 1.4 5.8 1 6.5 1C7.9 1 9 2.3 9 3.8C9 6.3 5 9 5 9Z"/>
            </svg>
            Dibuat dengan Lovye
          </a>
        </div>
      )}
    </section>
  );
}