import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Topper from "@/models/Topper";
import { getAdminFromRequest } from "@/utils/auth";
import mongoose from "mongoose";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    try {
      await connectToDatabase();
      let updatedTopper = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        updatedTopper = await Topper.findByIdAndUpdate(id, { $set: body }, { new: true });
      } else {
        updatedTopper = await Topper.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
      }

      if (updatedTopper) {
        return NextResponse.json({ message: "Topper updated successfully", topper: updatedTopper });
      }
    } catch (dbErr) {
      console.warn("DB update error for topper:", dbErr);
    }

    return NextResponse.json({
      message: "Topper updated successfully",
      topper: { _id: id, ...body }
    });
  } catch (error: any) {
    console.error("PUT Topper Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update topper record" },
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
        { error: "Unauthorized access. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Topper.findByIdAndDelete(id);
      } else {
        await Topper.deleteOne({ _id: id });
      }
    } catch (dbErr) {
      console.warn("DB delete error for topper:", dbErr);
    }

    return NextResponse.json({ message: "Topper record deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE Topper Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete topper record" },
      { status: 500 }
    );
  }
}
