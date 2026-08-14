import React from "react";
import NewsDetailClient from "./NewsDetailClient";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    await connectToDatabase();
    const post = await Post.findById(id).lean();
    if (post) {
      const metaTitle = post.metaTitle ? post.metaTitle : `${post.title} | Abhilasha Group of Academies`;
      const metaDescription = post.metaDescription ? post.metaDescription : (post.summary || post.content?.slice(0, 160));
      const keywords = post.metaKeywords ? post.metaKeywords.split(",").map((k: string) => k.trim()) : undefined;

      return {
        title: metaTitle,
        description: metaDescription,
        keywords: keywords,
        openGraph: {
          title: metaTitle,
          description: metaDescription,
          images: post.image ? [{ url: post.image }] : [],
        },
      };
    }
  } catch (err) {}

  return {
    title: "News & Article Details | Abhilasha Group of Academies",
    description: "Official news bulletin and announcement details from Abhilasha Group of Academies.",
  };
}

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <NewsDetailClient params={params} />;
}
