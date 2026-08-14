"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toppersData } from "@/data/toppers";
import { Trophy, Medal, GraduationCap, Calendar, Star, Award, Shield, CheckCircle } from "lucide-react";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";

export default function ToppersClient() {
  const [dbToppers, setDbToppers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/toppers");
        if (res.ok) {
          const data = await res.json();
          if (data.toppers && Array.isArray(data.toppers)) {
            setDbToppers(data.toppers);
          }
        }
      } catch (err) {
        console.error("Error fetching toppers from API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchToppers();
  }, []);

  // Compute Available Years
  const years = React.useMemo(() => {
    if (dbToppers.length > 0) {
      const yearSet = new Set(dbToppers.map((t) => t.year));
      return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
    }
    return toppersData.map((d) => d.year);
  }, [dbToppers]);

  const [selectedYear, setSelectedYear] = useState<string>("2026");

  useEffect(() => {
    if (years.length > 0 && !years.includes(selectedYear)) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  // Current year students & subjects
  const { currentStudents, currentSubjects } = React.useMemo(() => {
    if (dbToppers.length > 0) {
      const yearItems = dbToppers.filter((t) => t.year === selectedYear);
      const students = yearItems
        .filter((t) => t.category !== "Subject Topper")
        .map((t) => ({
          id: t._id || t.id,
          name: t.name,
          photo: t.photo || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
          percentage: t.percentage,
          rank: t.rank || 1,
          board: t.board || "Intermediate (Class 12)",
          rankType: t.rankType || "District Rank",
        }));

      const subjects = yearItems
        .filter((t) => t.category === "Subject Topper")
        .map((t) => ({
          subject: t.subject || "Subject",
          studentName: t.name,
          marks: t.marks || t.percentage,
          board: t.board || "Class 12",
        }));

      return { currentStudents: students, currentSubjects: subjects };
    }

    // Fallback static data if no DB toppers created yet
    const fallbackGroup = toppersData.find((d) => d.year === selectedYear) || toppersData[0];
    return {
      currentStudents: fallbackGroup?.students || [],
      currentSubjects: fallbackGroup?.subjects || [],
    };
  }, [dbToppers, selectedYear]);

  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Page Header */}
        <AnimatedSection variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 block">
              Wall of Fame
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
              Toppers Gallery
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Celebrating our students' outstanding academic excellence in the UP State Board Examinations. Their dedication and hard work continue to inspire generations.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6" />
          </div>
        </AnimatedSection>

        {/* Year Filter Tabs */}
        {years.length > 0 && (
          <AnimatedSection variant="fade-up" className="mb-14">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-7 py-3 rounded-full text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0 shadow-sm ${
                    selectedYear === year
                      ? "bg-primary text-white shadow-xl shadow-primary/25 scale-[1.03] border-2 border-primary"
                      : "bg-white text-slate-700 hover:text-primary hover:bg-slate-50 border-2 border-slate-200/80 hover:border-primary/40"
                  }`}
                >
                  Academic Year {year}
                </button>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Toppers Cards Grid */}
        <div className="mb-20">
          <AnimatedSection variant="fade-up">
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center">
                General Rank Holders - {selectedYear}
              </h2>
            </div>
          </AnimatedSection>

          {currentStudents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <AnimatePresence mode="wait">
                {currentStudents.map((student, idx) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Floating Rank Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md border border-white/20 flex items-center gap-1.5 uppercase tracking-wide">
                      <Star className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Rank {student.rank}</span>
                    </div>

                    {/* Photo Container */}
                    <div className="relative h-64 w-full bg-slate-100 overflow-hidden shrink-0">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 object-center"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/10 to-transparent" />
                    </div>

                    {/* Details */}
                    <div className="p-6 text-center flex-grow flex flex-col justify-between gap-4">
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-primary transition-colors">
                          {student.name}
                        </h4>
                        <span className="text-xs text-slate-500 font-semibold block mt-1 uppercase tracking-wider">
                          {student.board}
                        </span>
                      </div>

                      <div className="border-t border-slate-100 pt-4 flex justify-between items-center bg-slate-50/80 rounded-2xl p-4 mt-2 border border-slate-200/50">
                        <div className="text-left">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                            Percentage
                          </span>
                          <span className="text-xl font-black text-primary block leading-none">
                            {student.percentage}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                            Level
                          </span>
                          <span className="text-xs font-extrabold text-amber-700 block bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                            {student.rankType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-14 bg-white rounded-3xl border border-slate-200/70 shadow-sm">
              <p className="text-slate-500 text-sm font-semibold">No rank holder toppers listed for {selectedYear} yet.</p>
            </div>
          )}
        </div>

        {/* Subject Toppers */}
        {currentSubjects.length > 0 && (
          <div className="mb-20">
            <AnimatedSection variant="fade-up">
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center">
                  Subject-Wise Toppers - {selectedYear}
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              <AnimatePresence mode="wait">
                {currentSubjects.map((sub, idx) => (
                  <motion.div
                    key={`${sub.subject}-${sub.studentName}-${idx}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex justify-between items-center gap-4 group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-primary transition-colors truncate">
                          {sub.subject}
                        </h4>
                        <span className="text-xs text-slate-500 block mt-1 font-medium truncate">
                          Topper: <span className="font-bold text-slate-700">{sub.studentName}</span> ({sub.board})
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-50 text-amber-800 rounded-xl px-3.5 py-2.5 text-center min-w-[70px] shrink-0 border border-amber-200/60 shadow-xs">
                      <span className="text-[10px] text-amber-700/80 font-bold block uppercase tracking-wider leading-none mb-1">Marks</span>
                      <span className="text-xl font-black text-amber-900 leading-none">{sub.marks}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Excellence Callout Box */}
        <AnimatedSection variant="fade-up" className="mt-20">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 text-white text-center relative border border-white/10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
              <Shield className="text-secondary w-14 h-14 mb-6 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-secondary mb-4">
                Inspiring Future Success
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 text-justify">
                Every topper's success story is a product of our dedicated teachers, structured exam assessment schedules, verified laboratories, and supportive parent trust. We continue to strive for academic distinction each session.
              </p>
              <div className="flex gap-6 items-center text-xs font-semibold text-slate-400 uppercase tracking-widest border-t border-white/10 pt-6 w-full justify-center flex-wrap">
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-secondary w-4 h-4" />
                  <span>100% Board Success</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-secondary w-4 h-4" />
                  <span>Personal Guidance</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-secondary w-4 h-4" />
                  <span>District Rank 1 Records</span>
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </main>
  );
}
