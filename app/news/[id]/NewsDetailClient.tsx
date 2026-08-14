"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/data/news";
import { FaCalendarAlt, FaUser, FaArrowLeft, FaShareAlt, FaCheck, FaNewspaper, FaChevronRight } from "react-icons/fa";
import Container from "@/components/Common/Container";
import AnimatedSection from "@/components/Common/AnimatedSection";

export default function NewsDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [post, setPost] = useState<NewsItem | null>(null);
  const [otherPosts, setOtherPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // 1. Fetch specific post by ID from API
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.post) {
            setPost({
              id: data.post._id,
              title: data.post.title,
              summary: data.post.summary,
              content: data.post.content,
              category: data.post.category,
              date: data.post.date,
              image: data.post.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
              author: data.post.author || "School Admin",
            });
          }
        }

        // 2. Fetch all posts for sidebar (up to 10 recent links)
        const allRes = await fetch("/api/posts");
        if (allRes.ok) {
          const allData = await allRes.json();
          const mapped = (allData.posts || []).map((p: any) => ({
            id: p._id,
            title: p.title,
            summary: p.summary,
            content: p.content,
            category: p.category,
            date: p.date,
            image: p.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
            author: p.author || "School Admin",
          }));
          setOtherPosts(mapped.filter((item: any) => item.id !== id).slice(0, 10));
        }
      } catch (err) {
        console.error("Error loading article from database API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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

  if (loading) {
    return (
      <main className="pt-40 sm:pt-44 lg:pt-48 pb-24 min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-semibold tracking-wider uppercase">Loading Article Details...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="pt-40 sm:pt-44 lg:pt-48 pb-24 min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-100 shadow-2xl">
          <FaNewspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Article Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">The news article you are looking for may have been removed or updated.</p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All News</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Navigation Toolbar */}
        <AnimatedSection variant="fade-up" className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-700 font-bold text-xs sm:text-sm border border-slate-200/80 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Updates</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-700 font-bold text-xs sm:text-sm border border-slate-200/80 hover:bg-secondary hover:text-slate-900 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            {copied ? <FaCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FaShareAlt className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Share Article"}</span>
          </button>
        </AnimatedSection>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Article Content Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <AnimatedSection variant="fade-up">
              <article className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-10">
                
                {/* Meta Category & Date Pill */}
                <div className="flex items-center flex-wrap gap-4 mb-6">
                  <span className={`px-3.5 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider border ${getCategoryColor(post.category)} backdrop-blur-md bg-white/90 shadow-sm`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-secondary" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaUser className="text-secondary" />
                      {post.author}
                    </span>
                  </div>
                </div>

                {/* Main Article Header Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                  {post.title}
                </h1>

                {/* Executive Summary Box */}
                {post.summary && (
                  <div className="p-5 sm:p-6 bg-slate-50/80 border-l-4 border-primary rounded-r-2xl mb-8 shadow-inner">
                    <p className="text-slate-700 text-sm sm:text-base font-semibold italic leading-relaxed text-justify">
                      &ldquo;{post.summary}&rdquo;
                    </p>
                  </div>
                )}

                {/* Banner Featured Image */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg border border-slate-100 bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Article Content Paragraphs */}
                <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed flex flex-col gap-6 text-justify">
                  {post.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="text-slate-700 leading-relaxed font-normal text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Footer Tagline */}
                <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap justify-between items-center text-xs text-slate-400 gap-2">
                  <span>Published by Abhilasha Group of Academies</span>
                  <span>Gorakhpur, Uttar Pradesh</span>
                </div>

              </article>
            </AnimatedSection>
          </div>

          {/* Sidebar Column: 10 Recent Updates */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-36">
            <AnimatedSection variant="fade-left">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                    <FaNewspaper className="text-primary w-4.5 h-4.5" />
                    <span>Other Recent Updates</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-extrabold text-xs">
                    {otherPosts.length} Recent
                  </span>
                </div>

                {otherPosts.length > 0 ? (
                  <div className="flex flex-col gap-4 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
                    {otherPosts.map((item) => (
                      <Link
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="group flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-100/80 hover:border-primary/30 shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-18 w-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="100px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Text info */}
                        <div className="flex-grow min-w-0">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider border inline-block mb-1 ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                          <h4 className="text-slate-800 font-bold text-xs leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-slate-400 text-[10px] font-semibold block mt-1">
                            {item.date}
                          </span>
                        </div>

                        <FaChevronRight className="w-3 h-3 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">No other recent articles found.</p>
                )}
              </div>
            </AnimatedSection>
          </div>

        </div>
      </Container>
    </main>
  );
}
