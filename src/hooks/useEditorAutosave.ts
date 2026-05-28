"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEditorStore } from "@/store/editorStore";
import { debounce } from "@/utils";

export function useEditorAutosave(pageId: string) {
  const { customData, isDirty, setIsSaving } = useEditorStore();
  const sb = createClient();

  const save = async (data: typeof customData) => {
    if (!pageId) return;
    setIsSaving(true);
    await sb.from("pages").update({ custom_data_json: data, updated_at: new Date().toISOString() }).eq("id", pageId);
    setIsSaving(false);
  };

  const debouncedSave = useRef(debounce(save as (...args: unknown[]) => unknown, 1500)).current;

  useEffect(() => {
    if (isDirty) debouncedSave(customData);
  }, [customData, isDirty]); // eslint-disable-line
}