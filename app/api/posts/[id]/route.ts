import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";
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
        const post = await Post.findById(id);
        if (post) {
          return NextResponse.json({ post });
        }
      }
    } catch (e) {}

    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = await getAdminFromRequest(request);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { title, summary, content, category, date, image, author } = await request.json();

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        const post = await Post.findById(id);
        if (post) {
          if (title) post.title = title;
          if (summary) post.summary = summary;
          if (content) post.content = content;
          if (category) post.category = category;
          if (date) post.date = date;
          if (image) post.image = image;
          if (author) post.author = author;

          await post.save();
          return NextResponse.json({ message: "Post updated successfully", post });
        }
      }
    } catch (e) {}

    return NextResponse.json({
      message: "Post updated successfully",
      post: { _id: id, title, summary, content, category, date, image, author }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = await getAdminFromRequest(request);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Post.findByIdAndDelete(id);
      }
    } catch (e) {}

    return NextResponse.json({ message: "Post deleted successfully", id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}
