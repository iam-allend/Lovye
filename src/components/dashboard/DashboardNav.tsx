"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth/actions";
import type { Profile } from "@/types/database";
import { cn } from "@/utils";

const navLinks = [
  { href: "/dashboard",  label: "Halaman Saya" },
  { href: "/templates",  label: "Template" },
];

export default function DashboardNav({ profile }: { profile: Profile | null }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5"
      style={{ background: "rgba(13,10,18,0.80)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
        <Link href="/dashboard"
          className="text-xl font-light text-white tracking-wide shrink-0"
          style={{ fontFamily: "var(--font-display)" }}>
          lovye
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-all duration-200",
                pathname === l.href
                  ? "text-white bg-white/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              )}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #f63d5e, #ab65ff)" }}>
            {profile?.username?.[0]?.toUpperCase() ?? "?"}
          </div>
          <span className="text-sm text-white/50 hidden sm:block">@{profile?.username}</span>
          <form action={logout}>
            <button type="submit"
              className="text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
              Keluar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}