"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";

export function useAuthSync() {
  const { setUser, setSession, setProfile, setLoading, reset } = useAuthStore();
  const sb = createClient();
  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setUser(session?.user ?? null); setLoading(false);
    });
    const { data: { subscription } } = sb.auth.onAuthStateChange(async (_e, session) => {
      setSession(session); setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await sb.from("profiles").select("*").eq("id", session.user.id).single();
        setProfile(data);
      } else reset();
    });
    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line
}