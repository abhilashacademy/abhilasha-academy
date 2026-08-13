"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface PopupSettings {
  popupEnabled: boolean;
  popupImage: string;
  popupButtonLink: string;
}

export default function AnnouncementPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<PopupSettings | null>(null);

  useEffect(() => {
    // If on admin routes (/admin), do not fetch or display popup
    if (pathname?.startsWith("/admin")) {
      return;
    }

    async function loadPopup() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          const siteSettings: PopupSettings = data.settings || {};
          setSettings(siteSettings);

          // If popup status is ON (enabled), show popup immediately on website load
          if (siteSettings.popupEnabled) {
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.warn("Failed to load popup settings:", err);
      }
    }

    loadPopup();
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Never render popup on admin panel or if popup is disabled
  if (pathname?.startsWith("/admin") || !settings || !settings.popupEnabled) {
    return null;
  }

  const posterSrc = settings.popupImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop";
  const targetLink = settings.popupButtonLink || "/admissions";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
          {/* Subtle Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Pure Image Poster Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-auto max-w-[92vw] sm:max-w-xl md:max-w-2xl max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-visible shadow-[0_0_50px_rgba(0,0,0,0.7),0_0_25px_rgba(245,158,11,0.3)] border-2 border-amber-400/60 z-10 my-auto bg-slate-950 flex items-center justify-center"
          >
            {/* Corner Close Button X */}
            <button
              onClick={handleClose}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 border-2 border-amber-400 text-white hover:bg-rose-600 hover:border-rose-500 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl hover:scale-110"
              aria-label="Close Popup"
            >
              <FaTimes className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Poster Image */}
            <Link href={targetLink} onClick={handleClose} className="block w-full max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden">
              <img
                src={posterSrc}
                alt="Announcement Poster"
                className="w-full max-h-[85vh] object-contain mx-auto block hover:scale-[1.01] transition-transform duration-500 rounded-2xl sm:rounded-3xl"
              />
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
