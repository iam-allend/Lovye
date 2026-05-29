"use client";
// PATH: src/components/editor/EditorForm.tsx

import { useEditorStore, selectFieldValue } from "@/store/editorStore";
import { MUSIC_PRESETS } from "@/lib/music-presets";
import { uploadUserPhoto } from "@/utils/upload";
import { compressImage } from "@/utils/compress";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import type { SceneConfig, FieldSchema } from "@/types";
import type { Json } from "@/types/database";

export default function EditorForm({ scene }: { scene: SceneConfig }) {
  return (
    <div className="p-5 space-y-5">
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

  const inputStyle: React.CSSProperties = {
    width: "100%", borderRadius: 12, padding: "10px 14px", fontSize: 14,
    outline: "none", transition: "all 0.2s",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(240,65,90,0.15)",
    color: "var(--color-text)",
  };

  const label = (
    <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--color-text-2)" }}>
      {field.label}{field.required && <span style={{ color: "var(--color-primary)" }}> *</span>}
    </label>
  );

  if (field.type === "text") return (
    <div>
      {label}
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
      {label}
      <textarea value={String(value ?? "")} placeholder={field.placeholder}
        maxLength={field.maxLength} rows={5}
        onChange={(e) => updateField(sceneId, field.name, e.target.value)}
        style={{ ...inputStyle, resize: "vertical" }} />
      {field.maxLength && (
        <p className="text-right text-xs mt-1" style={{ color: "var(--color-muted)" }}>
          {String(value ?? "").length}/{field.maxLength}
        </p>
      )}
    </div>
  );

  if (field.type === "date") return (
    <div>
      {label}
      <input type="date" value={String(value ?? "")}
        onChange={(e) => updateField(sceneId, field.name, e.target.value)}
        style={inputStyle} />
    </div>
  );

  if (field.type === "music") return (
    <MusicField sceneId={sceneId} field={field} value={String(value ?? "")} />
  );

  if (field.type === "images") return (
    // FIX #2: pastikan value selalu array
    <ImagesField sceneId={sceneId} field={field}
      value={Array.isArray(value) ? (value as string[]) : []} />
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
          <button key={m.id} onClick={() => updateField(sceneId, field.name, m.id as Json)}
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
  const [progress, setProgress] = useState(0);
  const max = field.maxFiles ?? 5;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const canAdd = max - value.length;
    if (canAdd <= 0) return;

    setUploading(true);
    setProgress(0);

    try {
      const sb = createClient();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;

      const toUpload = files.slice(0, canAdd);
      const urls: string[] = [];

      for (let i = 0; i < toUpload.length; i++) {
        // Kompres sebelum upload — max 100KB
        const compressed = await compressImage(toUpload[i], 100);
        const url = await uploadUserPhoto(user.id, compressed);
        urls.push(url);
        setProgress(Math.round(((i + 1) / toUpload.length) * 100));
      }

      updateField(sceneId, field.name, [...value, ...urls] as Json);
    } catch (err) {
      console.error("[upload]", err);
    } finally {
      setUploading(false);
      setProgress(0);
      // Reset input
      e.target.value = "";
    }
  };

  const removePhoto = (idx: number) => {
    updateField(sceneId, field.name, value.filter((_, i) => i !== idx) as Json);
  };

  return (
    <div>
      <label className="text-xs font-medium block mb-2" style={{ color: "var(--color-text-2)" }}>
        {field.label}
        <span className="ml-1" style={{ color: "var(--color-muted)" }}>({value.length}/{max})</span>
      </label>

      <div className="grid grid-cols-3 gap-2 mb-2">
        {value.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group"
            style={{ border: "1px solid rgba(240,65,90,0.12)" }}>
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button onClick={() => removePhoto(i)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
              style={{ background: "rgba(0,0,0,0.35)", fontSize: 18 }}>✕</button>
          </div>
        ))}

        {value.length < max && (
          <label className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:opacity-70 relative overflow-hidden"
            style={{ border: "1.5px dashed rgba(240,65,90,0.20)", background: "rgba(240,65,90,0.03)" }}>
            {uploading ? (
              <div className="text-center px-2">
                <div className="text-xs mb-1" style={{ color: "var(--color-muted)" }}>
                  {progress}%
                </div>
                {/* Progress bar */}
                <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(240,65,90,0.15)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "var(--rose-400)" }} />
                </div>
              </div>
            ) : (
              <>
                <span className="text-xl mb-1" style={{ color: "var(--color-muted)" }}>+</span>
                <span className="text-[10px] text-center px-1" style={{ color: "var(--color-muted)" }}>
                  Foto<br/>max 100KB
                </span>
              </>
            )}
            <input type="file" accept="image/*" multiple className="hidden"
              onChange={handleUpload} disabled={uploading} />
          </label>
        )}
      </div>

      {value.length > 0 && (
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          Hover foto untuk hapus. Gambar dikompres otomatis max 100KB.
        </p>
      )}
    </div>
  );
}