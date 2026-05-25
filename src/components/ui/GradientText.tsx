export default function GradientText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="gradient-text">
      {children}
    </span>
  );
}