import GradientText from "./GradientText";

export default function SectionTitle({
  title,
  gradient,
  description,
}: {
  title: string;
  gradient?: string;
  description?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <h2
        className="text-5xl leading-tight font-light"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-text)",
        }}
      >
        {title}{" "}
        {gradient && (
          <GradientText>
            {gradient}
          </GradientText>
        )}
      </h2>

      {description && (
        <p
          className="mt-5 text-lg leading-relaxed"
          style={{
            color: "var(--color-text-2)",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}