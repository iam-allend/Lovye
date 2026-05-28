import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getAllActiveTemplates, getUserOwnedTemplateIds } from "@/lib/supabase/server-queries";
import { TEMPLATE_FALLBACK } from "@/types/template-display";
import type { TemplateRow } from "@/types/template-display";
import TemplateMarketplace from "@/components/template/TemplateMarketplace";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingElements from "@/components/home/FloatingElements";

export const metadata: Metadata = {
  title: "Template — Lovye",
  description: "Pilih template ucapan digital yang aesthetic dan immersive.",
};

export default async function TemplatesMarketplacePage() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();

  const [{ data }, ownedIds] = await Promise.all([
    getAllActiveTemplates(),
    user ? getUserOwnedTemplateIds(user.id) : Promise.resolve(new Set<string>()),
  ]);

  const templates: TemplateRow[] = (data && data.length > 0) ? data : TEMPLATE_FALLBACK;

  return (
    <main>
      <FloatingElements />
      <Navbar />
      <TemplateMarketplace templates={templates} ownedIds={ownedIds} userId={user?.id ?? null} />
      <Footer />
    </main>
  );
}