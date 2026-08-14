import React from "react";
import Hero from "@/components/Hero/Hero";
import QuickLinks from "@/components/QuickLinks/QuickLinks";
import AboutSection from "@/components/About/AboutSection";
import Facilities from "@/components/Facilities/Facilities";
import DirectorMessage from "@/components/DirectorMessage/DirectorMessage";
import Statistics from "@/components/Statistics/Statistics";
import Testimonials from "@/components/Testimonials/Testimonials";
import Gallery from "@/components/Gallery/Gallery";
import News from "@/components/News/News";
import CTA from "@/components/CTA/CTA";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("home");
}

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Hero banner slideshow */}
      <Hero />

      {/* 2. About Section collage/intro */}
      <AboutSection />

      {/* 3. Quick Portals Links */}
      <QuickLinks />

      {/* 4. Director Message quote layout */}
      <DirectorMessage />

      {/* 5. Campus Facilities showcase */}
      <Facilities />

      {/* 6. Statistics Counter cards */}
      <Statistics />

      {/* 7. Community Testimonials slider */}
      <Testimonials />

      {/* 8. Photo Gallery masonry grid */}
      <Gallery />

      {/* 9. Latest Updates & News */}
      <News />

      {/* 10. Admission Call To Action */}
      <CTA />
    </main>
  );
}