import { dummyTemplates } from "@/constants/dummy-templates";

export default function FeaturedTemplates() {
  return (
    <section
      id="templates"
      className="px-4 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm text-[#b08898]">
            template pilihan
          </p>

          <h2
            className="
              mt-2
              text-4xl
              font-semibold
              tracking-tight
              text-[#2b1d27]
            "
          >
            floating cinematic cards.
          </h2>
        </div>

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >
          {dummyTemplates
            .slice(0, 4)
            .map((template, i) => (
              <div
                key={template.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-white/60
                  bg-white/55
                  p-4
                  shadow-[0_12px_40px_rgba(240,65,90,0.08)]
                  backdrop-blur-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-1
                "
              >
                <div
                  className="
                    aspect-[1.1]
                    overflow-hidden
                    rounded-[28px]
                    p-5
                  "
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg,#fff0f4,#f3eeff)"
                        : "linear-gradient(135deg,#fff8f4,#ffe4e9)",
                  }}
                >
                  <div className="flex justify-between">
                    <span
                      className="
                        rounded-full
                        bg-white/70
                        px-3
                        py-1
                        text-[11px]
                        font-medium
                        text-[#7a5565]
                      "
                    >
                      {template.category}
                    </span>

                    <span className="text-sm">
                      ✨
                    </span>
                  </div>

                  <div className="mt-10">
                    <h3
                      className="
                        max-w-[220px]
                        text-3xl
                        font-semibold
                        leading-tight
                        text-[#2b1d27]
                      "
                    >
                      {template.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#7a5565]">
                      immersive emotional
                      storytelling template.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-2">
                  <div>
                    <p className="text-sm font-medium text-[#32202b]">
                      Rp 25K
                    </p>

                    <p className="text-xs text-[#b08898]">
                      premium aesthetic
                    </p>
                  </div>

                  <button
                    className="
                      rounded-full
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-[1px]
                      glow-rose-1
                    "
                    style={{
                      background:
                        "var(--rose-400)",
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}