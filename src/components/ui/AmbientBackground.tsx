export default function AmbientBackground() {
  const petals = [
    { left: "8%",  delay: "0s",   dur: "12s", size: 10 },
    { left: "20%", delay: "2s",   dur: "14s", size: 8  },
    { left: "35%", delay: "5s",   dur: "11s", size: 12 },
    { left: "55%", delay: "1s",   dur: "15s", size: 9  },
    { left: "70%", delay: "3.5s", dur: "13s", size: 7  },
    { left: "85%", delay: "6s",   dur: "10s", size: 11 },
    { left: "92%", delay: "4s",   dur: "16s", size: 8  },
  ];

  const sparkles = [
    { top: "15%", left: "10%", delay: "0s",   dur: "2.5s" },
    { top: "30%", left: "88%", delay: "0.8s", dur: "3s"   },
    { top: "60%", left: "5%",  delay: "1.5s", dur: "2s"   },
    { top: "75%", left: "75%", delay: "0.3s", dur: "3.5s" },
    { top: "20%", left: "50%", delay: "2s",   dur: "2.8s" },
    { top: "85%", left: "40%", delay: "1.2s", dur: "2.2s" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
      {/* Soft gradient orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30 animate-pulse-soft"
        style={{ background: "radial-gradient(circle, #ffc9d3 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full opacity-25 animate-pulse-soft delay-500"
        style={{ background: "radial-gradient(circle, #ddd0ff 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-64 rounded-full opacity-20 animate-pulse-soft delay-300"
        style={{ background: "radial-gradient(circle, #ffd6c2 0%, transparent 70%)", filter: "blur(50px)" }} />

      {/* Falling petals */}
      {petals.map((p, i) => (
        <div key={i}
          className="absolute top-0 opacity-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `petalFall ${p.dur} linear ${p.delay} infinite`,
          }}>
          <svg viewBox="0 0 12 12" fill="none">
            <ellipse cx="6" cy="6" rx="5" ry="3" fill="#f7a8b8" fillOpacity="0.6"
              transform={`rotate(${i * 30})`} />
          </svg>
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <div key={i}
          className="absolute animate-twinkle"
          style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: s.dur }}>
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5Z"
              fill="#f0415a" fillOpacity="0.35" />
          </svg>
        </div>
      ))}
    </div>
  );
}