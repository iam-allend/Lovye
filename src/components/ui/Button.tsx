import Link from "next/link";
import { cn } from "@/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "rose" | "lavender" | "ghost";
};

export default function Button({
  href,
  children,
  className,
  variant = "rose",
}: Props) {
  const Comp = href ? Link : "button";

  const variants = {
    rose: `
      bg-[var(--rose-400)]
      text-white
      glow-rose-1
      hover:opacity-90
    `,
    lavender: `
      bg-[var(--lavender-400)]
      text-white
      glow-lavender-1
      hover:opacity-90
    `,
    ghost: `
      bg-white/60
      backdrop-blur-xl
      border border-white/70
      text-[var(--color-text)]
    `,
  };

  return (
    <Comp
      href={href as string}
      className={cn(
        `
        inline-flex items-center justify-center
        px-5 py-3
        rounded-2xl
        text-sm font-medium
        transition-all duration-300
        hover:-translate-y-0.5
      `,
        variants[variant],
        className
      )}
    >
      {children}
    </Comp>
  );
}