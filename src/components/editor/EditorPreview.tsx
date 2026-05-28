"use client";
import { useEditorStore, selectCurrentScene } from "@/store/editorStore";
import { getTemplate } from "@/templates/_base/registry";


export default function EditorPreview({ templateSlug }: { templateSlug: string }) {
  const { customData, currentSceneIndex, templateConfig } = useEditorStore();
  const currentScene = selectCurrentScene({ customData, currentSceneIndex, templateConfig } as Parameters<typeof selectCurrentScene>[0]);
  const entry = getTemplate(templateSlug);

  if (!entry || !currentScene) return (
    <div className="flex-1 flex items-center justify-center h-full">
      <p style={{ color: "var(--color-muted)" }} className="text-sm">Pilih scene untuk preview</p>
    </div>
  );

  const SceneComponent = entry.scenes[currentScene.id];
  if (!SceneComponent) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Preview label */}
      <div className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
        style={{ borderColor: "rgba(240,65,90,0.08)", background: "rgba(255,252,248,0.90)" }}>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>Preview — {currentScene.label}</p>
        <div className="flex gap-1">
          {["mobile", "desktop"].map((v) => (
            <span key={v} className="text-xs px-2 py-0.5 rounded-md" style={{ color: "var(--color-muted)", background: "rgba(240,65,90,0.05)" }}>{v}</span>
          ))}
        </div>
      </div>

      {/* Mobile frame simulation */}
      <div className="flex-1 flex items-start justify-center py-6 px-4 overflow-auto">
        <div className="relative w-full max-w-sm flex-shrink-0"
          style={{ borderRadius: 28, overflow: "hidden", boxShadow: "0 16px 60px rgba(180,80,100,0.14), 0 2px 8px rgba(180,80,100,0.08)", border: "1px solid rgba(240,65,90,0.12)" }}>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-24 h-5 rounded-b-2xl"
            style={{ background: "rgba(255,252,248,0.95)" }} />
          <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
            <SceneComponent
              data={customData}
              sceneId={currentScene.id}
              isPreview={true}
              showWatermark={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}