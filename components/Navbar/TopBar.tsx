import React from "react";
import { contactDetails, socialLinks } from "@/data/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Container from "../Common/Container";
import Link from "next/link";

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "Facebook":
      return <FaFacebookF className="w-3 h-3" />;
    case "Twitter":
      return <FaTwitter className="w-3 h-3" />;
    case "Instagram":
      return <FaInstagram className="w-3 h-3" />;
    case "Youtube":
      return <FaYoutube className="w-3 h-3" />;
    default:
      return null;
  }
};

export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-300 border-b border-amber-500/20 py-2 text-xs hidden sm:block relative z-40 select-none">
      <Container className="flex justify-between items-center">
        {/* Contact info */}
        <div className="flex items-center gap-5">
          <Link
            href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 hover:text-amber-300 transition-colors duration-200 group"
          >
            <FaPhoneAlt className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium tracking-wide">{contactDetails.phone}</span>
          </Link>
          <div className="h-3 w-[1px] bg-slate-800" />
          <Link
            href={`mailto:${contactDetails.email}`}
            className="flex items-center gap-2 hover:text-amber-300 transition-colors duration-200 group"
          >
            <FaEnvelope className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium tracking-wide">{contactDetails.email}</span>
          </Link>
          <div className="h-3 w-[1px] bg-slate-800 hidden lg:block" />
          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <FaClock className="w-3.5 h-3.5 text-amber-400/80" />
            <span>{contactDetails.timings}</span>
          </div>
        </div>

        {/* Center Ticker / Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-wide shadow-[0_0_10px_rgba(251,191,36,0.15)]">
          <HiSparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Admissions Open for Session 2026-27</span>
        </div>

        {/* Social media icons */}
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-slate-800/80 border border-white/10 hover:border-amber-400/60 hover:bg-amber-400 text-slate-300 hover:text-slate-950 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_12px_rgba(251,191,36,0.5)] hover:scale-110"
              aria-label={social.label}
            >
              {getSocialIcon(social.icon)}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

