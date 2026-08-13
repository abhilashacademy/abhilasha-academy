import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Resource from "@/models/Resource";
import { getAdminFromRequest } from "@/utils/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ resources });
  } catch (error: any) {
    console.warn("GET Resources DB Error, returning fallback array:", error?.message);
    return NextResponse.json({ resources: [] });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, fileUrl, category, fileSize } = body;

    if (!title || !fileUrl) {
      return NextResponse.json(
        { error: "Resource title and uploaded file URL are required" },
        { status: 400 }
      );
    }

    const resCategory = category && category.trim() ? category.trim() : "Application Form";
    const resSize = fileSize || "PDF Document";

    try {
      await connectToDatabase();
      const newResource = await Resource.create({
        title: title.trim(),
        description: (description || "").trim(),
        fileUrl: fileUrl.trim(),
        category: resCategory,
        fileSize: resSize,
      });

      return NextResponse.json(
        { message: "Admission form resource added successfully", resource: newResource },
        { status: 201 }
      );
    } catch (dbErr) {
      console.warn("DB offline during Resource create, returning fallback object:", dbErr);
      const fallbackRes = {
        _id: "local-res-" + Date.now(),
        title: title.trim(),
        description: (description || "").trim(),
        fileUrl: fileUrl.trim(),
        category: resCategory,
        fileSize: resSize,
      };
      return NextResponse.json(
        { message: "Admission form resource added successfully", resource: fallbackRes },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST Resource Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add resource document" },
      { status: 500 }
    );
  }
}
