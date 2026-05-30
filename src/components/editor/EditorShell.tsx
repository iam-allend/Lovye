"use client";
// PATH: src/components/editor/EditorShell.tsx

import { useEffect, useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { useEditorAutosave } from "@/hooks/useEditorAutosave";
import EditorSidebar from "./EditorSidebar";
import EditorForm from "./EditorForm";
import EditorPreview from "./EditorPreview";
import EditorTopbar from "./EditorTopbar";
import CustomizationPanel from "./CustomizationPanel";
import type { TemplateConfig } from "@/types";
import type { Page } from "@/types/database";
import type { PageCustomData } from "@/types/database";

type Props = { page: Page; templateSlug: string; templateConfig: TemplateConfig };
type FormTab = "content" | "style";

export default function EditorShell({ page, templateSlug, templateConfig }: Props) {
  const { initEditor, currentSceneIndex } = useEditorStore();
  const [mobileTab, setMobileTab]   = useState<"form" | "preview">("form");
  const [formTab, setFormTab]       = useState<FormTab>("content");

  useEffect(() => {
    initEditor(page.template_id, templateConfig, page.custom_data_json as PageCustomData);
  }, [page.id]); // eslint-disable-line

  useEditorAutosave(page.id);

  const currentScene = templateConfig.scenes[currentSceneIndex];

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <EditorTopbar page={page} templateSlug={templateSlug} />

      <div className="flex flex-1 overflow-hidden">
        {/* Scene navigator sidebar */}
        <EditorSidebar scenes={templateConfig.scenes} />

        {/* Left: Form panel */}
        <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col overflow-hidden border-r
          ${mobileTab === "preview" ? "hidden md:flex" : "flex"}`}
          style={{ borderColor: "rgba(240,65,90,0.08)", background: "rgba(255,252,248,0.98)" }}>

          {/* Tab: Konten / Gaya */}
          <div className="flex border-b flex-shrink-0" style={{ borderColor: "rgba(240,65,90,0.08)" }}>
            {(["content", "style"] as FormTab[]).map((tab) => (
              <button key={tab} onClick={() => setFormTab(tab)}
                className="flex-1 py-3 text-xs font-medium transition-all"
                style={{
                  color: formTab === tab ? "var(--color-primary)" : "var(--color-muted)",
                  borderBottom: formTab === tab ? "2px solid var(--color-primary)" : "2px solid transparent",
                  background: "transparent",
                }}>
                {tab === "content" ? "✏️ Konten" : "🎨 Gaya"}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {formTab === "content" ? (
              currentScene ? <EditorForm scene={currentScene} /> : null
            ) : (
              <CustomizationPanel templateConfig={templateConfig} />
            )}
          </div>
        </div>

        {/* Right: Preview panel */}
        <div className={`flex-1 overflow-hidden ${mobileTab === "form" ? "hidden md:block" : "block"}`}
          style={{ background: "#f5f0f7" }}>
          <EditorPreview templateSlug={templateSlug} />
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <div className="md:hidden flex border-t flex-shrink-0"
        style={{ borderColor: "rgba(240,65,90,0.10)", background: "rgba(255,252,248,0.98)" }}>
        {(["form", "preview"] as const).map((tab) => (
          <button key={tab} onClick={() => setMobileTab(tab)}
            className="flex-1 py-3 text-sm font-medium transition-all"
            style={{
              color: mobileTab === tab ? "var(--color-primary)" : "var(--color-muted)",
              borderTop: mobileTab === tab ? "2px solid var(--color-primary)" : "2px solid transparent",
            }}>
            {tab === "form" ? "✏️ Edit" : "👁 Preview"}
          </button>
        ))}
      </div>
    </div>
  );
}