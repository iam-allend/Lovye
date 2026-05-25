import type { SceneProps } from "@/templates/_base/types";
import { getField } from "@/templates/_base/types";

export function MessageScene({ data, sceneId }: SceneProps) {
  const body = getField(data, sceneId, "body", "Tulis pesanmu di sini...");
  const from = getField(data, sceneId, "from", "");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fffcf8 0%, #fff5f7 100%)" }}>

      {/* Decorative quote mark */}
      <div className="absolute top-16 left-6 opacity-10 select-none pointer-events-none"
        style={{ fontFamily: "var(--font-display)", fontSize: "120px", lineHeight: 1, color: "var(--color-primary)" }}>
        “
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase mb-10"
          style={{ color: "var(--color-muted)" }}>pesan untukmu</p>

        {/* Message card */}
        <div className="rounded-3xl p-8 relative"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.92)",
            boxShadow: "0 8px 40px rgba(240,65,90,0.08)",
          }}>
          {/* Left accent bar */}
          <div className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full"
            style={{ background: "linear-gradient(180deg, transparent, var(--rose-300), transparent)" }} />

          <p className="text-base leading-relaxed font-light whitespace-pre-wrap pl-4"
            style={{ color: "var(--color-text)", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
            {body}
          </p>

          {from && (
            <p className="mt-6 text-right text-sm italic pl-4"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}>
              — {from}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}