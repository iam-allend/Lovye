import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================
// CLASSNAME UTILITY
// Merges Tailwind classes safely, resolving conflicts
// Usage: cn("px-4 py-2", isActive && "bg-brand-500")
// ============================================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================
// RANDOM ID GENERATOR
// Used for page slugs: lovye.site/u/username/[randomId]
// ============================================================
export function generateRandomId(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

// ============================================================
// PAGE URL BUILDER
// ============================================================
export function buildPageUrl(username: string, pageSlug: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://lovye.site";
  return `${base}/u/${username}/${pageSlug}`;
}

// ============================================================
// FORMAT PRICE
// ============================================================
export function formatPrice(price: number): string {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

// ============================================================
// TEMPLATE CUSTOM DATA KEY
// All custom data is stored flat: { sceneId_fieldName: value }
// ============================================================
export function getDataKey(sceneId: string, fieldName: string): string {
  return `${sceneId}_${fieldName}`;
}

export function getDataValue(
  customData: Record<string, unknown>,
  sceneId: string,
  fieldName: string,
  fallback = ""
): unknown {
  return customData[getDataKey(sceneId, fieldName)] ?? fallback;
}

// ============================================================
// DEBOUNCE (used for autosave in editor)
// ============================================================
export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// ============================================================
// WATERMARK CHECK
// Returns true if the page should show watermark
// ============================================================
export function shouldShowWatermark(
  isFreeTemplate: boolean,
  hasPurchased: boolean
): boolean {
  return isFreeTemplate && !hasPurchased;
}