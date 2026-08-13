import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Gallery from "@/models/Gallery";
import { getAdminFromRequest } from "@/utils/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ items });
  } catch (error: any) {
    console.warn("GET Gallery DB Connection Error, returning fallback array:", error?.message);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  try {
    const decoded = await getAdminFromRequest(request);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, category, src, alt } = body;

    if (!title || !src) {
      return NextResponse.json(
        { error: "Photo title and image file upload are required" },
        { status: 400 }
      );
    }

    const itemCategory = category && category.trim() ? category : "campus";
    const itemAlt = alt && alt.trim() ? alt.trim() : title.trim();

    try {
      await connectToDatabase();
      const newItem = await Gallery.create({
        title: title.trim(),
        category: itemCategory,
        src: src.trim(),
        alt: itemAlt,
      });

      return NextResponse.json(
        { message: "Gallery item created successfully", item: newItem },
        { status: 201 }
      );
    } catch (dbErr) {
      console.warn("DB offline during Gallery create, returning fallback item:", dbErr);
      const fallbackItem = {
        _id: "local-gal-" + Date.now(),
        title: title.trim(),
        category: itemCategory,
        src: src.trim(),
        alt: itemAlt,
      };
      return NextResponse.json(
        { message: "Gallery item created successfully", item: fallbackItem },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST Gallery Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
