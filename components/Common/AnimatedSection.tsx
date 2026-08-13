"use client";

import React, { useRef } from "react";
import { motion, useInView, UseInViewOptions } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale" | "none";
  duration?: number;
  delay?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className,
  variant = "fade-up",
  duration = 0.6,
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewOptions: UseInViewOptions = {
    once,
    margin: "-100px",
  };
  const isInView = useInView(ref, inViewOptions);

  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  const selectedVariant = variants[variant];

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={className?.includes("h-full") ? "h-full" : undefined}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={selectedVariant}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
