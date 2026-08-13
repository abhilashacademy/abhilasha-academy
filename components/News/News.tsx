"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/data/news";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import Button from "../Common/Button";
import AnimatedSection from "../Common/AnimatedSection";

export default function News() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          const mapped = (data.posts || []).map((p: any) => ({
            id: p._id,
            title: p.title,
            summary: p.summary,
            content: p.content,
            category: p.category,
            date: p.date,
            image: p.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
            author: p.author || "School Desk",
          }));
          setNewsList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch news posts from API:", err);
      }
    };
    fetchPosts();
  }, []);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Announcement":
      case "Admissions Open":
        return "bg-rose-500/10 text-rose-600 border-rose-200/50";
      case "Achievement":
      case "Board Results":
        return "bg-amber-500/10 text-amber-600 border-amber-200/50";
      case "Academics":
        return "bg-blue-500/10 text-blue-600 border-blue-200/50";
      case "Sports":
      case "Competitions":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200/50";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-200/50";
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <Container>
        {/* Title */}
        <AnimatedSection variant="fade-up" className="flex justify-between items-end mb-12">
          <Heading
            title="School Announcements & Updates"
            subtitle="News & Articles"
            className="mb-0"
          />
          <Button
            href="/news"
            variant="outline"
            className="hidden sm:inline-flex group items-center gap-2"
          >
            <span>All Updates</span>
            <FaArrowRight className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Button>
        </AnimatedSection>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.slice(0, 3).map((item, idx) => (
            <AnimatedSection
              key={item.id}
              variant="fade-up"
              delay={idx * 0.05}
              className="h-full"
            >
              <article className="group bg-white rounded-3xl overflow-hidden border-2 border-slate-200/90 hover:border-primary shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 ease-out transform hover:-translate-y-2.5 hover:scale-[1.015] active:scale-[0.985] h-full flex flex-col justify-between">
                
                {/* Image & Date Badge */}
                <Link href={`/news/${item.id}`} className="relative h-56 w-full overflow-hidden bg-slate-100 shrink-0 block">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  
                  {/* Category Pill floating */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${getCategoryColor(
                      item.category
                    )} backdrop-blur-md bg-white/90 z-10`}
                  >
                    {item.category}
                  </span>
                </Link>

                {/* Content Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-slate-400 text-xs mb-3 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-secondary" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaUser className="text-secondary" />
                        {item.author}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/news/${item.id}`}>
                      <h3 className="text-lg font-extrabold text-slate-800 leading-snug mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    {/* Summary */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  {/* Read Article Button */}
                  <Link
                    href={`/news/${item.id}`}
                    className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-secondary transition-colors cursor-pointer group/btn"
                  >
                    <span>Read Full Update</span>
                    <FaArrowRight className="w-3 h-3 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

              </article>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile secondary link button */}
        <div className="text-center mt-12 sm:hidden">
          <Button href="/news" variant="outline" className="w-full">
            View All Updates
          </Button>
        </div>
      </Container>
    </section>
  );
}
