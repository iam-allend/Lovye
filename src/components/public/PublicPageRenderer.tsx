"use client";
// PATH: src/components/public/PublicPageRenderer.tsx
// Render halaman publik dengan scene transitions

import { useState, useEffect, useRef } from "react";
import { getTemplate } from "@/templates/_base/registry";
import type { TemplateConfig } from "@/types";
import type { PageCustomData } from "@/types/database";
import ShareButton from "./ShareButton";

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
  const [activeScene, setActiveScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer untuk update active scene saat scroll
  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll("[data-scene]");
    if (!sections) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.scene);
            setActiveScene(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Smooth scroll ke scene
  const scrollToScene = (idx: number) => {
    const sections = containerRef.current?.querySelectorAll("[data-scene]");
    if (!sections?.[idx]) return;
    setIsTransitioning(true);
    sections[idx].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setIsTransitioning(false), 600);
  };

  if (!entry) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-bg)" }}>
      <p style={{ color: "var(--color-muted)" }}>Halaman tidak ditemukan.</p>
    </div>
  );

  return (
    <div className="relative" style={{ background: "var(--color-bg)" }}>
      {/* Scene progress indicator — kanan tengah */}
      {templateConfig.scenes.length > 1 && (
        <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {templateConfig.scenes.map((_, i) => (
            <button key={i} onClick={() => scrollToScene(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: 6,
                height: i === activeScene ? 24 : 6,
                background: i === activeScene
                  ? "var(--rose-400)"
                  : "rgba(240,65,90,0.25)",
              }} />
          ))}
        </div>
      )}

      {/* Share button — fixed top right */}
      <div className="fixed top-4 right-12 z-50">
        <ShareButton username={username} slug={page.slug} title={page.title} />
      </div>

      {/* Scenes */}
      <div ref={containerRef}>
        {templateConfig.scenes.map((scene, i) => {
          const SceneComponent = entry.scenes[scene.id];
          if (!SceneComponent) return null;
          return (
            <div
              key={scene.id}
              data-scene={i}
              className="scene-fade-in"
              style={{
                opacity: isTransitioning ? 0.85 : 1,
                transition: "opacity 0.3s ease",
              }}>
              <SceneComponent
                data={customData}
                sceneId={scene.id}
                isPreview={false}
                showWatermark={showWatermark && scene.type === "closing"}
              />
            </div>
          );
        })}
      </div>

      {/* Watermark global — hanya jika template gratis */}
      {showWatermark && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <a href="https://lovye.vercel.app" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(240,65,90,0.15)",
              color: "var(--color-primary)",
              boxShadow: "0 4px 16px rgba(240,65,90,0.10)",
            }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M5 9C5 9 1 6.3 1 3.8C1 2.3 2.1 1 3.5 1C4.2 1 4.8 1.4 5 2C5.2 1.4 5.8 1 6.5 1C7.9 1 9 2.3 9 3.8C9 6.3 5 9 5 9Z"/>
            </svg>
            Dibuat dengan Lovye
          </a>
        </div>
      )}
    </div>
  );
}