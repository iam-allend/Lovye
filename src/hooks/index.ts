"use client";

import { useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";
import { useEditorStore } from "@/store/editorStore";
import { debounce } from "@/utils";

// ============================================================
// useAuth — syncs Supabase session with Zustand auth store
// Usage: place <AuthProvider> in root layout
// ============================================================
export function useAuthSync() {
  const { setUser, setSession, setLoading, reset } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) reset();
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

// ============================================================
// useEditorAutosave — debounced autosave for editor
// Saves customData to Supabase every 1.5s after last change
// ============================================================
export function useEditorAutosave(pageId: string) {
  const { customData, isDirty, setIsSaving } = useEditorStore();
  const supabase = createClient();

  const save = useCallback(
    async (data: typeof customData) => {
      if (!pageId) return;
      setIsSaving(true);
      const { error } = await supabase
        .from("pages")
        .update({ custom_data_json: data, updated_at: new Date().toISOString() })
        .eq("id", pageId);
      if (error) console.error("[autosave]", error.message);
      setIsSaving(false);
    },
    [pageId, supabase, setIsSaving]
  );

  const debouncedSave = useRef(debounce(save, 1500)).current;

  useEffect(() => {
    if (isDirty) debouncedSave(customData);
  }, [customData, isDirty, debouncedSave]);
}

// ============================================================
// useShareLink — copies page URL to clipboard
// ============================================================
export function useShareLink() {
  const copy = useCallback(async (url: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }, []);

  const share = useCallback(async (url: string, title: string) => {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await copy(url);
    }
  }, [copy]);

  return { copy, share };
}