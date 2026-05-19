import { z } from "zod";

// ============================================================
// AUTH SCHEMAS
// ============================================================

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(20, "Username maksimal 20 karakter")
      .regex(/^[a-z0-9_]+$/, "Hanya huruf kecil, angka, dan underscore"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

// ============================================================
// PAGE / EDITOR SCHEMAS
// ============================================================

export const createPageSchema = z.object({
  title: z
    .string()
    .min(1, "Judul wajib diisi")
    .max(100, "Judul maksimal 100 karakter"),
  templateId: z.string().uuid("Template tidak valid"),
});

export const publishPageSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .max(50, "Slug maksimal 50 karakter")
    .regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan strip"),
});

// ============================================================
// EDITOR FIELD SCHEMAS (runtime validation)
// ============================================================

export const textFieldSchema = z
  .string()
  .min(1, "Field ini wajib diisi")
  .max(500, "Maksimal 500 karakter");

export const textareaFieldSchema = z
  .string()
  .min(1, "Pesan wajib diisi")
  .max(2000, "Maksimal 2000 karakter");

// ============================================================
// INFERRED TYPES
// ============================================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreatePageInput = z.infer<typeof createPageSchema>;
export type PublishPageInput = z.infer<typeof publishPageSchema>;