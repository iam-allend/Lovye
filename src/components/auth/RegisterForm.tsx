"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { registerWithEmail, loginWithGoogle } from "@/lib/auth/actions";
import { cn } from "@/utils";

const fields: { name: keyof RegisterInput; label: string; type: string; placeholder: string; hint?: string }[] = [
  { name: "username",        label: "Username",            type: "text",     placeholder: "nama_kamu", hint: "Huruf kecil, angka, underscore" },
  { name: "email",           label: "Email",               type: "email",    placeholder: "kamu@email.com" },
  { name: "password",        label: "Password",            type: "password", placeholder: "Min. 6 karakter" },
  { name: "confirmPassword", label: "Konfirmasi Password", type: "password", placeholder: "Ulangi password" },
];

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    const res = await registerWithEmail(data);
    if (res?.error) setServerError(res.error);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={async () => { setGoogleLoading(true); await loginWithGoogle(); }}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:-translate-y-px glow-lavender-1"
        style={{ background: "white", border: "1.5px solid rgba(196,174,255,0.30)", color: "var(--color-text-2)" }}>
        <GoogleIcon />
        {googleLoading ? "Mengarahkan..." : "Daftar dengan Google"}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "rgba(196,174,255,0.20)" }} />
        <span className="text-xs" style={{ color: "var(--color-muted)" }}>atau dengan email</span>
        <div className="flex-1 h-px" style={{ background: "rgba(196,174,255,0.20)" }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {serverError && (
          <p className="text-xs px-3 py-2.5 rounded-xl"
            style={{ background: "#fff0f3", border: "1px solid #ffc9d3", color: "#f0415a" }}>
            {serverError}
          </p>
        )}

        {fields.map((f) => (
          <div key={f.name} className="space-y-1.5">
            <label className="text-xs font-medium tracking-wide" style={{ color: "var(--color-text-2)" }}>{f.label}</label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.name}
              {...register(f.name)}
              className={cn(
                "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300",
                errors[f.name]
                  ? "border border-red-300 bg-red-50 placeholder-red-300 text-red-700"
                  : "border border-[rgba(196,174,255,0.25)] bg-white/60 hover:bg-white focus:bg-white text-[#3d2535] placeholder-[#c4a8b0] focus:border-[rgba(196,174,255,0.6)] focus:shadow-[0_0_0_3px_rgba(196,174,255,0.12)]"
              )}
            />
            {f.hint && !errors[f.name] && <p className="text-xs text-muted-form" style={{ color: "var(--color-muted)" }}>{f.hint}</p>}
            {errors[f.name] && <p className="text-xs" style={{ color: "#f0415a" }}>{errors[f.name]?.message}</p>}
          </div>
        ))}

        <button type="submit" disabled={isSubmitting}
          className="w-full py-3.5 text-sm font-medium text-white rounded-2xl mt-1 transition-all duration-300 hover:-translate-y-px disabled:opacity-60 register-btn glow-lavender">
          {isSubmitting ? "Membuat akun..." : "Buat akun"}
        </button>
      </form>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}