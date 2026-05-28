import TemplateShop from "@/components/template/TemplateShop";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Template — Lovye" };

export default async function TemplatesPage() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();

  // Ambil slug template yang sudah dibeli user
  const { data: purchases } = await sb
    .from("purchases")
    .select("template_id")
    .eq("user_id", user!.id)
    .eq("payment_status", "paid");

  const ownedSlugs = new Set((purchases ?? []).map((p) => p.template_id));

  return <TemplateShop ownedSlugs={ownedSlugs} userId={user!.id} />;
}