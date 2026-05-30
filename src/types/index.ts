import type { Json } from "./database";

// ── Basic DB types ────────────────────────────────────────

export type Profile = {
  id: string; username: string; avatar_url: string | null; created_at: string;
};

export type TemplateCategory =
  | "birthday" | "anniversary" | "valentine" | "confess"
  | "apology" | "graduation" | "farewell" | "long-message" | "other";

export type Template = {
  id: string; name: string; slug: string; category: TemplateCategory;
  price: number; thumbnail_url: string; is_free: boolean;
  config_json: TemplateConfig; created_at: string;
};

export type Purchase = {
  id: string; user_id: string; template_id: string;
  payment_status: "pending" | "paid" | "failed";
  midtrans_order_id: string; created_at: string;
};

export type Page = {
  id: string; user_id: string; template_id: string;
  slug: string; title: string;
  custom_data_json: Record<string, unknown>;
  is_published: boolean; created_at: string; updated_at: string;
};

// ── Field Schema ──────────────────────────────────────────

export type FieldType =
  | "text" | "textarea" | "image" | "images" | "music" | "date" | "color";

export type FieldSchema = {
  name: string; label: string; type: FieldType;
  placeholder?: string; required?: boolean;
  maxLength?: number; maxFiles?: number;
};

// ── Scene / Block System ──────────────────────────────────

export type BlockType =
  | "opening-minimal"       // judul + subjudul + tanggal
  | "opening-with-photo"    // judul + foto background
  | "message-big"           // pesan besar full screen
  | "message-card"          // pesan dalam card elegan
  | "gallery-popup"         // foto muncul satu per satu (auto)
  | "gallery-grid"          // grid foto dengan tombol nav
  | "gallery-strip"         // foto strip horizontal
  | "moments-reel"          // foto + teks per momen (auto timer)
  | "closing-simple"        // kalimat penutup
  | "closing-animated";     // penutup animasi extra

// Navigation mode per scene
export type NavigationMode =
  | "button"    // ada tombol next yang jelas
  | "auto"      // otomatis pindah setelah durasi
  | "swipe";    // swipe gesture (mobile) / scroll (desktop)

export type TransitionType =
  | "fade" | "slide-up" | "slide-left" | "zoom-in" | "curtain";

export type AmbientType =
  | "petals" | "snow" | "hearts" | "sparkles" | "bubbles" | "none";

export type FontStyle = "serif" | "script" | "modern";

export type BackgroundConfig = {
  type: "gradient" | "solid";
  value: string; // gradient string atau hex color
};

// ── Scene Config (Block) ──────────────────────────────────

export type SceneType =
  | "opening" | "gallery" | "message" | "closing"
  | "timeline" | "quote" | "countdown";

export type SceneConfig = {
  id: string;
  type: SceneType;
  blockType?: BlockType;          // spesifik block type (baru)
  label: string;
  fields: FieldSchema[];
  navigationMode?: NavigationMode; // default: "button"
  autoPlayDuration?: number;       // ms, untuk mode "auto"
  transition?: TransitionType;     // override global transition
};

// ── Template Config ───────────────────────────────────────

export type TemplateCustomizationOptions = {
  ambientAnimations: AmbientType[];
  backgrounds: BackgroundConfig[];
  accentColors: string[];
  fontStyles: FontStyle[];
  musics: string[];
};

export type TemplateGlobalDefaults = {
  ambientAnimation: AmbientType;
  background: BackgroundConfig;
  accentColor: string;
  fontStyle: FontStyle;
  music: string;
};

export type TemplateConfig = {
  id?: string; name?: string; category?: string;
  scenes: SceneConfig[];
  defaultMusic?: string;
  transitionType?: TransitionType;
  transition?: TransitionType;
  // Sistem baru
  globalDefaults?: TemplateGlobalDefaults;
  customizableOptions?: TemplateCustomizationOptions;
};

// ── Editor State ──────────────────────────────────────────

export type PageCustomData = Record<string, Json>;

// Kustomisasi user disimpan di custom_data_json dengan prefix "__"
// e.g. __accentColor, __ambientAnimation, __background, __music, __fontStyle

export type EditorState = {
  templateId: string;
  templateConfig: TemplateConfig;
  currentSceneIndex: number;
  customData: PageCustomData;
  isDirty: boolean;
  isSaving: boolean;
};

export type MusicPreset = {
  id: string; label: string; file: string;
  mood: "romantic" | "happy" | "sad" | "calm" | "energetic";
};

export type ApiResponse<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };