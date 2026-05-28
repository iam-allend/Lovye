"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { useEditorAutosave } from "@/hooks/useEditorAutosave";
import EditorSidebar from "./EditorSidebar";
import EditorForm from "./EditorForm";
import EditorPreview from "./EditorPreview";
import EditorTopbar from "./EditorTopbar";
import type { TemplateConfig } from "@/templates/_base/types";
import type { Page } from "@/types/database";
import type { PageCustomData } from "@/types";



type Props = {
  page: Page;
  templateSlug: string;
  templateConfig: TemplateConfig;
};

export default function EditorShell({ page, templateSlug, templateConfig }: Props) {
  const { initEditor, currentSceneIndex } = useEditorStore();
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

  useEffect(() => {
    initEditor(page.template_id, templateConfig, page.custom_data_json as PageCustomData);
  }, [page.id]); // eslint-disable-line

  useEditorAutosave(page.id);

  const currentScene = templateConfig.scenes[currentSceneIndex];

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <EditorTopbar page={page} templateSlug={templateSlug} />

      {/* Desktop: sidebar + form + preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Scene nav sidebar */}
        <EditorSidebar scenes={templateConfig.scenes} />

        {/* Form panel */}
        <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 overflow-y-auto border-r
          ${mobileTab === "preview" ? "hidden md:block" : "block"}`}
          style={{ borderColor: "rgba(240,65,90,0.08)", background: "rgba(255,252,248,0.95)" }}>
          {currentScene && <EditorForm scene={currentScene} />}
        </div>

        {/* Preview panel */}
        <div className={`flex-1 overflow-y-auto
          ${mobileTab === "form" ? "hidden md:block" : "block"}`}
          style={{ background: "#f5f0f7" }}>
          <EditorPreview templateSlug={templateSlug} />
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="md:hidden flex border-t" style={{ borderColor: "rgba(240,65,90,0.10)", background: "rgba(255,252,248,0.98)" }}>
        {(["form", "preview"] as const).map((tab) => (
          <button key={tab} onClick={() => setMobileTab(tab)}
            className="flex-1 py-3 text-sm font-medium transition-all"
            style={{ color: mobileTab === tab ? "var(--color-primary)" : "var(--color-muted)",
              borderTop: mobileTab === tab ? "2px solid var(--color-primary)" : "2px solid transparent" }}>
            {tab === "form" ? "✏️ Edit" : "👁 Preview"}
          </button>
        ))}
      </div>
    </div>
  );
}