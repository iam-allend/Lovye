"use client";

import { useAuthSync } from "@/hooks";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthSync();
  return <>{children}</>;
}