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


