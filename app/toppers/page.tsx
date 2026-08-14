import React from "react";
import ToppersClient from "./ToppersClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("toppers");
}

export default function ToppersGalleryPage() {
  return <ToppersClient />;
}
