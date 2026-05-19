export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
};

export type TemplateCategory =
  | "birthday"
  | "anniversary"
  | "valentine"
  | "confess"
  | "apology"
  | "graduation"
  | "farewell"
  | "long-message"
  | "other";

export type Template = {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  price: number; // 0 = free
  thumbnail_url: string;
  is_free: boolean;
  config_json: TemplateConfig;
  created_at: string;
};

export type Purchase = {
  id: string;
  user_id: string;
  template_id: string;
  payment_status: "pending" | "paid" | "failed";
  midtrans_order_id: string;
  created_at: string;
};

export type Page = {
  id: string;
  user_id: string;
  template_id: string;
  slug: string;
  title: string;
  custom_data_json: Record<string, unknown>;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

// ============================================================
// TEMPLATE SYSTEM TYPES
// ============================================================

export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "music"
  | "date"
  | "color";

export type FieldSchema = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
};

export type SceneType =
  | "opening"
  | "gallery"
  | "message"
  | "closing"
  | "timeline"
  | "quote"
  | "countdown";

export type SceneConfig = {
  id: string;
  type: SceneType;
  label: string;
  fields: FieldSchema[];
};

export type TemplateConfig = {
  scenes: SceneConfig[];
  defaultMusic?: string;
  transitionType?: "fade" | "slide" | "scale";
};

// ============================================================
// EDITOR TYPES
// ============================================================

export type PageCustomData = Record<string, unknown>;

export type EditorState = {
  templateId: string;
  templateConfig: TemplateConfig;
  currentSceneIndex: number;
  customData: PageCustomData;
  isDirty: boolean;
  isSaving: boolean;
};

// ============================================================
// MUSIC PRESET TYPES
// ============================================================

export type MusicPreset = {
  id: string;
  label: string;
  file: string;
  mood: "romantic" | "happy" | "sad" | "calm" | "energetic";
};

// ============================================================
// API RESPONSE TYPES
// ============================================================

export type ApiResponse<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };