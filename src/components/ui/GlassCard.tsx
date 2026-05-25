import { cn } from "@/utils";

export default function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `
        rounded-[32px]
        border
        backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(240,65,90,0.10)]
      `,
        className
      )}
      style={{
        background: "rgba(255,255,255,0.68)",
        borderColor: "rgba(255,255,255,0.9)",
      }}
    >
      {children}
    </div>
  );
}