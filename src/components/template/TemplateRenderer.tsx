"use client";

import { useEffect, useRef, useState } from "react";
import { getTemplate } from "@/templates/_base/registry";
import type { PageCustomData } from "@/types/database";

type Props = {
  templateSlug: string;
  customData: PageCustomData;
  isPreview?: boolean;
  showWatermark?: boolean;
};

export default function TemplateRenderer({ templateSlug, customData, isPreview, showWatermark }: Props) {
  const entry = getTemplate(templateSlug);
  const [activeScene, setActiveScene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preview mode: scroll antar scene via intersection observer
  useEffect(() => {
    if (isPreview) return;
    const sections = containerRef.current?.querySelectorAll("section");
    if (!sections) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) {
        const idx = Array.from(sections).indexOf(e.target as HTMLElement);
        if (idx !== -1) setActiveScene(idx);
      }}),
      { threshold: 0.5 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isPreview]);

  if (!entry) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg)" }}>
      <p style={{ color: "var(--color-muted)" }}>Template tidak ditemukan.</p>
    </div>
  );

  const { config, scenes } = entry;

  return (
    <div ref={containerRef} className="relative">
      {/* Scene progress dots (hanya di public page, bukan preview) */}
      {!isPreview && config.scenes.length > 1 && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {config.scenes.map((_, i) => (
            <button key={i}
              onClick={() => containerRef.current?.querySelectorAll("section")[i]?.scrollIntoView({ behavior: "smooth" })}
              className="w-1.5 rounded-full transition-all duration-300"
              style={{
                height: i === activeScene ? 24 : 8,
                background: i === activeScene ? "var(--color-primary)" : "rgba(240,65,90,0.20)",
              }} />
          ))}
        </div>
      )}

      {config.scenes.map((scene) => {
        const SceneComponent = scenes[scene.id];
        if (!SceneComponent) return null;
        return (
          <SceneComponent
            key={scene.id}
            sceneId={scene.id}
            data={customData}
            isPreview={isPreview}
            showWatermark={showWatermark && scene.type === "closing"}
          />
        );
      })}
    </div>
  );
}