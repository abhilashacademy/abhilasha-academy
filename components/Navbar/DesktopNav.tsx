"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/data/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ChevronDown } from "lucide-react";
import Button from "../Common/Button";
import Container from "../Common/Container";

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
  const isHome = pathname === "/";
  const isNavbarLight = isHome && !isScrolled;

  return (
    <nav
      className={`w-full transition-all duration-300 z-40 border-b ${
        isScrolled
          ? "glass-nav py-3 shadow-lg border-slate-200/85"
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 bg-white rounded-xl p-1 shadow-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.webp"
              alt="Abhilasha Group of Academies"
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-black text-xl md:text-2xl leading-none uppercase tracking-wide transition-colors duration-300 ${
              isNavbarLight
                ? "text-white group-hover:text-white/85"
                : "text-primary group-hover:text-secondary"
            }`}>
              Abhilasha
            </span>
            <span className={`font-bold text-[9px] md:text-[10px] leading-none uppercase tracking-[0.16em] mt-1 select-none transition-colors duration-300 ${
              isNavbarLight
                ? "text-white/80"
                : "text-secondary"
            }`}>
              Group of Academies
            </span>
          </div>
        </Link>

        {/* Central Nav Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            if (item.subItems) {
              const isChildActive = item.subItems.some((sub) => pathname === sub.href);

              return (
                <div key={item.label} className="relative group py-2">
                  <button
                    className={`px-3.5 py-2.5 rounded-xl text-[14px] font-bold tracking-wide transition-all duration-300 flex items-center gap-1 cursor-pointer select-none ${
                      isChildActive
                        ? isNavbarLight
                          ? "text-white bg-white/10"
                          : "text-primary bg-primary/5"
                        : isNavbarLight
                        ? "text-white/95 hover:text-white hover:bg-white/10"
                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 shrink-0 ${
                      isNavbarLight
                        ? "text-white/60 group-hover:text-white"
                        : "text-slate-400 group-hover:text-primary"
                    }`} />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-48 bg-white/95 backdrop-blur-md border border-slate-200/85 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.03)] p-1.5 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 flex flex-col gap-0.5">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`px-4 py-2 text-xs md:text-[13px] font-bold transition-all duration-200 block rounded-xl ${
                            isSubActive
                              ? "text-primary bg-primary/5"
                              : "text-slate-600 hover:text-primary hover:bg-primary/5"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3.5 py-2.5 rounded-xl text-[14px] font-bold tracking-wide transition-all duration-300 select-none ${
                  isActive
                    ? isNavbarLight
                      ? "text-white bg-white/10"
                      : "text-primary bg-primary/5"
                    : isNavbarLight
                    ? "text-white/95 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className={`absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full ${
                      isNavbarLight
                        ? "bg-white"
                        : "bg-gradient-to-r from-primary to-secondary"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTA / Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            href="/admissions"
            variant="secondary"
            className="hidden sm:inline-flex bg-gradient-to-r from-secondary to-amber-600 hover:from-amber-600 hover:to-secondary border-none shadow-md hover:shadow-lg shadow-secondary/15 hover:shadow-secondary/25 transition-all duration-300 font-bold uppercase tracking-wider text-[11px] py-2.5 px-5 rounded-2xl cursor-pointer"
          >
            Admissions Open
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onToggleMobileMenu}
            className={`lg:hidden p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
              isNavbarLight
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-slate-100 hover:bg-primary/5 text-slate-700 hover:text-primary"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenuAlt3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </Container>
    </nav>
  );
}
