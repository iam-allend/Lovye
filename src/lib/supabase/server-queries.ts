import { createClient } from "./server";

export async function getFeaturedTemplates(limit = 4) {
  const sb = await createClient();
  return sb.from("templates")
    .select("id, name, slug, category, price, is_free")
    .eq("is_active", true)
    .order("sort_order")
    .limit(limit);
}

export async function getAllActiveTemplates() {
  const sb = await createClient();
  return sb.from("templates")
    .select("id, name, slug, category, price, is_free, config_json")
    .eq("is_active", true)
    .order("sort_order");
}

export async function getUserOwnedTemplateIds(userId: string): Promise<Set<string>> {
  const sb = await createClient();
  const { data } = await sb
    .from("purchases")
    .select("template_id")
    .eq("user_id", userId)
    .eq("payment_status", "paid");
  return new Set((data ?? []).map((p) => p.template_id));
}
