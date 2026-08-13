"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/10 focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary-dark shadow-md shadow-secondary/10 focus:ring-secondary",
    accent: "bg-accent text-white hover:bg-red-600 shadow-md shadow-accent/10 focus:ring-accent",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-primary hover:bg-primary/5 focus:ring-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const content = <>{children}</>;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn("inline-block", fullWidth && "w-full")}
      >
        <Link href={href} className={buttonClasses} onClick={onClick as any}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}
