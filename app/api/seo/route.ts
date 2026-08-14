import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import PageSEO from "@/models/PageSEO";
import { getAdminFromRequest } from "@/utils/auth";
import { DEFAULT_PAGE_SEO } from "@/utils/seo";

export async function GET() {
  try {
    await connectToDatabase();
    const seoDocs = await PageSEO.find({}).lean();
    
    // Map docs into a dictionary by pageSlug
    const seoMap: Record<string, any> = {};
    for (const doc of seoDocs) {
      seoMap[doc.pageSlug] = doc;
    }

    // Merge with defaults so all pages are present
    const result: Record<string, any> = {};
    for (const slug of Object.keys(DEFAULT_PAGE_SEO)) {
      const defaultItem = DEFAULT_PAGE_SEO[slug];
      const savedDoc = seoMap[slug];

      result[slug] = {
        pageSlug: slug,
        pageName: defaultItem.pageName,
        title: savedDoc?.title || defaultItem.title,
        description: savedDoc?.description || defaultItem.description,
        keywords: savedDoc?.keywords !== undefined ? savedDoc.keywords : defaultItem.keywords,
        updatedAt: savedDoc?.updatedAt || null,
      };
    }

    return NextResponse.json({ seo: result });
  } catch (error: any) {
    console.warn("GET /api/seo DB Error, returning defaults:", error?.message);
    const result: Record<string, any> = {};
    for (const slug of Object.keys(DEFAULT_PAGE_SEO)) {
      const defaultItem = DEFAULT_PAGE_SEO[slug];
      result[slug] = {
        pageSlug: slug,
        pageName: defaultItem.pageName,
        title: defaultItem.title,
        description: defaultItem.description,
        keywords: defaultItem.keywords,
        updatedAt: null,
      };
    }
    return NextResponse.json({ seo: result });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in as admin." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { pageSlug, title, description, keywords } = body;

    if (!pageSlug || !title || !description) {
      return NextResponse.json(
        { error: "Page slug, title, and description are required." },
        { status: 400 }
      );
    }

    const slugLower = String(pageSlug).trim().toLowerCase();

    await connectToDatabase();

    const updated = await PageSEO.findOneAndUpdate(
      { pageSlug: slugLower },
      {
        pageSlug: slugLower,
        title: String(title).trim(),
        description: String(description).trim(),
        keywords: keywords !== undefined ? String(keywords).trim() : "",
      },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({
      message: `SEO settings updated for ${slugLower}`,
      seo: updated,
    });
  } catch (error: any) {
    console.error("PUT /api/seo Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update SEO settings" },
      { status: 500 }
    );
  }
}
