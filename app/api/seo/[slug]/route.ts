import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import PageSEO from "@/models/PageSEO";
import { DEFAULT_PAGE_SEO } from "@/utils/seo";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const slugLower = slug.toLowerCase();
  const fallback = DEFAULT_PAGE_SEO[slugLower] || DEFAULT_PAGE_SEO.home;

  try {
    await connectToDatabase();
    const doc = await PageSEO.findOne({ pageSlug: slugLower }).lean();

    if (doc) {
      return NextResponse.json({
        seo: {
          pageSlug: doc.pageSlug,
          pageName: fallback.pageName,
          title: doc.title,
          description: doc.description,
          keywords: doc.keywords,
          updatedAt: doc.updatedAt,
        },
      });
    }

    return NextResponse.json({
      seo: {
        pageSlug: slugLower,
        pageName: fallback.pageName,
        title: fallback.title,
        description: fallback.description,
        keywords: fallback.keywords,
        updatedAt: null,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      seo: {
        pageSlug: slugLower,
        pageName: fallback.pageName,
        title: fallback.title,
        description: fallback.description,
        keywords: fallback.keywords,
        updatedAt: null,
      },
    });
  }
}
