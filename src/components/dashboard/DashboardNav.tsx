"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth/actions";
import type { Profile } from "@/types/database";

const links = [
  { href: "/dashboard", label: "Halaman Saya" },
  { href: "/templates", label: "Template" },
];

export default function DashboardNav({ profile }: { profile: Profile | null }) {
  const path = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b"
      style={{ background: "rgba(255,252,248,0.85)", backdropFilter: "blur(16px)", borderColor: "rgba(240,65,90,0.08)" }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/dashboard" style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", color: "var(--color-primary)", lineHeight: 1 }}>
          lovye
        </Link>
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-3 py-1.5 rounded-xl text-sm transition-all"
              style={{
                color: path === l.href ? "var(--color-primary)" : "var(--color-text-2)",
                background: path === l.href ? "rgba(240,65,90,0.07)" : "transparent",
                fontWeight: path === l.href ? 500 : 400,
              }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
            style={{ background: "var(--rose-400)" }}>
            {profile?.username?.[0]?.toUpperCase() ?? "?"}
          </div>
          <span className="text-sm hidden sm:block" style={{ color: "var(--color-text-2)" }}>@{profile?.username}</span>
          <form action={logout}>
            <button type="submit" className="text-xs px-2 py-1 rounded-lg transition-all hover:opacity-70"
              style={{ color: "var(--color-muted)" }}>Keluar</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
