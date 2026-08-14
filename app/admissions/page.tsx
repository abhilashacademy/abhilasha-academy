import React from "react";
import AdmissionsClient from "./AdmissionsClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("admissions");
}

export default function AdmissionsPage() {
  return <AdmissionsClient />;
}
