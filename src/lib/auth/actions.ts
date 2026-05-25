"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { LoginInput, RegisterInput } from "@/lib/validations";

export async function loginWithEmail(data: LoginInput) {
  const sb = await createClient();
  const { error } = await sb.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function loginWithGoogle() {
  const sb = await createClient();
  const { data, error } = await sb.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: { access_type: "offline", prompt: "consent" },
    },
  });
  if (error) return { error: error.message };
  if (data.url) redirect(data.url);
}

export async function registerWithEmail(data: RegisterInput) {
  const sb = await createClient();

  const { data: existing } = await sb
    .from("profiles").select("id").eq("username", data.username).single();
  if (existing) return { error: "Username sudah dipakai" };

  const { error } = await sb.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { display_name: data.username },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  if (error) return { error: error.message };

  const { data: { user } } = await sb.auth.getUser();
  if (user) {
    await sb.from("profiles").update({ username: data.username }).eq("id", user.id);
  }

  redirect("/dashboard");
}

export async function logout() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/login");
}

export async function getSession() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  return user;
}