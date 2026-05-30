"use client";
import type { AmbientType } from "@/types";

const COUNTS: Record<AmbientType, number> = {
  petals: 12, snow: 18, hearts: 10, sparkles: 16, bubbles: 10, none: 0,
};

type ParticleStyle = {
  left: string; top?: string;
  animationDelay: string; animationDuration: string;
  fontSize?: string; opacity?: number; width?: string; height?: string;
};

function seededRandom(seed: number) {
  // Deterministic random agar tidak re-render berbeda tiap kali
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function AmbientLayer({ type, accentColor = "#f0415a" }: {
  type: AmbientType; accentColor?: string;
}) {
  if (type === "none") return null;

  const count = COUNTS[type];
  const particles: ParticleStyle[] = Array.from({ length: count }, (_, i) => ({
    left: `${seededRandom(i * 7) * 100}%`,
    animationDelay: `${seededRandom(i * 3) * 8}s`,
    animationDuration: `${6 + seededRandom(i * 5) * 8}s`,
    fontSize: `${10 + seededRandom(i * 11) * 14}px`,
    opacity: 0.3 + seededRandom(i * 13) * 0.4,
  }));

  const emoji: Record<AmbientType, string> = {
    petals: "🌸", snow: "❄️", hearts: "💕", sparkles: "✨", bubbles: "🫧", none: "",
  };

  const animClass: Record<AmbientType, string> = {
    petals: "ambient-fall", snow: "ambient-fall-slow", hearts: "ambient-float-up",
    sparkles: "ambient-twinkle-drift", bubbles: "ambient-rise", none: "",
  };

  return (
    <>
      <style>{`
        @keyframes ambientFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes ambientFallSlow {
          0%   { transform: translateY(-10px) translateX(0px);   opacity: 0; }
          10%  { opacity: 0.8; }
          50%  { transform: translateY(50vh) translateX(20px); }
          100% { transform: translateY(100vh) translateX(-10px); opacity: 0; }
        }
        @keyframes ambientFloatUp {
          0%   { transform: translateY(100vh) scale(0.8); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-20px) scale(1.1);  opacity: 0; }
        }
        @keyframes ambientTwinkleDrift {
          0%,100% { opacity: 0.2; transform: scale(1) translateY(0); }
          50%     { opacity: 0.9; transform: scale(1.4) translateY(-8px); }
        }
        @keyframes ambientRise {
          0%   { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20%  { opacity: 0.5; }
          80%  { opacity: 0.3; }
          100% { transform: translateY(-10vh) scale(1.2);  opacity: 0; }
        }
        .ambient-fall      { animation: ambientFall           linear infinite both; }
        .ambient-fall-slow { animation: ambientFallSlow       linear infinite both; }
        .ambient-float-up  { animation: ambientFloatUp        ease-in-out infinite both; }
        .ambient-twinkle-drift { animation: ambientTwinkleDrift ease-in-out infinite both; }
        .ambient-rise      { animation: ambientRise           ease-in-out infinite both; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden>
        {particles.map((p, i) => (
          <span key={i}
            className={`absolute select-none ${animClass[type]}`}
            style={{
              left: p.left,
              top: type === "hearts" || type === "bubbles" ? "100%" : "-10%",
              fontSize: p.fontSize,
              opacity: p.opacity,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}>
            {emoji[type]}
          </span>
        ))}
      </div>
    </>
  );
}