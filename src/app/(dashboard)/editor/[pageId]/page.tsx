import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTemplate } from "@/templates/_base/registry";
import EditorShell from "@/components/editor/EditorShell";

export default async function EditorPage({ params }: { params: { pageId: string } }) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  const { data: page } = await sb.from("pages")
    .select("*, templates(slug, config_json)")
    .eq("id", params.pageId)
    .eq("user_id", user.id)
    .single();

  if (!page) notFound();

  const templateSlug = (page.templates as { slug: string })?.slug;
  const entry = getTemplate(templateSlug);
  if (!entry) notFound();

  return (
    <EditorShell
      page={page}
      templateSlug={templateSlug}
      templateConfig={entry.config}
    />
  );
}