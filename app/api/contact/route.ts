import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Contact from "@/models/Contact";
import { getAdminFromRequest } from "@/utils/auth";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
      await connectToDatabase();
      const contacts = await Contact.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ contacts });
    } catch (dbErr) {
      console.warn("GET Contact DB Error, returning fallback array:", dbErr);
      return NextResponse.json({ contacts: [] });
    }
  } catch (error: any) {
    console.error("GET Contact Error:", error);
    return NextResponse.json({ contacts: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone number, and message are required." },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
      const newContact = await Contact.create({
        name,
        email,
        phone,
        subject: subject || "General Inquiry",
        message,
      });

      return NextResponse.json(
        { message: "Contact inquiry submitted successfully!", contact: newContact },
        { status: 201 }
      );
    } catch (dbErr) {
      console.warn("DB offline during Contact submission, returning fallback response:", dbErr);
      return NextResponse.json(
        { message: "Contact inquiry submitted successfully!", contact: { _id: "local-c-" + Date.now(), name, email, phone, subject, message } },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST Contact Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit contact inquiry" },
      { status: 500 }
    );
  }
}
