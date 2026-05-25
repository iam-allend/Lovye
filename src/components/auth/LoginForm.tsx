"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { loginWithEmail, loginWithGoogle } from "@/lib/auth/actions";
import { cn } from "@/utils";

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    const res = await loginWithEmail(data);
    if (res?.error) setServerError(res.error);
  };

  return (
    <div className="space-y-4">
      {/* Google button */}
      <button
        type="button"
        onClick={async () => { setGoogleLoading(true); await loginWithGoogle(); }}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:-translate-y-px glow-rose-1"
        style={{
          background: "white",
          border: "1.5px solid rgba(240,65,90,0.15)",
          color: "var(--color-text-2)",
        }}>
        <GoogleIcon />
        {googleLoading ? "Mengarahkan..." : "Lanjutkan dengan Google"}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "rgba(240,65,90,0.12)" }} />
        <span className="text-xs" style={{ color: "var(--color-muted)" }}>atau dengan email</span>
        <div className="flex-1 h-px" style={{ background: "rgba(240,65,90,0.12)" }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {serverError && (
          <p className="text-xs px-3 py-2.5 rounded-xl"
            style={{ background: "#fff0f3", border: "1px solid #ffc9d3", color: "#f0415a" }}>
            {serverError}
          </p>
        )}

        <InputField label="Email" error={errors.email?.message}>
          <input type="email" placeholder="kamu@email.com" autoComplete="email"
            {...register("email")}
            className={cn("w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300", hasErr(!!errors.email))}
          />
        </InputField>

        <InputField label="Password" error={errors.password?.message}>
          <input type="password" placeholder="••••••••" autoComplete="current-password"
            {...register("password")}
            className={cn("w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300", hasErr(!!errors.password))}
          />
        </InputField>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5 text-sm mt-1 disabled:opacity-60 glow-rose">
          {isSubmitting ? "Masuk..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}

function InputField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium tracking-wide" style={{ color: "var(--color-text-2)" }}>{label}</label>
      {children}
      {error && <p className="text-xs" style={{ color: "#f0415a" }}>{error}</p>}
    </div>
  );
}

const hasErr = (err: boolean) => err
  ? "border border-red-300 bg-red-50 placeholder-red-300 text-red-700"
  : "border placeholder-[#c4a8b0] text-[#3d2535] bg-white/60 hover:bg-white focus:bg-white focus:border-[rgba(240,65,90,0.4)] focus:shadow-[0_0_0_3px_rgba(240,65,90,0.08)]";

// shared borderStyle applied via className above — light rose border default
const _border = "border-[rgba(240,65,90,0.15)]";

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