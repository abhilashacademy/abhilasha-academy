import React from "react";
import AcademicsClient from "./AcademicsClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("academics");
}

export default function AcademicsPage() {
  return <AcademicsClient />;
}
