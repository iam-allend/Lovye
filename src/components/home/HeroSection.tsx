import Link from "next/link";
import {
  Sparkles,
  Heart,
  Play,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-4
        pt-36
        pb-24
      "
    >
      <div className="mx-auto max-w-5xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[42px]
            border
            border-white/60
            bg-white/55
            p-5
            shadow-[0_20px_80px_rgba(240,65,90,0.08)]
            backdrop-blur-2xl
            md:p-8
          "
        >
          {/* glow */}
          <div
            className="
              absolute
              -top-20
              right-0
              h-72
              w-72
              rounded-full
              blur-3xl
            "
            style={{
              background:
                "rgba(240,65,90,0.12)",
            }}
          />

          <div
            className="
              grid
              gap-8
              lg:grid-cols-[1.1fr_0.9fr]
            "
          >
            {/* left */}
            <div className="relative z-10">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/70
                  bg-white/60
                  px-4
                  py-2
                  text-xs
                  font-medium
                  shadow-soft
                "
              >
                <Sparkles
                  size={14}
                  className="text-[var(--rose-400)]"
                />

                <span
                  style={{
                    color:
                      "var(--color-text-2)",
                  }}
                >
                  cinematic emotional experience
                </span>
              </div>

              <h1
                className="
                  mt-6
                  max-w-xl
                  text-5xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-[#2b1d27]
                  md:text-6xl
                "
              >
                Bikin ucapan jadi{" "}
                <span className="gradient-text">
                  memorable
                </span>{" "}
                dan aesthetic.
              </h1>

              <p
                className="
                  mt-5
                  max-w-lg
                  text-[15px]
                  leading-7
                "
                style={{
                  color:
                    "var(--color-text-2)",
                }}
              >
                dari ulang tahun, confess,
                anniversary sampai long
                message — semua bisa jadi
                halaman digital yang immersive
                dan personal.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    px-6
                    py-3.5
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-[2px]
                    glow-rose-1
                  "
                  style={{
                    background:
                      "var(--rose-400)",
                  }}
                >
                  <Heart
                    size={16}
                    fill="currentColor"
                  />
                  Mulai Gratis
                </Link>

                <a
                  href="#templates"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/80
                    bg-white/65
                    px-5
                    py-3.5
                    text-sm
                    font-medium
                    text-[#5f4b55]
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-[2px]
                  "
                >
                  <Play size={15} />
                  Preview Template
                </a>
              </div>

              {/* mini stats */}
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  "100+ aesthetic template",
                  "mobile optimized",
                  "custom music",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      rounded-full
                      border
                      border-white/70
                      bg-white/55
                      px-4
                      py-2
                      text-xs
                      text-[#7a5565]
                      shadow-soft
                      backdrop-blur-xl
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* right */}
            <div className="relative">
              <div
                className="
                  relative
                  mx-auto
                  w-full
                  max-w-[320px]
                  rounded-[38px]
                  border
                  border-white/60
                  bg-[#fff]
                  p-3
                  shadow-[0_20px_50px_rgba(240,65,90,0.12)]
                "
              >
                <div
                  className="
                    overflow-hidden
                    rounded-[30px]
                    p-4
                  "
                  style={{
                    background:
                      "linear-gradient(180deg,#fff5f7 0%,#fff 50%,#f8f5ff 100%)",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff9db0]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd6c2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#c4aeff]" />
                  </div>

                  <div className="mt-5 rounded-3xl bg-white/80 p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span
                        className="
                          rounded-full
                          bg-[rgba(240,65,90,0.10)]
                          px-3
                          py-1
                          text-[11px]
                          font-medium
                          text-[var(--rose-400)]
                        "
                      >
                        anniversary
                      </span>

                      <span className="text-xs text-[#b08898]">
                        12 photos
                      </span>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs text-[#b08898]">
                        message
                      </p>

                      <h3
                        className="
                          mt-2
                          text-2xl
                          font-semibold
                          leading-tight
                          text-[#32202b]
                        "
                      >
                        “makasih udah bertahan
                        sejauh ini ❤️”
                      </h3>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="aspect-[0.8] rounded-2xl bg-[#ffe4e9]" />
                      <div className="aspect-[0.8] rounded-2xl bg-[#f3eeff]" />
                      <div className="aspect-[0.8] rounded-2xl bg-[#fff0f4]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* floating */}
              <div
                className="
                  absolute
                  -left-6
                  top-8
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/70
                  px-4
                  py-3
                  shadow-soft
                  backdrop-blur-xl
                  animate-float
                "
              >
                <p className="text-xs text-[#b08898]">
                  engagement
                </p>

                <p className="mt-1 text-sm font-semibold text-[#32202b]">
                  +240% lebih personal
                </p>
              </div>

              <div
                className="
                  absolute
                  -right-2
                  bottom-10
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/70
                  px-4
                  py-3
                  shadow-soft
                  backdrop-blur-xl
                  animate-float-x
                "
              >
                <p className="text-xs text-[#b08898]">
                  aesthetic score
                </p>

                <p className="mt-1 text-sm font-semibold text-[#32202b]">
                  cinematic ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}