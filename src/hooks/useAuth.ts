"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, profile, isLoading } = useAuthStore();
  const router = useRouter();
  const sb = createClient();

  const signOut = useCallback(async () => {
    await sb.auth.signOut();
    router.push("/login");
    router.refresh();
  }, [sb, router]);

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signOut,
  };
}