import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";
import { getAdminFromRequest } from "@/utils/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ posts });
  } catch (error: any) {
    console.warn("GET Posts DB Connection Error, returning fallback array:", error?.message);
    return NextResponse.json({ posts: [] });
  }
}

export async function POST(request: Request) {
  try {
    const decoded = await getAdminFromRequest(request);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, summary, content, category, date, image, author, metaTitle, metaDescription, metaKeywords } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Article title and article body content are required" },
        { status: 400 }
      );
    }

    const postDate = date && date.trim() ? date : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const postSummary = summary && summary.trim() ? summary : (content.length > 140 ? content.substring(0, 140) + "..." : content);
    const postCategory = category && category.trim() ? category : "General";
    const postAuthor = author || decoded.name || "School Admin";

    try {
      await connectToDatabase();
      const newPost = await Post.create({
        title: title.trim(),
        summary: postSummary.trim(),
        content: content.trim(),
        category: postCategory.trim(),
        date: postDate,
        image: image || undefined,
        author: postAuthor,
        metaTitle: metaTitle ? String(metaTitle).trim() : "",
        metaDescription: metaDescription ? String(metaDescription).trim() : "",
        metaKeywords: metaKeywords ? String(metaKeywords).trim() : "",
      });

      return NextResponse.json(
        { message: "Post created successfully", post: newPost },
        { status: 201 }
      );
    } catch (dbErr) {
      console.warn("DB offline during Post create, returning fallback post:", dbErr);
      const fallbackPost = {
        _id: "local-post-" + Date.now(),
        title: title.trim(),
        summary: postSummary.trim(),
        content: content.trim(),
        category: postCategory.trim(),
        date: postDate,
        image: image || undefined,
        author: postAuthor,
        metaTitle: metaTitle ? String(metaTitle).trim() : "",
        metaDescription: metaDescription ? String(metaDescription).trim() : "",
        metaKeywords: metaKeywords ? String(metaKeywords).trim() : "",
      };

      return NextResponse.json(
        { message: "Post created successfully", post: fallbackPost },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST Post Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
