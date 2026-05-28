"use client";

// Dynamic form renderer — renders fields berdasarkan SceneConfig.fields
// Setiap perubahan langsung update Zustand → EditorPreview re-render otomatis

import { useEditorStore, selectFieldValue } from "@/store/editorStore";
import { MUSIC_PRESETS } from "@/lib/music-presets";
import { uploadUserPhoto } from "@/utils/upload";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import type { SceneConfig, FieldSchema } from "@/templates/_base/types";

export default function EditorForm({ scene }: { scene: SceneConfig }) {
  return (
    <div className="p-5 space-y-5">
      {/* Scene header */}
      <div className="pb-4 border-b" style={{ borderColor: "rgba(240,65,90,0.08)" }}>
        <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--color-muted)" }}>editing</p>
        <h3 className="text-lg font-light" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
          {scene.label}
        </h3>
      </div>
      {scene.fields.map((field) => (
        <FieldRenderer key={field.name} field={field} sceneId={scene.id} />
      ))}
    </div>
  );
}

function FieldRenderer({ field, sceneId }: { field: FieldSchema; sceneId: string }) {
  const { updateField, customData } = useEditorStore();
  const value = selectFieldValue({ customData } as Parameters<typeof selectFieldValue>[0], sceneId, field.name);

  const inputStyle = {
    width: "100%", borderRadius: 12, padding: "10px 14px", fontSize: 14,
    outline: "none", transition: "all 0.2s",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(240,65,90,0.15)",
    color: "var(--color-text)",
  };

  const labelEl = (
    <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--color-text-2)" }}>
      {field.label}{field.required && <span style={{ color: "var(--color-primary)" }}> *</span>}
    </label>
  );

  if (field.type === "text") return (
    <div>
      {labelEl}
      <input type="text" value={String(value ?? "")} placeholder={field.placeholder}
        maxLength={field.maxLength}
        onChange={(e) => updateField(sceneId, field.name, e.target.value)}
        style={inputStyle} />
      {field.maxLength && (
        <p className="text-right text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          {String(value ?? "").length}/{field.maxLength}
        </p>
      )}
    </div>
  );

  if (field.type === "textarea") return (
    <div>
      {labelEl}
      <textarea value={String(value ?? "")} placeholder={field.placeholder}
        maxLength={field.maxLength} rows={5}
        onChange={(e) => updateField(sceneId, field.name, e.target.value)}
        style={{ ...inputStyle, resize: "vertical" }} />
    </div>
  );

  if (field.type === "date") return (
    <div>
      {labelEl}
      <input type="date" value={String(value ?? "")}
        onChange={(e) => updateField(sceneId, field.name, e.target.value)}
        style={inputStyle} />
    </div>
  );

  if (field.type === "music") return (
    <MusicField sceneId={sceneId} field={field} value={String(value ?? "")} />
  );

  if (field.type === "images") return (
    <ImagesField sceneId={sceneId} field={field} value={(value as string[]) ?? []} />
  );

  return null;
}

function MusicField({ sceneId, field, value }: { sceneId: string; field: FieldSchema; value: string }) {
  const { updateField } = useEditorStore();
  return (
    <div>
      <label className="text-xs font-medium block mb-2" style={{ color: "var(--color-text-2)" }}>{field.label}</label>
      <div className="space-y-1.5">
        {MUSIC_PRESETS.map((m) => (
          <button key={m.id} onClick={() => updateField(sceneId, field.name, m.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
            style={{
              background: value === m.id ? "rgba(240,65,90,0.07)" : "rgba(255,255,255,0.5)",
              border: `1px solid ${value === m.id ? "rgba(240,65,90,0.25)" : "rgba(240,65,90,0.10)"}`,
              color: "var(--color-text)",
            }}>
            <span style={{ color: value === m.id ? "var(--color-primary)" : "var(--color-muted)" }}>
              {value === m.id ? "▶" : "○"}
            </span>
            <span>{m.label}</span>
            <span className="ml-auto text-xs" style={{ color: "var(--color-muted)" }}>{m.mood}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ImagesField({ sceneId, field, value }: { sceneId: string; field: FieldSchema; value: string[] }) {
  const { updateField } = useEditorStore();
  const [uploading, setUploading] = useState(false);
  const max = field.maxFiles ?? 5;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const sb = createClient();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;
      const urls = await Promise.all(files.slice(0, max - value.length).map((f) => uploadUserPhoto(user.id, f)));
      updateField(sceneId, field.name, [...value, ...urls]);
    } finally { setUploading(false); }
  };

  const removePhoto = (idx: number) => {
    updateField(sceneId, field.name, value.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="text-xs font-medium block mb-2" style={{ color: "var(--color-text-2)" }}>
        {field.label} <span style={{ color: "var(--color-muted)" }}>({value.length}/{max})</span>
      </label>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {value.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group"
            style={{ border: "1px solid rgba(240,65,90,0.12)" }}>
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button onClick={() => removePhoto(i)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-lg"
              style={{ background: "rgba(0,0,0,0.35)" }}>✕</button>
          </div>
        ))}
        {value.length < max && (
          <label className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:opacity-70"
            style={{ border: "1.5px dashed rgba(240,65,90,0.20)", background: "rgba(240,65,90,0.03)" }}>
            <span className="text-xl mb-1" style={{ color: "var(--color-muted)" }}>+</span>
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>{uploading ? "..." : "Foto"}</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        )}
      </div>
    </div>
  );
}