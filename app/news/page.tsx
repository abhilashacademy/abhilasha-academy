import React from "react";
import NewsClient from "./NewsClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("news");
}

export default function NewsPage() {
  return <NewsClient />;
}
