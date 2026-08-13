"use client";

import React from "react";
import Link from "next/link";
import { quickLinksData } from "@/data/quicklinks";
import { Briefcase, Landmark, CalendarRange, Clock, BookOpen, Newspaper } from "lucide-react";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import AnimatedSection from "../Common/AnimatedSection";

const getIcon = (iconName: string, className: string) => {
  const iconProps = { className: `${className} w-8 h-8 transition-transform duration-300 group-hover:scale-110` };
  switch (iconName) {
    case "Briefcase":
      return <Briefcase {...iconProps} />;
    case "Landmark":
      return <Landmark {...iconProps} />;
    case "CalendarRange":
      return <CalendarRange {...iconProps} />;
    case "Clock":
      return <Clock {...iconProps} />;
    case "BookOpen":
      return <BookOpen {...iconProps} />;
    case "Newspaper":
      return <Newspaper {...iconProps} />;
    default:
      return null;
  }
};

export default function QuickLinks() {
  return (
    <section className="py-20 bg-brand-bg relative overflow-hidden">
      <Container>
        {/* Animated Heading */}
        <AnimatedSection variant="fade-up">
          <Heading
            title="Essential Quick Portals"
            subtitle="Get Connected"
            center
          />
        </AnimatedSection>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinksData.map((item, idx) => (
            <AnimatedSection
              key={item.id}
              variant="fade-up"
              delay={idx * 0.05}
              className="h-full"
            >
              <Link
                href={item.href}
                className="group flex flex-col justify-between p-8 rounded-3xl bg-white/70 border border-slate-100 hover:border-primary/20 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 h-full backdrop-blur-md relative overflow-hidden"
              >
                {/* Decorative Hover Background Glow */}
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:scale-150 transition-transform duration-500 blur-xl" />

                <div>
                  {/* Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.colorClass.split(" ")[0]} flex items-center justify-center mb-6`}
                  >
                    {getIcon(item.iconName, item.colorClass.split(" ").pop() || "")}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-sm font-bold text-primary group-hover:text-secondary transition-colors mt-auto">
                  <span>Open Portal</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
