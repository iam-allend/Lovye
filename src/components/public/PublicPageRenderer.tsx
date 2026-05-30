"use client";
// PATH: src/components/public/PublicPageRenderer.tsx

import { useState, useEffect, useCallback, useRef } from "react";
import { getTemplate } from "@/templates/_base/registry";
import SceneTransition from "./SceneTransition";
import AmbientLayer from "./AmbientLayer";
import ShareButton from "./ShareButton";
import type { TemplateConfig, TransitionType, AmbientType, BackgroundConfig } from "@/types";
import type { PageCustomData } from "@/types/database";

type Props = {
  page: { id: string; title: string; slug: string };
  templateSlug: string;
  templateConfig: TemplateConfig;
  customData: PageCustomData;
  showWatermark: boolean;
  username: string;
};

export default function PublicPageRenderer({
  page, templateSlug, templateConfig, customData, showWatermark, username,
}: Props) {
  const entry = getTemplate(templateSlug);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isAnimating = useRef(false);

  const scenes = templateConfig.scenes;
  const totalScenes = scenes.length;

  // Resolve customization dari customData (user overrides) atau defaults
  const defaults = templateConfig.globalDefaults;
  const ambient = (customData["__global_ambientAnimation"] as AmbientType) ?? defaults?.ambientAnimation ?? "none";
  const accentColor = (customData["__global_accentColor"] as string) ?? defaults?.accentColor ?? "#f0415a";
  const fontStyle = (customData["__global_fontStyle"] as string) ?? defaults?.fontStyle ?? "serif";
  const bgConfig: BackgroundConfig = (customData["__global_background"] as BackgroundConfig) ?? defaults?.background ?? { type: "gradient", value: "linear-gradient(160deg,#fff5f7,#fffcf8)" };

  const currentScene = scenes[currentIdx];
  const globalTransition: TransitionType = templateConfig.transition ?? templateConfig.transitionType ?? "fade";
  const sceneTransition: TransitionType = currentScene?.transition ?? globalTransition;

  // Navigate
  const goTo = useCallback((idx: number, dir: 1 | -1 = 1) => {
    if (isAnimating.current || idx < 0 || idx >= totalScenes) return;
    isAnimating.current = true;
    setDirection(dir);
    setCurrentIdx(idx);
    setTimeout(() => { isAnimating.current = false; }, 600);
  }, [totalScenes]);

  const goNext = useCallback(() => goTo(currentIdx + 1, 1),  [currentIdx, goTo]);
  const goPrev = useCallback(() => goTo(currentIdx - 1, -1), [currentIdx, goTo]);

  // Auto-play untuk mode "auto"
  useEffect(() => {
    if (autoTimer.current) {
      clearTimeout(autoTimer.current);
    }

    const scene = scenes[currentIdx];

    if (
      scene?.navigationMode === "auto" &&
      currentIdx < totalScenes - 1
    ) {
      const dur = scene.autoPlayDuration ?? 4000;

      autoTimer.current = setTimeout(() => {
        goNext();
      }, dur);

      return () => {
        if (autoTimer.current) {
          clearTimeout(autoTimer.current);
        }
      };
    }
  }, [currentIdx, scenes, totalScenes, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Touch/swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const scene = scenes[currentIdx];
    if (scene?.navigationMode === "button") return; // button mode: tidak swipe
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (Math.abs(dy) > Math.abs(dx)) {
      if (dy >  threshold) goNext();
      if (dy < -threshold) goPrev();
    }
  };

  if (!entry) return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ color: "var(--color-muted)" }}>Halaman tidak ditemukan.</p>
    </div>
  );

  const SceneComponent = entry.scenes[currentScene?.id];

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: bgConfig.type === "gradient" ? bgConfig.value : bgConfig.value,
        fontFamily: fontStyle === "script"
          ? "var(--font-script)"
          : fontStyle === "modern"
          ? "var(--font-body)"
          : "var(--font-display)",
        // CSS variable untuk accentColor — dipakai scenes
        ["--accent" as string]: accentColor,
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>

      {/* Ambient animation — fixed, berlaku semua scene */}
      <AmbientLayer type={ambient} accentColor={accentColor} />

      {/* Scene content */}
      <div className="relative z-20 w-full h-full">
        {SceneComponent && (
          <SceneTransition
            key={currentIdx}
            sceneKey={currentIdx}
            transition={sceneTransition}
            direction={direction}>
            <div className="w-full h-full overflow-y-auto">
              <SceneComponent
                data={customData}
                sceneId={currentScene.id}
                isPreview={false}
                showWatermark={showWatermark && currentScene.type === "closing"}
              />
            </div>
          </SceneTransition>
        )}
      </div>

      {/* Navigation UI */}
      <SceneNavigation
        scenes={scenes}
        currentIdx={currentIdx}
        onNext={goNext}
        onPrev={goPrev}
        onDot={(i) => goTo(i, i > currentIdx ? 1 : -1)}
        accentColor={accentColor}
      />

      {/* Share button */}
      <div className="fixed top-4 right-4 z-50">
        <ShareButton username={username} slug={page.slug} title={page.title} />
      </div>

      {/* Watermark */}
      {showWatermark && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50">
          <a href="https://lovye.site" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(240,65,90,0.15)", color: accentColor,
              boxShadow: "0 4px 16px rgba(240,65,90,0.10)",
            }}>
            💗 Dibuat dengan Lovye
          </a>
        </div>
      )}
    </div>
  );
}

// ── Scene Navigation ──────────────────────────────────────

function SceneNavigation({ scenes, currentIdx, onNext, onPrev, onDot, accentColor }: {
  scenes: TemplateConfig["scenes"];
  currentIdx: number; onNext: () => void; onPrev: () => void;
  onDot: (i: number) => void; accentColor: string;
}) {
  const currentScene = scenes[currentIdx];
  const navMode = currentScene?.navigationMode ?? "button";
  const isLast  = currentIdx === scenes.length - 1;
  const isFirst = currentIdx === 0;

  return (
    <>
      {/* Progress dots — selalu tampil */}
      {scenes.length > 1 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {scenes.map((_, i) => (
            <button key={i} onClick={() => onDot(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentIdx ? 20 : 6,
                height: 6,
                background: i === currentIdx ? accentColor : `${accentColor}40`,
              }} />
          ))}
        </div>
      )}

      {/* Button mode: tombol next/prev eksplisit */}
      {navMode === "button" && (
        <>
          {!isLast && (
            <button onClick={onNext}
              className="fixed bottom-14 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: accentColor, boxShadow: `0 8px 24px ${accentColor}40` }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M10 16l-4-4M10 16l4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
          {!isFirst && (
            <button onClick={onPrev}
              className="fixed bottom-14 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", border: `1px solid ${accentColor}30`, color: accentColor }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12V4M8 4l-3 3M8 4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </>
      )}

      {/* Auto mode: progress bar */}
      {navMode === "auto" && (
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5"
          style={{ background: `${accentColor}20` }}>
          <div className="h-full animate-[progressBar_var(--dur)_linear_forwards]"
            style={{
              background: accentColor,
              ["--dur" as string]: `${(scenes[currentIdx]?.autoPlayDuration ?? 4000)}ms`,
            }} />
        </div>
      )}
    </>
  );
}