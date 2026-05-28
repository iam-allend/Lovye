import { createClient } from "./client";
import type { PageInsert, PageUpdate, ProfileUpdate } from "@/types/database";

// ---- Templates ----

export async function getTemplates(category?: string) {
  const sb = createClient();
  let q = sb.from("templates").select("*").eq("is_active", true).order("sort_order");
  if (category) q = q.eq("category", category);
  return q;
}

export async function getTemplateBySlug(slug: string) {
  return createClient().from("templates").select("*").eq("slug", slug).single();
}

// ---- Pages ----

export async function getUserPages(userId: string) {
  return createClient()
    .from("pages")
    .select("*, templates(id,name,slug,category,thumbnail_url,is_free)")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
}

export async function getPublicPage(username: string, pageSlug: string) {
  const sb = createClient();
  const { data: profile } = await sb
    .from("profiles").select("id").eq("username", username).single();
  if (!profile) return { data: null, error: { message: "User not found" } };
  return sb
    .from("pages")
    .select("*, profiles(id,username,display_name,avatar_url), templates(config_json,is_free)")
    .eq("user_id", profile.id)
    .eq("slug", pageSlug)
    .eq("is_published", true)
    .single();
}

export async function createPage(payload: PageInsert) {
  return createClient().from("pages").insert(payload).select().single();
}

export async function updatePage(pageId: string, payload: PageUpdate) {
  return createClient().from("pages").update(payload).eq("id", pageId).select().single();
}

export async function deletePage(pageId: string) {
  return createClient().from("pages").delete().eq("id", pageId);
}

export async function incrementViewCount(pageId: string) {
  return createClient().rpc("increment_view_count", { page_id: pageId });
}

// ---- Purchases ----

export async function getUserPurchases(userId: string) {
  return createClient()
    .from("purchases")
    .select("*, templates(id,name,slug,thumbnail_url,category)")
    .eq("user_id", userId)
    .eq("payment_status", "paid");
}

export async function hasAccess(userId: string, templateId: string): Promise<boolean> {
  const { data } = await createClient()
    .rpc("user_has_template_access", { p_user_id: userId, p_template_id: templateId });
  return !!data;
}

export async function claimFreeTemplate(userId: string, templateId: string) {
  return createClient().from("purchases").insert({
    user_id: userId,
    template_id: templateId,
    payment_status: "paid",
    price_at_purchase: 0,
  });
}

// ---- Profile ----

export async function getProfile(userId: string) {
  return createClient().from("profiles").select("*").eq("id", userId).single();
}

export async function updateProfile(userId: string, payload: ProfileUpdate) {
  return createClient().from("profiles").update(payload).eq("id", userId).select().single();
}

// ---- Landing Page ----

export async function getFeaturedTemplates(limit = 4) {
  return createClient()
    .from("templates")
    .select("id, name, slug, category, price, is_free")
    .eq("is_active", true)
    .order("sort_order")
    .limit(limit);
}

export async function getAllActiveTemplates() {
  return createClient()
    .from("templates")
    .select("id, name, slug, category, price, is_free, config_json")
    .eq("is_active", true)
    .order("sort_order");
}