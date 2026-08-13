import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";
import Gallery from "@/models/Gallery";
import User from "@/models/User";
import Admission from "@/models/Admission";
import Contact from "@/models/Contact";
import Resource from "@/models/Resource";
import bcrypt from "bcryptjs";
import { newsData } from "@/data/news";
import { galleryData } from "@/data/gallery";

async function runSeed() {
  await connectToDatabase();

  let postsSeededCount = 0;
  let gallerySeededCount = 0;
  let admissionsSeededCount = 0;
  let contactsSeededCount = 0;
  let resourcesSeededCount = 0;
  let adminSeeded = false;

  // Seed Admin User
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    await User.create({
      name: "Super Administrator",
      email: "admin@abhilasha.org",
      mobile: "9876543210",
      password: hashedPassword,
    });
    adminSeeded = true;
  }

  // Seed Posts
  const postCount = await Post.countDocuments();
  if (postCount === 0) {
    const postsToSeed = newsData.map((item) => {
      let cat = item.category;
      if (!["Admissions Open", "Board Results", "Competitions", "Achievements", "General"].includes(cat)) {
        cat = "General" as any;
      }
      return {
        title: item.title,
        summary: item.summary,
        content: item.content,
        category: cat,
        date: item.date,
        image: item.image,
        author: item.author,
      };
    });
    const createdPosts = await Post.insertMany(postsToSeed);
    postsSeededCount = createdPosts.length;
  }

  // Seed Gallery
  const galleryCount = await Gallery.countDocuments();
  if (galleryCount === 0) {
    const createdGallery = await Gallery.insertMany(galleryData);
    gallerySeededCount = createdGallery.length;
  }

  // Seed Initial Admissions Sample
  const admissionCount = await Admission.countDocuments();
  if (admissionCount === 0) {
    const sampleAdmissions = [
      {
        studentName: "Rohan Sharma",
        parentName: "Vijay Sharma",
        email: "rohan.sharma@example.com",
        phone: "9876543210",
        targetClass: "11th Science",
        message: "Inquiring about hostel accommodation and lab facilities.",
        status: "Pending",
      },
      {
        studentName: "Ananya Patel",
        parentName: "Suresh Patel",
        email: "ananya.patel@example.com",
        phone: "9876543211",
        targetClass: "10th",
        message: "Looking for board preparation batch guidance.",
        status: "Reviewed",
      },
      {
        studentName: "Priya Singh",
        parentName: "Rajendra Singh",
        email: "priya.singh@example.com",
        phone: "9876543212",
        targetClass: "9th",
        message: "Would like campus tour before admission completion.",
        status: "Contacted",
      },
    ];
    const createdAdmissions = await Admission.insertMany(sampleAdmissions);
    admissionsSeededCount = createdAdmissions.length;
  }

  // Seed Initial Contact Sample
  const contactCount = await Contact.countDocuments();
  if (contactCount === 0) {
    const sampleContacts = [
      {
        name: "Test Parent",
        email: "parent@example.com",
        phone: "9876543210",
        subject: "Inquiry",
        message: "Testing contact submission",
        status: "New",
      },
    ];
    const createdContacts = await Contact.insertMany(sampleContacts);
    contactsSeededCount = createdContacts.length;
  }

  // Seed Default 6 Admission Resource Documents / Download Forms
  const defaultResources = [
    {
      title: "Admission Form",
      category: "ADMISSIONS",
      description: "Official registration sheet for admissions to nursery, class 6-12 board streams.",
      fileSize: "650 KB",
      fileUrl: "/uploads/admission_form.pdf",
    },
    {
      title: "Fee Structure",
      category: "ADMISSIONS",
      description: "Detailed description of tuition, development, examination, and computer lab fees.",
      fileSize: "1.2 MB",
      fileUrl: "/uploads/fee_structure.pdf",
    },
    {
      title: "School Prospectus",
      category: "GENERAL",
      description: "Comprehensive guide outlining academy history, director message, codes, and facilities.",
      fileSize: "3.5 MB",
      fileUrl: "/uploads/school_prospectus.pdf",
    },
    {
      title: "Holiday Calendar 2026-27",
      category: "ACADEMIC",
      description: "Full list of school terms, national holidays, summer/winter breaks, and parents meets.",
      fileSize: "620 KB",
      fileUrl: "/uploads/holiday_calendar_2026_27.pdf",
    },
    {
      title: "Academic Syllabus",
      category: "ACADEMIC",
      description: "Class-wise UP state board curriculum guidelines for High School & Intermediate.",
      fileSize: "2.1 MB",
      fileUrl: "/uploads/academic_syllabus.pdf",
    },
    {
      title: "Prescribed Books List",
      category: "ACADEMIC",
      description: "List of recommended Hindi medium textbooks and notebooks for classes 6 to 12.",
      fileSize: "410 KB",
      fileUrl: "/uploads/prescribed_books_list.pdf",
    },
  ];

  await Resource.deleteMany({});
  const createdResources = await Resource.insertMany(defaultResources);
  resourcesSeededCount = createdResources.length;

  return {
    adminSeeded,
    postsSeededCount,
    gallerySeededCount,
    admissionsSeededCount,
    contactsSeededCount,
    resourcesSeededCount,
  };
}

export async function GET() {
  try {
    const result = await runSeed();
    return NextResponse.json({
      message: "Database seed operation completed",
      details: result,
    });
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await runSeed();
    return NextResponse.json({
      message: "Database seed operation completed",
      details: result,
    });
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
