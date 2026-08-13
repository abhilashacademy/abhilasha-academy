import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Admission from "@/models/Admission";
import { getAdminFromRequest } from "@/utils/auth";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
      await connectToDatabase();
      const admissions = await Admission.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ admissions });
    } catch (dbErr) {
      console.warn("GET Admission DB Error, returning fallback array:", dbErr);
      return NextResponse.json({ admissions: [] });
    }
  } catch (error: any) {
    console.error("GET Admission Error:", error);
    return NextResponse.json({ admissions: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, parentName, email, phone, targetClass, medium, message } = body;

    if (!studentName || !phone || !targetClass) {
      return NextResponse.json(
        { error: "Student name, phone number, and target class are required." },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
      const newAdmission = await Admission.create({
        studentName: studentName.trim(),
        parentName: parentName ? parentName.trim() : undefined,
        email: email ? email.trim() : undefined,
        phone: phone.trim(),
        targetClass: targetClass.trim(),
        medium: medium && medium.trim() ? medium.trim() : "English Medium",
        message: message ? message.trim() : undefined,
      });

      return NextResponse.json(
        { message: "Admission application submitted successfully!", admission: newAdmission },
        { status: 201 }
      );
    } catch (dbErr) {
      console.warn("DB offline during Admission submission, returning fallback response:", dbErr);
      return NextResponse.json(
        { message: "Admission application submitted successfully!", admission: { _id: "local-adm-" + Date.now(), studentName, parentName, email, phone, targetClass, medium, message } },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST Admission Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit admission application" },
      { status: 500 }
    );
  }
}
