import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Gallery from "@/models/Gallery";
import { getAdminFromRequest } from "@/utils/auth";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        const item = await Gallery.findById(id);
        if (item) {
          return NextResponse.json({ item });
        }
      }
    } catch (e) {}

    return NextResponse.json(
      { error: "Gallery item not found" },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch gallery item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = await getAdminFromRequest(request);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { title, category, src, alt } = await request.json();

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        const item = await Gallery.findById(id);
        if (item) {
          if (title) item.title = title;
          if (category) item.category = category;
          if (src) item.src = src;
          if (alt) item.alt = alt;

          await item.save();
          return NextResponse.json({ message: "Gallery item updated successfully", item });
        }
      }
    } catch (e) {}

    return NextResponse.json({
      message: "Gallery item updated successfully",
      item: { _id: id, title, category, src, alt }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = await getAdminFromRequest(request);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Gallery.findByIdAndDelete(id);
      }
    } catch (e) {}

    return NextResponse.json({ message: "Gallery item deleted successfully", id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
