import React from "react";
import Gallery from "@/components/Gallery/Gallery";

export const metadata = {
  title: "Campus Gallery - Abhilasha Group of Academies",
  description: "View snapshots of life at Abhilasha Academy and Maa Durga Abhilasha Inter College, featuring laboratories, classrooms, and sports tournaments.",
};

export default function GalleryPage() {
  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-20 min-h-screen bg-brand-bg">
      <Gallery />
    </main>
  );
}
