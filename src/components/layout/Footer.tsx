export default function Footer() {
  return (
    <footer className="px-4 pb-10">
      <div
        className="
          mx-auto
          flex
          max-w-5xl
          flex-col
          items-center
          justify-between
          gap-4
          rounded-[32px]
          border
          border-white/60
          bg-white/55
          px-6
          py-5
          text-sm
          backdrop-blur-2xl
          md:flex-row
        "
      >
        <div>
          <p className="font-semibold text-[#32202b]">
            lovye
          </p>

          <p className="mt-1 text-xs text-[#b08898]">
            digital emotional greeting
          </p>
        </div>

        <p className="text-xs text-[#b08898]">
          crafted with aesthetic &
          emotions ✨
        </p>
      </div>
    </footer>
  );
}