import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import AmbientBackground from "@/components/ui/AmbientBackground";

export const metadata: Metadata = { title: "Masuk — Lovye" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; redirectTo?: string };
}) {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(150deg, #fff5f7 0%, #fffcf8 40%, #f8f5ff 100%)" }}>

      <AmbientBackground />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-up">
          <p className="font-script text-6xl mb-1" style={{ fontFamily: "var(--font-script)", color: "#f0415a" }}>
            lovye
          </p>
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--color-muted)" }}>
            Digital Emotional Greeting
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-7 animate-fade-up delay-100"
          style={{ boxShadow: "0 8px 40px rgba(240,65,90,0.10), 0 2px 12px rgba(240,65,90,0.06)" }}>

          <h2 className="font-display text-2xl font-light mb-0.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
            Selamat datang
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>Masuk untuk melanjutkan</p>

          {searchParams.error === "auth_failed" && (
            <div className="mb-4 text-xs px-3 py-2.5 rounded-xl"
              style={{ background: "#fff0f3", border: "1px solid #ffc9d3", color: "#f0415a" }}>
              Login gagal. Silakan coba lagi.
            </div>
          )}

          <LoginForm redirectTo={searchParams.redirectTo} />
        </div>

        <p className="text-center text-sm mt-6 animate-fade-up delay-200" style={{ color: "var(--color-muted)" }}>
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium transition-colors hover:opacity-70" style={{ color: "var(--color-primary)" }}>
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}