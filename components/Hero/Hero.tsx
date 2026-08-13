"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Button from "../Common/Button";
import Container from "../Common/Container";

const heroImages = ["/hero1.jpeg", "/hero2.jpeg"];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen py-28 sm:py-36 md:py-44 overflow-hidden flex items-center justify-center bg-slate-950">
      {/* Background Slider with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={heroImages[currentIdx]}
              alt="Abhilasha Group of Academies Campus Hero Banner"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradients for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-slate-950/40 z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/15 z-1 mix-blend-overlay" />
      </div>

      {/* Floating abstract decorative shapes */}
      <div className="absolute inset-0 pointer-events-none z-2 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[8%] w-52 sm:w-72 h-52 sm:h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[25%] right-[10%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
        />
      </div>

      {/* Hero Content Overlay */}
      <Container className="relative z-10 text-center flex flex-col items-center my-auto">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center px-2"
        >
          {/* Tagline pill */}
          <motion.div
            variants={textItemVariants}
            className="mb-4 sm:mb-6 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
            <span className="text-secondary font-extrabold text-[11px] sm:text-xs md:text-sm tracking-widest uppercase">
              Admissions Open 2026-27
            </span>
          </motion.div>

          {/* Main Titles */}
          <motion.h1
            variants={textItemVariants}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase select-none mb-4 sm:mb-6"
          >
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-secondary">
              Abhilasha Group of Academies
            </span>
          </motion.h1>

          {/* Subheading Quote */}
          <motion.p
            variants={textItemVariants}
            className="text-slate-200 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide max-w-3xl leading-relaxed italic mb-8 sm:mb-10 text-center"
          >
            &ldquo;Where Teaching is Not a Business but an Interest. Hope Sustains Life.&rdquo;
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            variants={textItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-primary w-full sm:w-auto text-xs sm:text-sm"
            >
              Explore Campus
            </Button>
            <Button
              href="/admissions"
              variant="secondary"
              size="lg"
              className="bg-gradient-to-r from-secondary to-amber-600 hover:from-amber-600 hover:to-secondary border-none w-full sm:w-auto shadow-xl shadow-secondary/25 text-xs sm:text-sm"
            >
              Apply Now
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Slider Controls & Navigation Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-3">
        {/* Indicator Dots */}
        <div className="flex items-center gap-2 bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIdx === idx ? "w-8 bg-secondary" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
