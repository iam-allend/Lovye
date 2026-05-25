export default function FloatingBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        inline-flex items-center
        px-4 py-2 rounded-full
        text-[11px] uppercase tracking-[0.2em]
        backdrop-blur-xl
      "
      style={{
        background: "rgba(255,255,255,0.65)",
        border: "1px solid rgba(240,65,90,0.10)",
        color: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  );
}