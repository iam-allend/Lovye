import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTemplate } from "@/templates/_base/registry";
import EditorShell from "@/components/editor/EditorShell";

type Props = { params: Promise<{ pageId: string }> };

export default async function EditorPage({ params }: Props) {
  const { pageId } = await params;  // ← await params (Next.js 15+)

  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  const { data: page, error: pageError } = await sb
    .from("pages")
    .select("*")
    .eq("id", pageId)
    .eq("user_id", user.id)
    .single();

  if (pageError || !page) {
    console.error("[editor] page not found:", pageError?.message, "pageId:", pageId);
    notFound();
  }

  const { data: template, error: tplError } = await sb
    .from("templates")
    .select("id, slug, config_json")
    .eq("id", page.template_id)
    .single();

  if (tplError || !template) {
    console.error("[editor] template not found:", tplError?.message);
    notFound();
  }

  const entry = getTemplate(template.slug) ?? getTemplate("romantic-pink");
  if (!entry) notFound();

  return (
    <EditorShell
      page={page}
      templateSlug={template.slug}
      templateConfig={entry.config}
    />
  );
}