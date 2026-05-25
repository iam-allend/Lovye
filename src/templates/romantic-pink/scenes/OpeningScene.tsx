import type { SceneProps } from "@/templates/_base/types";
import { getField } from "@/templates/_base/types";

export function OpeningScene({ data, sceneId, isPreview }: SceneProps) {
  const title    = getField(data, sceneId, "title",    "Happy Anniversary");
  const subtitle = getField(data, sceneId, "subtitle", "untuk kamu yang selalu ada");
  const date     = getField(data, sceneId, "date",     "");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff5f7 0%, #fffcf8 50%, #f8f5ff 100%)" }}>

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #ffc9d3, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #ddd0ff, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {/* Floating petals — lightweight SVG */}
      {[20, 50, 75].map((left, i) => (
        <div key={i} className="pointer-events-none absolute top-0 animate-float opacity-30"
          style={{ left: `${left}%`, animationDelay: `${i * 1.5}s`, animationDuration: `${6 + i}s` }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <ellipse cx="7" cy="7" rx="6" ry="3.5" fill="#f7a8b8" transform={`rotate(${i * 40})`} />
          </svg>
        </div>
      ))}

      <div className="relative z-10 text-center max-w-sm mx-auto">
        {/* Script date pill */}
        {date && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs tracking-widest uppercase"
            style={{ background: "rgba(240,65,90,0.07)", color: "var(--color-primary)", border: "1px solid rgba(240,65,90,0.15)" }}>
            💗 {new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        )}

        {/* Main title */}
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          className="text-5xl sm:text-6xl font-light leading-tight mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-base sm:text-lg font-light" style={{ color: "var(--color-text-2)" }}>
            {subtitle}
          </p>
        )}

        {/* Scroll cue */}
        {!isPreview && (
          <div className="mt-16 flex flex-col items-center gap-2 animate-float" style={{ animationDuration: "3s" }}>
            <p className="text-xs tracking-widest uppercase" style={{ color: "var(--color-muted)" }}>scroll</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M10 16l-4-4M10 16l4-4" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}