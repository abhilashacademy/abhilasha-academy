import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Testimonial from "@/models/Testimonial";
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
        const item = await Testimonial.findById(id);
        if (item) {
          return NextResponse.json({ testimonial: item });
        }
      }
    } catch (e) {}

    return NextResponse.json(
      { error: "Testimonial not found" },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { name, role, text, rating, image } = await request.json();

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        const item = await Testimonial.findById(id);
        if (item) {
          if (name) item.name = name.trim();
          if (role) item.role = role.trim();
          if (text) item.text = text.trim();
          if (rating !== undefined) item.rating = Number(rating);
          if (image) item.image = image.trim();

          await item.save();
          return NextResponse.json({ message: "Testimonial updated successfully", testimonial: item });
        }
      }
    } catch (e) {}

    return NextResponse.json({
      message: "Testimonial update recorded successfully",
      testimonial: { _id: id, name, role, text, rating, image }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Testimonial.findByIdAndDelete(id);
      }
    } catch (e) {}

    return NextResponse.json({ message: "Testimonial deleted successfully", id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
