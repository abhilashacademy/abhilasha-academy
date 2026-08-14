import React from "react";
import Gallery from "@/components/Gallery/Gallery";

import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("gallery");
}

export default function GalleryPage() {
  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-20 min-h-screen bg-brand-bg">
      <Gallery />
    </main>
  );
}
