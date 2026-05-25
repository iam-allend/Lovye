export default function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* top blur */}
      <div
        className="
          absolute
          -top-32
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          opacity-50
          blur-3xl
          animate-pulse-soft
        "
        style={{
          background:
            "radial-gradient(circle, rgba(240,65,90,0.18), transparent 70%)",
        }}
      />

      {/* lavender */}
      <div
        className="
          absolute
          top-[18%]
          -left-24
          h-[320px]
          w-[320px]
          rounded-full
          opacity-40
          blur-3xl
          animate-float
        "
        style={{
          background:
            "radial-gradient(circle, rgba(196,174,255,0.22), transparent 70%)",
        }}
      />

      {/* peach */}
      <div
        className="
          absolute
          bottom-[10%]
          right-[-80px]
          h-[340px]
          w-[340px]
          rounded-full
          opacity-40
          blur-3xl
          animate-float-x
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,152,0.22), transparent 70%)",
        }}
      />

      {/* floating stars */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="
            absolute
            h-1.5
            w-1.5
            rounded-full
            bg-white
            animate-twinkle
          "
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.5,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}