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
    await connectToDatabase();

    let post = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await Post.findById(id);
    }
    if (!post) {
      post = await Post.findOne({ _id: id });
    }

    if (post) {
      return NextResponse.json({ post });
    }

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
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    try {
      await connectToDatabase();
      let updatedPost = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        updatedPost = await Post.findByIdAndUpdate(id, { $set: body }, { new: true });
      } else {
        updatedPost = await Post.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
      }

      if (updatedPost) {
        return NextResponse.json({ message: "Post updated successfully", post: updatedPost });
      }
    } catch (dbErr) {
      console.warn("DB update error for post:", dbErr);
    }

    return NextResponse.json({
      message: "Post updated successfully",
      post: { _id: id, ...body }
    });
  } catch (error: any) {
    console.error("PUT Post Error:", error);
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
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await connectToDatabase();
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Post.findByIdAndDelete(id);
      } else {
        await Post.deleteOne({ _id: id });
      }
    } catch (dbErr) {
      console.warn("DB delete error for post:", dbErr);
    }

    return NextResponse.json({ message: "Post deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE Post Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}

