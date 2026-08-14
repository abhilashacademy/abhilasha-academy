import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";
import Gallery from "@/models/Gallery";
import User from "@/models/User";
import Admission from "@/models/Admission";
import Contact from "@/models/Contact";
import Resource from "@/models/Resource";
import Facility from "@/models/Facility";
import Testimonial from "@/models/Testimonial";
import bcrypt from "bcryptjs";

async function purgeAllSeedData() {
  await connectToDatabase();

  // Ensure Admin User exists
  const adminUser = await User.findOne({
    email: { $in: ["abhilasha558@gmail.com", "admin@abhilasha.org"] },
  });
  if (!adminUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    await User.create({
      name: "Super Administrator",
      email: "abhilasha558@gmail.com",
      mobile: "+91 9956789374",
      password: hashedPassword,
    });
  }

  // Delete all mock/seed data permanently
  await Post.deleteMany({});
  await Gallery.deleteMany({});
  await Admission.deleteMany({});
  await Contact.deleteMany({});
  await Resource.deleteMany({});
  await Facility.deleteMany({});
  await Testimonial.deleteMany({});

  return { message: "All seed and mock data purged permanently from database." };
}

export async function GET() {
  try {
    const result = await purgeAllSeedData();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to purge database seed" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await purgeAllSeedData();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to purge database seed" }, { status: 500 });
  }
}
