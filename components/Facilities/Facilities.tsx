"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { facilitiesData } from "@/data/facilities";
import { BookOpen, Laptop, ShieldCheck, Beaker, Trophy, Music, MonitorPlay, HeartPulse, Droplet, Sparkles, Shield, Bus } from "lucide-react";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import AnimatedSection from "../Common/AnimatedSection";

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

export default function Facilities() {
  const [facilities, setFacilities] = useState<any[]>(facilitiesData);

  useEffect(() => {
    async function loadFacilities() {
      try {
        const res = await fetch("/api/facilities");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.facilities) && data.facilities.length > 0) {
            setFacilities(data.facilities);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic facilities, using fallback:", err);
      }
    }
    loadFacilities();
  }, []);

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-[20%] left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-72 h-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Title */}
        <AnimatedSection variant="fade-up">
          <Heading
            title="World-Class Learning Infrastructure"
            subtitle="Campus Facilities"
            center
          />
        </AnimatedSection>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {facilities.map((facility: any, idx: number) => (
            <AnimatedSection
              key={facility._id || facility.id || idx}
              variant="fade-up"
              delay={idx * 0.05}
              className="h-full animate-delay-200"
            >
              <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-primary/20 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 h-full flex flex-col justify-between">

                {/* Visual Image container with hover zoom */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating Icon Circle */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm group-hover:bg-primary flex items-center justify-center shadow-lg transition-all duration-300 z-10">
                    {getFacilityIcon(facility.iconName)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>

                {/* Facility Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors duration-200">
                      {facility.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed text-justify">
                      {facility.description}
                    </p>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
