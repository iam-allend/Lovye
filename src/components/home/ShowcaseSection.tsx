export default function ShowcaseSection() {
  return (
    <section
      id="showcase"
      className="px-4 py-10"
    >
      <div className="mx-auto max-w-5xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/60
            bg-white/55
            p-7
            shadow-[0_20px_60px_rgba(240,65,90,0.08)]
            backdrop-blur-2xl
          "
        >
          <div
            className="
              absolute
              right-0
              top-0
              h-72
              w-72
              rounded-full
              blur-3xl
            "
            style={{
              background:
                "rgba(196,174,255,0.18)",
            }}
          />

          <div className="relative z-10">
            <p className="text-sm text-[#b08898]">
              showcase visual
            </p>

            <h2
              className="
                mt-2
                max-w-lg
                text-4xl
                font-semibold
                leading-tight
                tracking-tight
                text-[#2b1d27]
              "
            >
              bukan cuma ucapan biasa.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="
                      rounded-[28px]
                      border
                      border-white/60
                      bg-white/65
                      p-4
                      shadow-soft
                    "
                  >
                    <div
                      className="
                        aspect-[0.75]
                        rounded-[22px]
                      "
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(180deg,#ffe4e9,#fff)"
                            : i === 1
                            ? "linear-gradient(180deg,#f3eeff,#fff)"
                            : "linear-gradient(180deg,#fff0f4,#fff)",
                      }}
                    />

                    <div className="mt-4">
                      <p className="text-sm font-medium text-[#32202b]">
                        Cinematic Flow
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#7a5565]">
                        smooth storytelling with
                        immersive animation.
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}