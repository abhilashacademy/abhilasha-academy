"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { navItems, contactDetails } from "@/data/navigation";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../Common/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const backdropVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const drawerVariants: Variants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const linkContainerVariants: Variants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const linkItemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-45"
          />

          {/* Fullscreen Navigation Drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-white z-48 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-10 mt-16">
              {/* Navigation Header Title */}
              <div>
                <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
                  Menu Navigation
                </span>
                <span className="text-primary font-extrabold text-2xl tracking-wide uppercase">
                  Abhilasha Academies
                </span>
              </div>

              {/* Navigation Links list */}
              <motion.div
                variants={linkContainerVariants}
                initial="closed"
                animate="open"
                className="flex flex-col gap-4"
              >
                {navItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <motion.div key={item.label} variants={linkItemVariants} className="flex flex-col gap-2 border-b border-slate-100 py-2">
                        <span className="text-lg font-bold text-slate-400 block tracking-wide uppercase text-xs">
                          {item.label}
                        </span>
                        <div className="flex flex-col gap-2 pl-4">
                          {item.subItems.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={onClose}
                                className={`text-lg font-bold tracking-wide block py-1.5 transition-colors duration-200 ${
                                  isSubActive ? "text-primary pl-1" : "text-slate-600 hover:text-primary"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  }

                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <motion.div key={item.label} variants={linkItemVariants}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`text-xl font-bold tracking-wide block py-2 border-b border-slate-100 transition-colors duration-200 ${
                          isActive
                            ? "text-primary border-primary/20 pl-2"
                            : "text-slate-600 hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom Section with Contacts and Admission CTA */}
            <div className="flex flex-col gap-8 mt-10">
              <Button
                href="/admissions"
                variant="secondary"
                fullWidth
                onClick={onClose}
                className="bg-gradient-to-r from-secondary to-amber-600 hover:from-amber-600 hover:to-secondary border-none"
              >
                Admission Open 2026-27
              </Button>

              <div className="flex flex-col gap-4 text-sm text-slate-500">
                <a
                  href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <FaPhoneAlt className="text-secondary w-4 h-4" />
                  <span>{contactDetails.phone}</span>
                </a>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <FaEnvelope className="text-secondary w-4 h-4" />
                  <span>{contactDetails.email}</span>
                </a>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-secondary w-4 h-4 mt-1 shrink-0" />
                  <span className="leading-snug">{contactDetails.address}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
