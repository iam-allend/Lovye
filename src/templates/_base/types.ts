// ============================================================
// TEMPLATE SYSTEM — Core Types
// ============================================================
// Architecture: Template = kumpulan Scenes
// Scene = section visual + field schema untuk editor
// Semua data user disimpan flat di PageCustomData (JSONB)
// Key format: {sceneId}_{fieldName}
// ============================================================
import type { ReactNode } from "react";
import type { PageCustomData } from "@/types/database";

// --- Field Types ---
export type FieldType =
  | "text"
  | "textarea"
  | "image"      // single image URL (dari Supabase Storage)
  | "images"     // array of image URLs
  | "music"      // music preset id
  | "date"
  | "color";

export type FieldSchema = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  maxFiles?: number;    // untuk type: images
};

// --- Scene Types ---
export type SceneType =
  | "opening"
  | "gallery"
  | "message"
  | "closing"
  | "timeline"
  | "quote"
  | "countdown";

export type SceneConfig = {
  id: string;           // unik per template, misal "opening"
  type: SceneType;
  label: string;        // label di editor sidebar
  fields: FieldSchema[];
};

// --- Template Config ---
export type TransitionType = "fade" | "slide" | "scale";

export type TemplateConfig = {
  id: string;           // harus sama dengan slug di DB
  name: string;
  category: string;
  scenes: SceneConfig[];
  defaultMusic?: string;
  transition?: TransitionType;
};

// --- Scene Component Props ---
// Setiap scene component menerima props ini
export type SceneProps = {
  data: PageCustomData;      // full custom data (ambil field yg dibutuhkan)
  sceneId: string;           // id scene ini, untuk resolve key
  isPreview?: boolean;       // true = di editor preview
  showWatermark?: boolean;
};

// --- Scene Component Type ---
export type SceneComponent = (props: SceneProps) => ReactNode;

// --- Scene Registry Entry ---
export type SceneRegistryEntry = {
  type: SceneType;
  component: SceneComponent;
};

// --- Template Registry Entry ---
export type TemplateRegistryEntry = {
  config: TemplateConfig;
  // scene id → component
  scenes: Record<string, SceneComponent>;
};

// --- Helper: ambil nilai field dari flat data ---
export function getField<T = string>(
  data: PageCustomData,
  sceneId: string,
  fieldName: string,
  fallback?: T
): T {
  const key = `${sceneId}_${fieldName}`;
  return (data[key] as T) ?? (fallback as T);
}