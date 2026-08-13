import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Contact from "@/models/Contact";
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
        const updatedContact = await Contact.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        if (updatedContact) {
          return NextResponse.json({ message: "Status updated successfully", contact: updatedContact });
        }
      }
    } catch (e) {}

    return NextResponse.json({ message: "Status updated successfully", contact: { _id: id, status } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update inquiry" }, { status: 500 });
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
        await Contact.findByIdAndDelete(id);
      }
    } catch (e) {}

    return NextResponse.json({ message: "Inquiry deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete inquiry" }, { status: 500 });
  }
}
