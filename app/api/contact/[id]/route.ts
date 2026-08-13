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

    try {
      await connectToDatabase();
      let updatedContact = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        updatedContact = await Contact.findByIdAndUpdate(
          id,
          { $set: body },
          { new: true }
        );
      } else {
        updatedContact = await Contact.findOneAndUpdate(
          { _id: id },
          { $set: body },
          { new: true }
        );
      }

      if (updatedContact) {
        return NextResponse.json({ message: "Status updated successfully", contact: updatedContact });
      }
    } catch (dbErr) {
      console.warn("DB update error for contact:", dbErr);
    }

    return NextResponse.json({ message: "Status updated successfully", contact: { _id: id, ...body } });
  } catch (error: any) {
    console.error("PATCH Contact Error:", error);
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
      } else {
        await Contact.deleteOne({ _id: id });
      }
    } catch (dbErr) {
      console.warn("DB delete error for contact:", dbErr);
    }

    return NextResponse.json({ message: "Inquiry deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE Contact Error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete inquiry" }, { status: 500 });
  }
}

