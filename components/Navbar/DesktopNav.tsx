"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems, NavItem } from "@/data/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ChevronDown, Sparkles } from "lucide-react";

interface DesktopNavProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
}

export default function DesktopNav({
  onToggleMobileMenu,
  isMobileMenuOpen,
  isScrolled,
}: DesktopNavProps) {
  const pathname = usePathname();

  // Exactly 7 quick links at top
  const top7NavItems = navItems.slice(0, 7);

  const isItemActive = (item: NavItem) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    if (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) {
      return true;
    }
    if (item.subItems) {
      return item.subItems.some((sub) => {
        const cleanHref = sub.href.split("?")[0].split("#")[0];
        return pathname === sub.href || (cleanHref !== "/" && pathname.startsWith(cleanHref));
      });
    }
    return false;
  };

  return (
    <nav className="w-full pt-3 pb-1 px-3 sm:px-6 transition-all duration-500 z-40 select-none">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 px-4 sm:px-6 py-2 flex items-center justify-between ${
          isScrolled
            ? "bg-slate-950/95 border border-amber-400/40 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            : "bg-slate-950/80 border border-white/15 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-amber-400/25"
        }`}
      >
        {/* Brand Logo and Title */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 md:w-11 md:h-11 bg-white/95 rounded-2xl p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)] ring-2 ring-amber-400/40 group-hover:ring-amber-400 transition-all duration-300 group-hover:scale-105">
            <Image
              src="/logo.webp"
              alt="Abhilasha Group of Academies"
              fill
              sizes="44px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg md:text-xl leading-none uppercase tracking-wide bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:to-amber-100 transition-all duration-300">
              Abhilasha
            </span>
            <span className="font-extrabold text-[9px] md:text-[10px] leading-none uppercase tracking-[0.18em] text-amber-400/90 mt-1 select-none">
              Group of Academies
            </span>
          </div>
        </Link>

        {/* Central Nav Links - Exactly 7 Top Quick Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {top7NavItems.map((item) => {
            const active = isItemActive(item);

            if (item.subItems) {
              return (
                <div key={item.label} className="relative group py-1">
                  <button
                    className={`relative px-3.5 py-2 rounded-full text-[13.5px] font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer select-none ${
                      active
                        ? "text-amber-300 font-extrabold border-2 border-amber-400 bg-amber-400/15 shadow-[0_0_20px_rgba(251,191,36,0.35)]"
                        : "text-slate-200 hover:text-amber-300 hover:bg-white/10 border border-transparent hover:border-amber-400/30"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full border-2 border-amber-400 bg-amber-400/15 shadow-[0_0_20px_rgba(251,191,36,0.35)] pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {active && (
                      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:rotate-180 shrink-0 ${
                      active ? "text-amber-300" : "text-slate-400 group-hover:text-amber-300"
                    }`} />
                  </button>

                  {/* Creative Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-52 bg-slate-950/95 backdrop-blur-2xl border border-amber-400/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 flex flex-col gap-1">
                    <div className="w-10 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mb-1 opacity-70" />
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`px-3.5 py-2 rounded-xl text-xs md:text-[13px] font-bold transition-all duration-200 flex items-center justify-between ${
                            isSubActive
                              ? "text-amber-300 bg-amber-400/20 border-l-4 border-amber-400 font-extrabold shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                              : "text-slate-300 hover:text-amber-300 hover:bg-amber-400/10 hover:border-l-4 hover:border-amber-400/60"
                          }`}
                        >
                          <span>{sub.label}</span>
                          {isSubActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-full text-[13.5px] font-bold tracking-wide transition-all duration-300 select-none flex items-center gap-1.5 ${
                  active
                    ? "text-amber-300 font-extrabold border-2 border-amber-400 bg-amber-400/15 shadow-[0_0_20px_rgba(251,191,36,0.35)]"
                    : "text-slate-200 hover:text-amber-300 hover:bg-white/10 border border-transparent hover:border-amber-400/30"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full border-2 border-amber-400 bg-amber-400/15 shadow-[0_0_20px_rgba(251,191,36,0.35)] pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {active && (
                  <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/admissions"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-300/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
            <span>Admissions Open</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 hover:text-white hover:bg-amber-400/20 cursor-pointer transition-all duration-200 shadow-md"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiMenuAlt3 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

