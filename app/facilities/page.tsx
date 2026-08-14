import React from "react";
import FacilitiesClient from "./FacilitiesClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("facilities");
}

export default function FacilitiesPage() {
  return <FacilitiesClient />;
}
