export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

// ---- Enums ----

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

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "expired"
  | "refunded";

// ---- Table Row types ----

export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Template = {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  price: number;
  is_free: boolean;           // generated column, read-only
  thumbnail_url: string | null;
  config_json: TemplateConfig;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Purchase = {
  id: string;
  user_id: string;
  template_id: string;
  payment_status: PaymentStatus;
  price_at_purchase: number;
  midtrans_order_id: string | null;
  midtrans_token: string | null;
  created_at: string;
  updated_at: string;
};

export type Page = {
  id: string;
  user_id: string;
  template_id: string;
  slug: string;
  title: string;
  custom_data_json: PageCustomData;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
};

// ---- JSONB payload types ----

// config_json shape stored in templates.config_json
export type FieldType = "text" | "textarea" | "image" | "music" | "date" | "color";

export type FieldSchema = {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
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

// custom_data_json shape stored in pages.custom_data_json
// Flat: keys follow pattern `{sceneId}_{fieldName}`
// e.g. { "opening_title": "Happy Bday!", "gallery_photos": [...] }
export type PageCustomData = Record<string, Json>;

// ---- Insert/Update helpers (omit generated/auto fields) ----

export type ProfileUpdate = Partial<
  Pick<Profile, "username" | "display_name" | "avatar_url">
>;

export type PageInsert = Pick<
  Page,
  "user_id" | "template_id" | "slug" | "title"
> & {
  custom_data_json?: PageCustomData;
  is_published?: boolean;
};

export type PageUpdate = Partial<
  Pick<Page, "title" | "custom_data_json" | "is_published" | "slug">
>;

export type PurchaseInsert = Pick<
  Purchase,
  "user_id" | "template_id" | "price_at_purchase"
> & {
  midtrans_order_id?: string;
};

// ---- Joined query types (common UI patterns) ----

// Page with template info — used on dashboard
export type PageWithTemplate = Page & {
  templates: Pick<Template, "id" | "name" | "slug" | "category" | "thumbnail_url" | "is_free">;
};

// Page with profile info — used on public view (/u/username/slug)
export type PageWithProfile = Page & {
  profiles: Pick<Profile, "id" | "username" | "display_name" | "avatar_url">;
};

// Purchase with template info — used on profile/purchases list
export type PurchaseWithTemplate = Purchase & {
  templates: Pick<Template, "id" | "name" | "slug" | "thumbnail_url" | "category">;
};