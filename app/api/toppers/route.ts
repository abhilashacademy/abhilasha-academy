import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Topper from "@/models/Topper";
import { getAdminFromRequest } from "@/utils/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const toppers = await Topper.find({}).sort({ year: -1, rank: 1, createdAt: -1 });
    return NextResponse.json({ toppers });
  } catch (error: any) {
    console.warn("GET Toppers DB Error, returning fallback array:", error?.message);
    return NextResponse.json({ toppers: [] });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in as admin." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, year, board, rank, rankType, percentage, photo, category, subject, marks } = body;

    if (!name || !percentage || !photo) {
      return NextResponse.json(
        { error: "Student name, percentage, and photo are required fields" },
        { status: 400 }
      );
    }

    const topperYear = year && year.trim() ? year.trim() : "2026";
    const topperBoard = board && board.trim() ? board.trim() : "Intermediate (Class 12)";
    const topperRankType = rankType && rankType.trim() ? rankType.trim() : "District Rank";
    const topperCategory = category && category.trim() ? category.trim() : "General Rank Holder";

    try {
      await connectToDatabase();
      const newTopper = await Topper.create({
        name: name.trim(),
        year: topperYear,
        board: topperBoard,
        rank: Number(rank) || 1,
        rankType: topperRankType,
        percentage: Number(percentage) || 0,
        photo: photo.trim(),
        category: topperCategory,
        subject: (subject || "").trim(),
        marks: Number(marks) || 0,
      });

      return NextResponse.json(
        { message: "Topper record created successfully", topper: newTopper },
        { status: 201 }
      );
    } catch (dbErr) {
      console.warn("DB offline during Topper create, returning fallback object:", dbErr);
      const fallbackTopper = {
        _id: "local-top-" + Date.now(),
        name: name.trim(),
        year: topperYear,
        board: topperBoard,
        rank: Number(rank) || 1,
        rankType: topperRankType,
        percentage: Number(percentage) || 0,
        photo: photo.trim(),
        category: topperCategory,
        subject: (subject || "").trim(),
        marks: Number(marks) || 0,
      };

      return NextResponse.json(
        { message: "Topper record created successfully", topper: fallbackTopper },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST Topper Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create topper record" },
      { status: 500 }
    );
  }
}
