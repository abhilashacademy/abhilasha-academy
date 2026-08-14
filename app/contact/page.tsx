import React from "react";
import ContactClient from "./ContactClient";
import { getPageSEO } from "@/utils/seo";

export async function generateMetadata() {
  return await getPageSEO("contact");
}

export default function ContactPage() {
  return <ContactClient />;
}
