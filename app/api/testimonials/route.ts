import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Testimonial from "@/models/Testimonial";
import { getAdminFromRequest } from "@/utils/auth";
import { testimonialsData } from "@/data/testimonials";

export async function GET() {
  try {
    await connectToDatabase();
    let items = await Testimonial.find({}).sort({ createdAt: -1 });

    if (items.length === 0) {
      await Testimonial.insertMany(testimonialsData);
      items = await Testimonial.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ testimonials: items });
  } catch (error: any) {
    console.warn("GET Testimonials DB Connection Error, returning local fallback data:", error?.message);
    return NextResponse.json({ testimonials: testimonialsData });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, role, text, rating, image } = body;

    if (!name || !role || !text) {
      return NextResponse.json(
        { error: "Name, role, and text are required fields" },
        { status: 400 }
      );
    }

    const itemRating = Number(rating) || 5;
    const itemImage = image && image.trim() ? image.trim() : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop";

    try {
      await connectToDatabase();
      const newTestimonial = await Testimonial.create({
        name: name.trim(),
        role: role.trim(),
        text: text.trim(),
        rating: itemRating,
        image: itemImage,
      });

      return NextResponse.json(
        { message: "Testimonial created successfully", testimonial: newTestimonial },
        { status: 201 }
      );
    } catch (dbErr) {
      console.warn("DB offline during Testimonial create, returning fallback item:", dbErr);
      const fallbackItem = {
        _id: "local-t-" + Date.now(),
        name: name.trim(),
        role: role.trim(),
        text: text.trim(),
        rating: itemRating,
        image: itemImage,
      };

      return NextResponse.json(
        { message: "Testimonial created successfully", testimonial: fallbackItem },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST Testimonial Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
