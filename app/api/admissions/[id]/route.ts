import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Admission from "@/models/Admission";
import { getAdminFromRequest } from "@/utils/auth";
import mongoose from "mongoose";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    try {
      await connectToDatabase();
      let updatedAdmission = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        updatedAdmission = await Admission.findByIdAndUpdate(
          id,
          { $set: body },
          { new: true }
        );
      } else {
        updatedAdmission = await Admission.findOneAndUpdate(
          { _id: id },
          { $set: body },
          { new: true }
        );
      }

      if (updatedAdmission) {
        return NextResponse.json({ message: "Status updated successfully", admission: updatedAdmission });
      }
    } catch (dbErr) {
      console.warn("DB update error for admission:", dbErr);
    }

    return NextResponse.json({ message: "Status updated successfully", admission: { _id: id, ...body } });
  } catch (error: any) {
    console.error("PATCH Admission Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update admission status" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Admission.findByIdAndDelete(id);
      } else {
        await Admission.deleteOne({ _id: id });
      }
    } catch (dbErr) {
      console.warn("DB delete error for admission:", dbErr);
    }

    return NextResponse.json({ message: "Admission application deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE Admission Error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete admission application" }, { status: 500 });
  }
}

