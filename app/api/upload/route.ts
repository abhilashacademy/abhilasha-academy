import { NextResponse } from "next/server";
import fs from "fs/promises";
import pathModule from "path";
import { getAdminFromRequest } from "@/utils/auth";

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided for upload" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique timestamped name
    const timestamp = Date.now();
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}_${sanitizedOriginalName}`;

    // Target directory: public/uploads
    const uploadDir = pathModule.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = pathModule.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    // Format human-readable file size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const fileSizeFormatted = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${Math.round(file.size / 1024)} KB`;

    return NextResponse.json({
      message: "File uploaded successfully",
      url: publicUrl,
      fileName: file.name,
      fileSize: fileSizeFormatted,
    });
  } catch (error: any) {
    console.error("File Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
