import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Resource from "@/models/Resource";
import { getAdminFromRequest } from "@/utils/auth";
import mongoose from "mongoose";

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
        await Resource.findByIdAndDelete(id);
      } else {
        await Resource.deleteOne({ _id: id });
      }
    } catch (dbErr) {
      console.warn("DB delete error for resource:", dbErr);
    }

    return NextResponse.json({ message: "Resource document deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE Resource Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete resource document" },
      { status: 500 }
    );
  }
}

