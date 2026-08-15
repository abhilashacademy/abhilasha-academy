"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { navItems, contactDetails, socialLinks } from "@/data/navigation";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPaperPlane 
} from "react-icons/fa";
import Container from "../Common/Container";
import Button from "../Common/Button";

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "Facebook":
      return <FaFacebookF className="w-3.5 h-3.5" />;
    case "Twitter":
      return <FaTwitter className="w-3.5 h-3.5" />;
    case "Instagram":
      return <FaInstagram className="w-3.5 h-3.5" />;
    case "Youtube":
      return <FaYoutube className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-8 border-t border-slate-900 relative overflow-hidden select-none">
      {/* Background visual glows */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-xl p-1 shadow-sm shrink-0">
                <Image
                  src="/logo.webp"
                  alt="Abhilasha Group Logo"
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-base uppercase tracking-wider">
                  Abhilasha
                </span>
                <span className="text-secondary font-bold text-xs uppercase tracking-widest leading-none">
                  Group of Academies
                </span>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-500 text-justify">
              Established in 2010, Abhilasha Academy and Maa Durga Abhilasha Inter College deliver value-based, quality UP & CBSE Board education for Classes Nursery to 12th in Hindi & English Medium to help nurture confident future leaders.
            </p>
            
            {/* Social media icons */}
            <div className="flex items-center gap-3.5 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-secondary text-slate-400 hover:text-primary flex items-center justify-center border border-slate-900 hover:border-secondary transition-all duration-300"
                  aria-label={social.label}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest relative pb-2 inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-secondary rounded-full" />
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {navItems.slice(0, 7).map((item) => {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-amber-400 group-hover:scale-125 transition-all shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Academics */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest relative pb-2 inline-block">
              Academics
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-secondary rounded-full" />
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-500">
              <li>
                <span className="text-slate-400 font-semibold block">Affiliation:</span>
                <span>UP & CBSE Board</span>
              </li>
              <li>
                <span className="text-slate-400 font-semibold block">Classes Offered:</span>
                <span>Classes Nursery to 12th</span>
              </li>
              <li>
                <span className="text-slate-400 font-semibold block">Medium:</span>
                <span>Hindi & English Medium</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest relative pb-2 inline-block">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-secondary rounded-full" />
            </h4>
            
            <div className="flex flex-col gap-3.5 text-sm text-slate-500">
              <a
                href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <FaPhoneAlt className="text-secondary w-3.5 h-3.5 shrink-0" />
                <span>{contactDetails.phone}</span>
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <FaEnvelope className="text-secondary w-3.5 h-3.5 shrink-0" />
                <span>{contactDetails.email}</span>
              </a>
              <a
                href={contactDetails.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <FaMapMarkerAlt className="text-secondary w-3.5 h-3.5 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">{contactDetails.address}</span>
              </a>
            </div>

            {/* Newsletter form */}
            <div className="flex flex-col gap-3 mt-4">
              <span className="text-white text-xs font-bold uppercase tracking-wider block">
                Subscribe to Circulars
              </span>
              
              {subscribed ? (
                <span className="text-xs text-secondary font-bold">
                  ✓ Successfully Subscribed!
                </span>
              ) : (
                <form onSubmit={handleSubscribe} className="flex h-11">
                  <input
                    type="email"
                    required
                    placeholder="Enter email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-900 text-white border border-slate-800 rounded-l-xl px-4 text-sm w-full focus:outline-none focus:border-primary placeholder:text-slate-600 focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-4 rounded-r-xl transition-colors duration-200 cursor-pointer flex items-center justify-center shrink-0"
                    aria-label="Subscribe email button"
                  >
                    <FaPaperPlane className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <span>
            © {new Date().getFullYear()} Abhilasha Group of Academies. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white">Inquiry Form</Link>
            <Link href="/admissions" className="hover:text-white">Fee Guidelines</Link>
            <span>Affiliation Code: 711264</span>
          </div>
        </div>

      </Container>
    </footer>
  );
}
