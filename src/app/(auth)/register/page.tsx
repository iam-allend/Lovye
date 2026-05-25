import { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import AmbientBackground from "@/components/ui/AmbientBackground";

export const metadata: Metadata = { title: "Daftar — Lovye" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(150deg, #f8f5ff 0%, #fffcf8 40%, #fff5f7 100%)" }}>

      <AmbientBackground />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-10 animate-fade-up">
          <p className="font-script text-6xl mb-1 text-lavender-400" style={{ fontFamily: "var(--font-script)"}}>
            lovye
          </p>
          <p className="text-xs tracking-[0.25em] uppercase text-muted">
            Digital Emotional Greeting
          </p>
        </div>

        <div className="glass rounded-3xl p-7 animate-fade-up delay-100"
          style={{ boxShadow: "0 8px 40px rgba(196,174,255,0.15), 0 2px 12px rgba(196,174,255,0.08)" }}>

          <h2 className="font-display text-2xl font-light mb-0.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
            Buat akun baru
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Mulai buat halaman ucapan pertamamu
          </p>

          <RegisterForm />
        </div>

        <p className="text-center text-sm mt-6 animate-fade-up delay-200" style={{ color: "var(--color-muted)" }}>
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium transition-colors hover:opacity-70 text-lavender-400">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}