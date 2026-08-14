import React from "react";
import AboutClient from "./AboutClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("about");
}

export default function AboutPage() {
  return <AboutClient />;
}
