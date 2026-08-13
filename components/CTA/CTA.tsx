"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../Common/Container";
import Button from "../Common/Button";
import AnimatedSection from "../Common/AnimatedSection";

export default function CTA() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <AnimatedSection variant="scale">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary via-primary-dark to-slate-900 overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 text-center text-white border border-white/5">
            
            {/* Background elements */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
              {/* Floating accent badge */}
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary font-bold text-xs uppercase tracking-widest mb-6 block">
                Enrollment Open • Academic Session 2026-27
              </span>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight uppercase mb-6">
                Take the First Step to Shape <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-400">
                  Your Child&apos;s Future
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                Join Abhilasha Academy and Maa Durga Abhilasha Inter College. Secure quality, value-based state board Hindi Medium education for classes 6 to 12. Register today to secure seats!
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
                <Button
                  href="/admissions"
                  variant="secondary"
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-amber-600 hover:from-amber-600 hover:to-secondary border-none w-full sm:w-auto shadow-xl shadow-secondary/20"
                >
                  Apply Online Now
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="text-white border-white/30 hover:border-white hover:bg-white hover:text-primary w-full sm:w-auto"
                >
                  Contact Admissions Desk
                </Button>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
