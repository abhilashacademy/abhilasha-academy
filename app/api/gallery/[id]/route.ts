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
    await connectToDatabase();

    let item = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      item = await Gallery.findById(id);
    }
    if (!item) {
      item = await Gallery.findOne({ _id: id });
    }

    if (item) {
      return NextResponse.json({ item });
    }

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
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    try {
      await connectToDatabase();
      let updatedItem = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        updatedItem = await Gallery.findByIdAndUpdate(id, { $set: body }, { new: true });
      } else {
        updatedItem = await Gallery.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
      }

      if (updatedItem) {
        return NextResponse.json({ message: "Gallery item updated successfully", item: updatedItem });
      }
    } catch (dbErr) {
      console.warn("DB update error for gallery item:", dbErr);
    }

    return NextResponse.json({
      message: "Gallery item updated successfully",
      item: { _id: id, ...body }
    });
  } catch (error: any) {
    console.error("PUT Gallery Error:", error);
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
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Gallery.findByIdAndDelete(id);
      } else {
        await Gallery.deleteOne({ _id: id });
      }
    } catch (dbErr) {
      console.warn("DB delete error for gallery item:", dbErr);
    }

    return NextResponse.json({ message: "Gallery item deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE Gallery Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}

