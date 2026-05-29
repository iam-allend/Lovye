"use client";
// PATH: src/components/editor/EditorPreview.tsx

import { useState } from "react";
import { useEditorStore, selectCurrentScene } from "@/store/editorStore";
import { getTemplate } from "@/templates/_base/registry";

type ViewMode = "scene" | "full";

export default function EditorPreview({ templateSlug }: { templateSlug: string }) {
  const store = useEditorStore();
  const { customData, currentSceneIndex, templateConfig, setCurrentScene } = store;
  const currentScene = selectCurrentScene({ customData, currentSceneIndex, templateConfig } as Parameters<typeof selectCurrentScene>[0]);
  const entry = getTemplate(templateSlug);
  const [viewMode, setViewMode] = useState<ViewMode>("scene");

  if (!entry || !currentScene) return (
    <div className="flex-1 flex items-center justify-center h-full">
      <p style={{ color: "var(--color-muted)" }} className="text-sm">Pilih scene untuk preview</p>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
        style={{ borderColor: "rgba(240,65,90,0.08)", background: "rgba(255,252,248,0.90)" }}>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          {viewMode === "scene" ? `Scene: ${currentScene.label}` : "Full Preview"}
        </p>
        <div className="flex gap-1 rounded-xl p-0.5" style={{ background: "rgba(240,65,90,0.06)" }}>
          {(["scene", "full"] as ViewMode[]).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className="px-3 py-1 rounded-lg text-xs transition-all"
              style={{
                background: viewMode === mode ? "white" : "transparent",
                color: viewMode === mode ? "var(--color-primary)" : "var(--color-muted)",
                fontWeight: viewMode === mode ? 500 : 400,
                boxShadow: viewMode === mode ? "0 1px 4px rgba(240,65,90,0.10)" : "none",
              }}>
              {mode === "scene" ? "Scene" : "Full ▶"}
            </button>
          ))}
        </div>
      </div>

      {/* Preview frame */}
      <div className="flex-1 flex items-start justify-center py-6 px-4 overflow-auto"
        style={{ background: "#f5f0f7" }}>
        <div className="relative w-full max-w-sm flex-shrink-0"
          style={{
            borderRadius: 28, overflow: "hidden",
            boxShadow: "0 16px 60px rgba(180,80,100,0.14), 0 2px 8px rgba(180,80,100,0.08)",
            border: "1px solid rgba(240,65,90,0.12)",
          }}>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-24 h-5 rounded-b-2xl"
            style={{ background: "rgba(255,252,248,0.95)" }} />

          <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
            {viewMode === "scene" ? (
              (() => {
                const SceneComponent = entry.scenes[currentScene.id];
                if (!SceneComponent) return null;
                return <SceneComponent data={customData} sceneId={currentScene.id} isPreview showWatermark={false} />;
              })()
            ) : (
              templateConfig.scenes.map((scene) => {
                const SceneComponent = entry.scenes[scene.id];
                if (!SceneComponent) return null;
                return (
                  <div key={scene.id}>
                    <SceneComponent data={customData} sceneId={scene.id} isPreview showWatermark={false} />
                    <div className="flex items-center px-4 py-1.5"
                      style={{ background: "rgba(240,65,90,0.04)", borderTop: "1px solid rgba(240,65,90,0.08)" }}>
                      <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
                        {scene.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Scene dots nav — hanya di mode scene */}
      {viewMode === "scene" && templateConfig.scenes.length > 1 && (
        <div className="flex justify-center gap-2 py-3 flex-shrink-0"
          style={{ background: "rgba(255,252,248,0.90)", borderTop: "1px solid rgba(240,65,90,0.06)" }}>
          {templateConfig.scenes.map((scene, i) => (
            <button key={scene.id} onClick={() => setCurrentScene(i)}
              title={scene.label}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === currentSceneIndex ? 24 : 8,
                height: 8,
                background: i === currentSceneIndex ? "var(--color-primary)" : "rgba(240,65,90,0.20)",
              }} />
          ))}
        </div>
      )}
    </div>
  );
}