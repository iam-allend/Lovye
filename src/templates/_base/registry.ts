// ============================================================
// TEMPLATE REGISTRY
// Satu-satunya tempat pendaftaran template.
// Tambah template baru = tambah satu import + satu entry.
// ============================================================

import type { TemplateRegistryEntry } from "./types";
import { romanticPinkEntry } from "@/templates/romantic-pink";

// Registry: slug → entry
const templateRegistry: Record<string, TemplateRegistryEntry> = {
  "romantic-pink": romanticPinkEntry,
  // "birthday-blue": birthdayBlueEntry,  ← tambah template baru di sini
};

export function getTemplate(slug: string): TemplateRegistryEntry | null {
  return templateRegistry[slug] ?? null;
}

export function getAllTemplateConfigs() {
  return Object.values(templateRegistry).map((e) => e.config);
}

export function getTemplateIds(): string[] {
  return Object.keys(templateRegistry);
}