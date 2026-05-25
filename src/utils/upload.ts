import { createClient } from "@/lib/supabase/client";

export async function uploadUserPhoto(userId: string, file: File): Promise<string> {
  const sb = createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await sb.storage
    .from("user-photos")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw new Error(error.message);
  return sb.storage.from("user-photos").getPublicUrl(data.path).data.publicUrl;
}

export async function deleteUserPhoto(url: string): Promise<void> {
  const sb = createClient();
  // Extract path from public URL: ...user-photos/{path}
  const path = url.split("/user-photos/")[1];
  if (!path) return;
  await sb.storage.from("user-photos").remove([path]);
}