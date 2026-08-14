import React from "react";
import DownloadsClient from "./DownloadsClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("downloads");
}

export default function DownloadsPage() {
  return <DownloadsClient />;
}
