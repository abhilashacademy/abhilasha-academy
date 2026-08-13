"use client";

import React from "react";
import Image from "next/image";
import { facilitiesData } from "@/data/facilities";
import { BookOpen, Laptop, ShieldCheck, Beaker, Trophy, Music, MonitorPlay, HeartPulse, Droplet, Sparkles, Shield, Bus } from "lucide-react";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";
import Button from "@/components/Common/Button";

const getFacilityIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" };
  switch (iconName) {
    case "BookOpen":
      return <BookOpen {...iconProps} />;
    case "Beaker":
      return <Beaker {...iconProps} />;
    case "Laptop":
      return <Laptop {...iconProps} />;
    case "Trophy":
      return <Trophy {...iconProps} />;
    case "Music":
      return <Music {...iconProps} />;
    case "MonitorPlay":
      return <MonitorPlay {...iconProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...iconProps} />;
    case "HeartPulse":
      return <HeartPulse {...iconProps} />;
    case "Droplet":
      return <Droplet {...iconProps} />;
    case "Sparkles":
      return <Sparkles {...iconProps} />;
    case "Bus":
      return <Bus {...iconProps} />;
    default:
      return <Shield {...iconProps} />;
  }
};

export default function FacilitiesPage() {
  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Page Header */}
        <AnimatedSection variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 block">
              Campus Tour
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
              School Infrastructure
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We take pride in offering high-quality learning assets, verified safety parameters, and recreational facilities to enrich student lives.
            </p>
          </div>
        </AnimatedSection>

        {/* Detailed Alternating Sections */}
        <div className="flex flex-col gap-24 mb-20">
          {facilitiesData.map((facility, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <AnimatedSection
                key={facility.id}
                variant={isEven ? "fade-right" : "fade-left"}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 bg-slate-100 group ${
                      !isEven ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                  </div>

                  {/* Info Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col gap-4 ${
                      !isEven ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary transition-all duration-300">
                        {getFacilityIcon(facility.iconName)}
                      </div>
                      <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                        {facility.title}
                      </h2>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {facility.description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-500 mt-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>Verified Safety Checks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>Modern Equipments</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>Dedicated Supervisors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>Clean Surroundings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Safety standards block */}
        <AnimatedSection variant="fade-up">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 text-white text-center relative border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
              <Shield className="text-secondary w-14 h-14 mb-6 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-secondary mb-4">
                Our Campus Security Promise
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                The safety of our students is of paramount importance. Our entire campus is under constant CCTV surveillance, and gate logs are verified by licensed securities officers.
              </p>
              <Button href="/contact" variant="outline" className="text-white border-white/20 hover:border-white hover:bg-white hover:text-primary">
                Inquire About Safety Policies
              </Button>
            </div>
          </div>
        </AnimatedSection>

      </Container>
    </main>
  );
}
