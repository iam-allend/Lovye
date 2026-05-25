"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "#templates", label: "Template" },
  { href: "#showcase", label: "Showcase" },
  { href: "#categories", label: "Kategori" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimating, setMenuAnimating] = useState(false);

  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !activeHash;
    }

    return activeHash === href;
  };

  const handleMenuToggle = () => {
    if (mobileOpen) {
      setMenuAnimating(true);
      setTimeout(() => {
        setMobileOpen(false);
        setMenuVisible(false);
        setMenuAnimating(false);
      }, 250);
    } else {
      setMobileOpen(true);
      setMenuVisible(true);
    }
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 z-50 w-full -translate-x-1/2 px-4">
        <div
          className="
            mx-auto
            flex
            h-[62px]
            max-w-4xl
            items-center
            justify-between
            rounded-full
            border
            border-white/50
            bg-white/55
            px-3
            shadow-[0_10px_40px_rgba(240,65,90,0.10)]
            backdrop-blur-2xl
          "
        >
          {/* gradient border */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              p-[1px]
            "
            style={{
              background:
                "linear-gradient(135deg, rgba(240,65,90,0.18), rgba(196,174,255,0.18))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* LEFT */}
          <Link
            href="/"
            className="
              group
              relative
              z-10
              flex
              items-center
              gap-2.5
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-white
                transition-all
                duration-300
                group-hover:scale-105
                animate-logo-float
                glow-rose-1
              "
              style={{
                background: "var(--rose-400)",
              }}
            >
              <Heart size={16} fill="currentColor" />
            </div>

            <div className="leading-none">
              <p
                className="
                  text-[2rem]
                  font-semibold
                  tracking-tight
                "
                style={{
                  fontFamily: "var(--font-script)",
                  color: "var(--rose-400)",
                  lineHeight: 1,
                  fontWeight: 400,
                  fontSize: "2.2rem",
                }}
              >
                lovye
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((item) => {
              const active = isActive(item.href);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    `
                    group
                    relative
                    overflow-hidden
                    rounded-full
                    px-4
                    py-[8px]
                    text-[13px]
                    font-medium
                    transition-all
                    duration-300
                    hover:-translate-y-[1px]
                  `,
                    active
                      ? "text-[var(--color-text)] animate-desktop-nav-float"
                      : "text-[#7a5565]"
                  )}
                >
                  {/* hover bg */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-full
                      bg-[rgba(240,65,90,0.07)]
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* active border */}
                  {active && (
                    <>
                      {/* animated gradient border */}
                      <span
                        className="
                          absolute
                          inset-0
                          rounded-full
                          animate-gradient-border
                        "
                        style={{
                          padding: "1.2px",
                          background:
                            "linear-gradient(135deg,#f7687e,#c4aeff,#f7687e)",
                        }}
                      >
                        <span
                          className="
                            block
                            h-full
                            w-full
                            rounded-full
                            bg-[rgba(255,255,255,0.88)]
                            backdrop-blur-xl
                          "
                        />
                      </span>

                      {/* soft glow */}
                      <span
                        className="
                          absolute
                          inset-0
                          rounded-full
                        "
                        style={{
                          boxShadow: "0 0 18px rgba(240,65,90,0.10)",
                        }}
                      />
                    </>
                  )}

                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT */}
          <div className="relative z-10 flex items-center gap-2">
            <Link
              href="/login"
              className="
                hidden
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                text-[#7a5565]
                transition-all
                duration-300
                hover:bg-[rgba(240,65,90,0.08)]
                md:block
              "
            >
              Masuk
            </Link>

            <Link
              href="/register"
              className="
                hidden
                rounded-full
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-[1px]
                md:flex
                glow-lavender-1
              "
              style={{
                background: "var(--lavender-400)",
              }}
            >
              Mulai Gratis
            </Link>

            {/* MOBILE BUTTON */}
            <button
              onClick={handleMenuToggle}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                text-white
                transition-all
                duration-300
                md:hidden
                glow-lavender-1
              "
              style={{
                background: mobileOpen
                  ? "var(--rose-400)"
                  : "var(--lavender-400)",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuVisible && (
          <div
            className={cn(
              "pt-3 md:hidden",
              menuAnimating ? "mobile-menu-exit" : "mobile-menu-enter"
            )}
          >
            <div
              className="
                rounded-[2rem]
                border
                border-white/50
                bg-white
                p-3
                glow-rose-1
                backdrop-blur-2xl
              "
              style={{ willChange: "auto" }}
            >
              <div className="flex flex-col gap-1">
                {links.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setMenuAnimating(true);
                        setTimeout(() => {
                          setMobileOpen(false);
                          setMenuVisible(false);
                          setMenuAnimating(false);
                        }, 250);
                      }}
                      className={cn(
                        `
                          group
                          relative
                          overflow-hidden
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          px-4
                          py-2.5
                          text-sm
                          font-medium
                          transition-all
                          duration-300
                        `,
                        active
                          ? "text-[var(--color-text)] animate-mobile-nav-float"
                          : "text-[var(--color-text)]"
                      )}
                    >
                      {/* hover bg */}
                      <span
                        className="
                          absolute
                          inset-0
                          rounded-2xl
                          bg-[rgba(240,65,90,0.06)]
                          opacity-0
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      />

                      {/* ACTIVE BORDER */}
                      {active && (
                        <>
                          <span
                            className="
                              absolute
                              inset-0
                              rounded-xl
                              p-[2px]
                              animate-gradient-border
                            "
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(240,65,90,0.75), rgba(196,174,255,0.9), rgba(240,65,90,0.75))",
                              WebkitMask:
                                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                              WebkitMaskComposite: "xor",
                              maskComposite: "exclude",
                            }}
                          />

                          {/* glow */}
                          <span
                            className="
                              absolute
                              inset-0
                              rounded-xl
                              animate-mobile-active-glow
                            "
                          />
                        </>
                      )}

                      <span className="relative z-10">{item.label}</span>

                      {active && (
                        <Sparkles
                          size={15}
                          className="
                            relative
                            z-10
                            animate-sparkle-float
                          "
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-medium
                  "
                  style={{
                    background: "rgba(240,65,90,0.08)",
                    color: "var(--color-primary)",
                  }}
                >
                  Masuk
                </Link>

                <Link
                  href="/register"
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-medium
                    text-white
                    glow-lavender-1
                  "
                  style={{
                    background: "var(--lavender-400)",
                  }}
                >
                  Mulai Gratis
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}