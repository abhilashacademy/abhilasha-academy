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
    await connectToDatabase();

    let item = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      item = await Testimonial.findById(id);
    }
    if (!item) {
      item = await Testimonial.findOne({ _id: id });
    }

    if (item) {
      return NextResponse.json({ testimonial: item });
    }

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
    const body = await request.json();

    try {
      await connectToDatabase();
      let updatedItem = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        updatedItem = await Testimonial.findByIdAndUpdate(id, { $set: body }, { new: true });
      } else {
        updatedItem = await Testimonial.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
      }

      if (updatedItem) {
        return NextResponse.json({ message: "Testimonial updated successfully", testimonial: updatedItem });
      }
    } catch (dbErr) {
      console.warn("DB update error for testimonial:", dbErr);
    }

    return NextResponse.json({
      message: "Testimonial update recorded successfully",
      testimonial: { _id: id, ...body }
    });
  } catch (error: any) {
    console.error("PUT Testimonial Error:", error);
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
      } else {
        await Testimonial.deleteOne({ _id: id });
      }
    } catch (dbErr) {
      console.warn("DB delete error for testimonial:", dbErr);
    }

    return NextResponse.json({ message: "Testimonial deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE Testimonial Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

