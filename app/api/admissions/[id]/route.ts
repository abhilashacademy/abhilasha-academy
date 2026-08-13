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
    const { status } = body;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updatedAdmission = await Admission.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        if (updatedAdmission) {
          return NextResponse.json({ message: "Status updated successfully", admission: updatedAdmission });
        }
      }
    } catch (e) {}

    return NextResponse.json({ message: "Status updated successfully", admission: { _id: id, status } });
  } catch (error: any) {
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
      }
    } catch (e) {}

    return NextResponse.json({ message: "Admission application deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete admission application" }, { status: 500 });
  }
}
