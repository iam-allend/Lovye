import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div
          className="
            overflow-hidden
            rounded-[40px]
            border
            border-white/60
            bg-white/60
            px-8
            py-14
            text-center
            shadow-[0_20px_60px_rgba(240,65,90,0.08)]
            backdrop-blur-2xl
          "
        >
          <p className="text-sm text-[#b08898]">
            ready to create?
          </p>

          <h2
            className="
              mx-auto
              mt-3
              max-w-xl
              text-4xl
              font-semibold
              leading-tight
              tracking-tight
              text-[#2b1d27]
            "
          >
            bikin seseorang merasa spesial.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#7a5565]">
            mulai gratis, pilih template,
            custom isi pesanmu dan bagikan
            dalam hitungan menit.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/register"
              className="
                rounded-full
                px-6
                py-3.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-[1px]
                glow-lavender-1
              "
              style={{
                background:
                  "var(--lavender-400)",
              }}
            >
              Buat Halaman Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}