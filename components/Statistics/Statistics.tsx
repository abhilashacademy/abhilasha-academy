"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { statisticsData, Statistic } from "@/data/statistics";
import { Users, GraduationCap, Trophy, Award } from "lucide-react";
import Container from "../Common/Container";
import AnimatedSection from "../Common/AnimatedSection";

interface CounterCardProps {
  stat: Statistic;
  isInView: boolean;
}

const getStatIcon = (id: string) => {
  const iconProps = { className: "w-7 h-7" };
  switch (id) {
    case "students":
      return <Users {...iconProps} className="w-7 h-7 text-primary" />;
    case "teachers":
      return <GraduationCap {...iconProps} className="w-7 h-7 text-amber-600" />;
    case "results":
      return <Trophy {...iconProps} className="w-7 h-7 text-emerald-600" />;
    case "awards":
      return <Award {...iconProps} className="w-7 h-7 text-purple-600" />;
    default:
      return <Award {...iconProps} className="w-7 h-7 text-primary" />;
  }
};

const getStatBadgeBg = (id: string) => {
  switch (id) {
    case "students":
      return "bg-blue-50 border-blue-100/80";
    case "teachers":
      return "bg-amber-50 border-amber-100/80";
    case "results":
      return "bg-emerald-50 border-emerald-100/80";
    case "awards":
      return "bg-purple-50 border-purple-100/80";
    default:
      return "bg-slate-50 border-slate-100";
  }
};

const getStatAccentLine = (id: string) => {
  switch (id) {
    case "students":
      return "from-primary to-blue-500";
    case "teachers":
      return "from-secondary to-amber-500";
    case "results":
      return "from-emerald-500 to-teal-500";
    case "awards":
      return "from-purple-500 to-indigo-500";
    default:
      return "from-primary to-secondary";
  }
};

const CounterCard = ({ stat, isInView }: CounterCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000; // 2 seconds animation
    const incrementTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // larger step size to complete in 2s
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <div className="bg-white rounded-3xl p-4 border-2 border-slate-200/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_45px_rgba(10,57,129,0.16)] hover:border-primary/40 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 h-full justify-between">
      {/* Top Accent Gradient Bar */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getStatAccentLine(stat.id)}`} />

      <div className="flex flex-col items-center w-full">
        {/* Icon Badge */}
        <div className={`w-14 h-14 rounded-2xl ${getStatBadgeBg(stat.id)} border flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          {getStatIcon(stat.id)}
        </div>

        {/* Counter Number */}
        <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-2 select-none flex items-center tracking-tight">
          {count.toLocaleString()}
          <span className="text-secondary ml-0.5">{stat.suffix}</span>
        </span>

        {/* Label */}
        <h4 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-2">
          {stat.label}
        </h4>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium mt-1">
        {stat.description}
      </p>
    </div>
  );
};

export default function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-slate-100/90 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statisticsData.map((stat, idx) => (
            <AnimatedSection
              key={stat.id}
              variant="scale"
              delay={idx * 0.05}
              once={false}
              className="h-full"
            >
              <CounterCard stat={stat} isInView={isInView} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
