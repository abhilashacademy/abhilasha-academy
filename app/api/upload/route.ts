import { NextResponse } from "next/server";
import fs from "fs/promises";
import pathModule from "path";
import { getAdminFromRequest } from "@/utils/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary if environment variables are set
const isCloudinaryConfigured = Boolean(
  (process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET) ||
    process.env.CLOUDINARY_URL
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cleanPublicId = filename.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "abhilasha_uploads",
        public_id: cleanPublicId,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) return reject(new Error("Cloudinary upload failed - no URL returned"));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

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

    let publicUrl: string = "";

    // 1. Try Cloudinary if configured
    if (isCloudinaryConfigured) {
      try {
        publicUrl = await uploadToCloudinary(buffer, filename);
      } catch (cloudinaryError: any) {
        console.error("Cloudinary upload failed, falling back:", cloudinaryError);
        publicUrl = "";
      }
    }

    // 2. If Cloudinary was not used or failed, attempt local disk write; fallback to Base64 Data URI if read-only (Vercel)
    if (!publicUrl) {
      try {
        const uploadDir = pathModule.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        const filePath = pathModule.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        publicUrl = `/uploads/${filename}`;
      } catch (fsError: any) {
        console.warn(
          "Local filesystem write failed (serverless/Vercel read-only filesystem). Converting file to Base64 Data URI.",
          fsError.code || fsError.message
        );

        const mimeType = file.type || "application/octet-stream";
        const base64Data = buffer.toString("base64");
        publicUrl = `data:${mimeType};base64,${base64Data}`;
      }
    }

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

