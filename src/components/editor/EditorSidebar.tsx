"use client";

import { useEditorStore } from "@/store/editorStore";
import type { SceneConfig } from "@/templates/_base/types";

const sceneIcon: Record<string, string> = {
  opening: "✦", gallery: "◈", message: "✉", closing: "♡",
  timeline: "⊙", quote: "❝", countdown: "◷",
};

export default function EditorSidebar({ scenes }: { scenes: SceneConfig[] }) {
  const { currentSceneIndex, setCurrentScene } = useEditorStore();

  return (
    <div className="hidden md:flex flex-col w-16 lg:w-20 flex-shrink-0 border-r py-4 gap-1 items-center"
      style={{ borderColor: "rgba(240,65,90,0.08)", background: "rgba(255,252,248,0.98)" }}>
      {scenes.map((scene, i) => (
        <button key={scene.id} onClick={() => setCurrentScene(i)}
          title={scene.label}
          className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 group"
          style={{
            background: i === currentSceneIndex ? "rgba(240,65,90,0.09)" : "transparent",
            border: i === currentSceneIndex ? "1px solid rgba(240,65,90,0.18)" : "1px solid transparent",
          }}>
          <span className="text-base leading-none"
            style={{ color: i === currentSceneIndex ? "var(--color-primary)" : "var(--color-muted)" }}>
            {sceneIcon[scene.type] ?? "○"}
          </span>
          <span className="text-[9px] leading-none hidden lg:block"
            style={{ color: i === currentSceneIndex ? "var(--color-primary)" : "var(--color-muted)" }}>
            {scene.label.split(" ")[0]}
          </span>
        </button>
      ))}
    </div>
  );
}