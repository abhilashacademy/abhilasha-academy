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
      }
    } catch (e) {}

    return NextResponse.json({ message: "Resource document deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete resource document" },
      { status: 500 }
    );
  }
}
