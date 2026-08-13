"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/data/news";
import { FaCalendarAlt, FaUser, FaSearch, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          const mappedNews = (data.posts || []).map((p: any) => ({
            id: p._id,
            title: p.title,
            summary: p.summary,
            content: p.content,
            category: p.category,
            date: p.date,
            image: p.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
            author: p.author || "School Admin",
          }));
          setNewsList(mappedNews);
        }
      } catch (err) {
        console.error("Failed to fetch news from database API:", err);
      }
    };
    fetchNews();
  }, []);

  // Reset pagination on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const categories = ["Latest", "Admissions Open", "Board Results", "Competitions", "Achievements"];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Admissions Open":
        return "bg-rose-500/10 text-rose-600 border-rose-200/50";
      case "Board Results":
        return "bg-amber-500/10 text-amber-600 border-amber-200/50";
      case "Competitions":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200/50";
      case "Achievements":
        return "bg-purple-500/10 text-purple-600 border-purple-200/50";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-200/50";
    }
  };

  // Filtered items
  const filteredNews = newsList.filter((item) => {
    const matchesCategory =
      selectedCategory === "Latest" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Header */}
        <AnimatedSection variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 block">
              Official Bulletins & Articles
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
              News & Circulars
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Stay updated with academic schedules, examination notifications, campus events, state board results, and achievements at Abhilasha Group of Academies.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6" />
          </div>
        </AnimatedSection>

        {/* Filter and Search Toolbar */}
        <AnimatedSection variant="fade-up" className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Category Chips */}
          <div className="flex items-center flex-wrap justify-center md:justify-start gap-2.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-white text-slate-600 hover:text-primary hover:bg-slate-50 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-all"
            />
            <FaSearch className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />
          </div>
        </AnimatedSection>

        {/* News Grid (9 Cards Max per Page) */}
        {paginatedNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((item, idx) => (
                <AnimatedSection
                  key={item.id}
                  variant="fade-up"
                  delay={idx * 0.05}
                  className="h-full"
                >
                  <article className="group bg-white rounded-3xl overflow-hidden border-2 border-slate-200/90 hover:border-primary shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 ease-out transform hover:-translate-y-2.5 hover:scale-[1.015] active:scale-[0.985] h-full flex flex-col justify-between">
                    {/* Image container */}
                    <Link href={`/news/${item.id}`} className="relative h-56 w-full overflow-hidden bg-slate-100 shrink-0 block">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${getCategoryColor(
                          item.category
                        )} backdrop-blur-md bg-white/90 z-10`}
                      >
                        {item.category}
                      </span>
                    </Link>

                    {/* Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Meta */}
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

                      <Link
                        href={`/news/${item.id}`}
                        className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-secondary transition-colors cursor-pointer group/btn"
                      >
                        <span>Read Full Article</span>
                        <FaArrowRight className="w-3.5 h-3.5 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <AnimatedSection variant="fade-up" className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-slate-200/80">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 flex items-center gap-1.5 shadow-sm"
                >
                  <FaChevronLeft className="w-3 h-3" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                          : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-primary/40"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next</span>
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </AnimatedSection>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm max-w-xl mx-auto">
            <p className="text-slate-500 text-lg font-semibold mb-2">No updates found.</p>
            <p className="text-slate-400 text-sm">Try modifying your filter query details.</p>
          </div>
        )}
      </Container>
    </main>
  );
}
