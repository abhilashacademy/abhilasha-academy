import React from "react";
import { cn } from "@/utils/cn";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  light?: boolean;
  hideLine?: boolean;
}

export default function Heading({
  title,
  subtitle,
  center = false,
  className,
  light = false,
  hideLine = false,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col",
        center ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {subtitle && (
        <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2 block">
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-extrabold tracking-tight relative inline-block",
          !hideLine && "pb-4",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
        {!hideLine && (
          <span
            className={cn(
              "absolute bottom-0 h-1 w-16 rounded-full",
              center ? "left-1/2 -translate-x-1/2" : "left-0",
              "bg-gradient-to-r from-primary to-secondary"
            )}
          />
        )}
      </h2>
    </div>
  );
}
