import { Metadata } from "next";
import { connectToDatabase } from "@/utils/db";
import PageSEO from "@/models/PageSEO";

export interface DefaultSEOItem {
  pageSlug: string;
  pageName: string;
  title: string;
  description: string;
  keywords: string;
}

export const DEFAULT_PAGE_SEO: Record<string, DefaultSEOItem> = {
  home: {
    pageSlug: "home",
    pageName: "Home Page",
    title: "Abhilasha Group of Academies | Where Teaching is an Interest",
    description: "Established in 2010, Abhilasha Academy and Maa Durga Abhilasha Inter College provide affordable, value-based, quality English & Hindi medium education for classes Playgroup to 12th in Gaura, Kaptanganj Basti, Uttar Pradesh.",
    keywords: "Abhilasha Group of Academies, Abhilasha Academy, Maa Durga Abhilasha Inter College, Kaptanganj Basti School, UP Board School",
  },
  about: {
    pageSlug: "about",
    pageName: "About Us Page",
    title: "About Us | Abhilasha Group of Academies",
    description: "Learn about Abhilasha Academy & Maa Durga Abhilasha Inter College history, founder director message, vision, mission, and branches in Gaura, Kaptanganj Basti, UP.",
    keywords: "About Abhilasha Academy, School History, Director Hari Shankar Pandey, Vision Mission, Kaptanganj Basti",
  },
  academics: {
    pageSlug: "academics",
    pageName: "Academics Page",
    title: "Academic Programs & Curriculum | Abhilasha Group of Academies",
    description: "Explore our nursery to 12th class curriculum, examination schedules, subjects, streams, and academic achievements.",
    keywords: "Curriculum, UP Board Syllabus, Primary Classes, High School, Intermediate, Science Commerce Arts",
  },
  facilities: {
    pageSlug: "facilities",
    pageName: "Campus Facilities Page",
    title: "Campus Infrastructure & Facilities | Abhilasha Group of Academies",
    description: "Discover our science labs, computer labs, library, smart classrooms, sports ground, and campus CCTV security parameters.",
    keywords: "School Facilities, Science Lab, Computer Lab, Library, Smart Classrooms, Campus Security",
  },
  news: {
    pageSlug: "news",
    pageName: "News & Articles Page",
    title: "News & School Circulars | Abhilasha Group of Academies",
    description: "Stay updated with latest announcements, examination timetables, board results, and school events.",
    keywords: "School News, Circulars, Board Exam Updates, Announcements, Events",
  },
  admissions: {
    pageSlug: "admissions",
    pageName: "Admissions Page",
    title: "Admissions 2026-27 & Registration | Abhilasha Group of Academies",
    description: "Apply online for admission to Classes Nursery to 12th. View admission procedure, required documents, and fee guidelines.",
    keywords: "School Admission, Online Registration, Fee Structure, Admission Process, Form Download",
  },
  toppers: {
    pageSlug: "toppers",
    pageName: "Toppers Gallery Page",
    title: "Toppers Gallery & Wall of Fame | Abhilasha Group of Academies",
    description: "Celebrating our top ranking students in UP Board Class 10 High School and Class 12 Intermediate board examinations.",
    keywords: "District Toppers, Board Rankers, Academic Excellence, Merit List, Top Performers",
  },
  downloads: {
    pageSlug: "downloads",
    pageName: "Downloads Page",
    title: "Downloads & Official Forms | Abhilasha Group of Academies",
    description: "Download admission application forms, fee structure, academic syllabus, prospectus, and holiday calendar.",
    keywords: "Download Admission Form, School Prospectus, Fee Structure PDF, Syllabus Download",
  },
  contact: {
    pageSlug: "contact",
    pageName: "Contact Us Page",
    title: "Contact Us & Campus Address | Abhilasha Group of Academies",
    description: "Get in touch with our admissions helpline, director's office, or visit our campus in Gaura, Kaptanganj Basti, UP.",
    keywords: "Contact School, School Helpline, Campus Address, Admission Inquiry, Office Hours",
  },
  gallery: {
    pageSlug: "gallery",
    pageName: "Photo Gallery Page",
    title: "Campus Photo Gallery | Abhilasha Group of Academies",
    description: "View snapshots of campus life, classrooms, science laboratories, sports tournaments, and annual day events.",
    keywords: "School Gallery, Campus Photos, Classroom Pictures, Sports Events, Lab Photos",
  },
};

export async function getPageSEO(slug: string): Promise<Metadata> {
  const fallback = DEFAULT_PAGE_SEO[slug] || DEFAULT_PAGE_SEO.home;

  try {
    await connectToDatabase();
    const doc = await PageSEO.findOne({ pageSlug: slug.toLowerCase() });

    const title = doc?.title || fallback.title;
    const description = doc?.description || fallback.description;
    const keywordsStr = doc?.keywords || fallback.keywords;
    const keywordsArr = keywordsStr ? keywordsStr.split(",").map((k: string) => k.trim()) : [];

    return {
      title,
      description,
      keywords: keywordsArr.length > 0 ? keywordsArr : undefined,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error) {
    return {
      title: fallback.title,
      description: fallback.description,
      keywords: fallback.keywords.split(",").map((k) => k.trim()),
      openGraph: {
        title: fallback.title,
        description: fallback.description,
      },
    };
  }
}
