"use client";
import { useCallback } from "react";

export function useShareLink() {
  const copy = useCallback(async (url: string) => {
    try { await navigator.clipboard.writeText(url); return true; }
    catch { return false; }
  }, []);

  const share = useCallback(async (url: string, title: string) => {
    if (navigator.share) await navigator.share({ title, url });
    else await copy(url);
  }, [copy]);

  return { copy, share };
}