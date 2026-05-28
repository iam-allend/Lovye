import type { ReactNode } from "react";
import type { PageCustomData } from "@/types/database";

// Re-export dari types/index.ts — tidak didefinisikan ulang di sini
export type {
  FieldType,
  FieldSchema,
  SceneType,
  SceneConfig,
  TemplateConfig,
} from "@/types";

// --- Scene Component Props ---
export type SceneProps = {
  data: PageCustomData;
  sceneId: string;
  isPreview?: boolean;
  showWatermark?: boolean;
};

// --- Scene Component Type ---
export type SceneComponent = (props: SceneProps) => ReactNode;

// --- Scene Registry Entry ---
export type SceneRegistryEntry = {
  type: import("@/types").SceneType;
  component: SceneComponent;
};

// --- Template Registry Entry ---
export type TemplateRegistryEntry = {
  config: import("@/types").TemplateConfig;
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