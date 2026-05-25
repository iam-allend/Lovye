import { cn } from "@/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-5xl mx-auto px-5 md:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}