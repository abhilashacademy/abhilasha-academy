"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toppersData, YearToppers, StudentTopper, SubjectTopper } from "@/data/toppers";
import { Trophy, Medal, GraduationCap, Calendar, Star, Award, Shield, CheckCircle } from "lucide-react";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";

export default function ToppersGalleryPage() {
  const years = toppersData.map((d) => d.year);
  const [selectedYear, setSelectedYear] = useState<string>(years[0] || "2026");

  const currentYearData = toppersData.find((d) => d.year === selectedYear) || toppersData[0];

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
        <AnimatedSection variant="fade-up" className="flex justify-center gap-3 mb-16">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedYear === year
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-white text-slate-600 hover:text-primary hover:bg-slate-50 border border-slate-200"
              }`}
            >
              Academic Year {year}
            </button>
          ))}
        </AnimatedSection>

        {/* Toppers Cards Grid */}
        <div className="mb-24">
          <AnimatedSection variant="fade-up">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-8 text-center flex items-center justify-center gap-3">
              <Trophy className="text-secondary w-7 h-7" />
              <span>General Rank Holders - {selectedYear}</span>
            </h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="wait">
              {currentYearData.students.map((student, idx) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 relative flex flex-col justify-between"
                >
                  {/* Floating Rank Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-br from-secondary to-amber-600 text-white font-extrabold text-xs px-3.5 py-1 rounded-xl shadow-md border border-white/10 flex items-center gap-1.5 uppercase tracking-wide">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>Rank {student.rank}</span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden shrink-0">
                    <Image
                      src={student.photo}
                      alt={student.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />
                  </div>

                  {/* Details */}
                  <div className="p-6 text-center flex-grow flex flex-col justify-between gap-4">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-primary transition-colors">
                        {student.name}
                      </h4>
                      <span className="text-xs text-slate-400 font-semibold block mt-1 uppercase tracking-wider">
                        {student.board}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center bg-slate-50 rounded-2xl p-4 mt-2">
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
                        <span className="text-xs font-extrabold text-secondary block bg-secondary/10 px-2 py-0.5 rounded-lg">
                          {student.rankType}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Subject Toppers */}
        <div>
          <AnimatedSection variant="fade-up">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-8 text-center flex items-center justify-center gap-3">
              <Award className="text-secondary w-7 h-7" />
              <span>Subject-Wise Toppers - {selectedYear}</span>
            </h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {currentYearData.subjects.map((sub, idx) => (
                <motion.div
                  key={`${sub.subject}-${sub.studentName}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight group-hover:text-primary transition-colors">
                        {sub.subject}
                      </h4>
                      <span className="text-xs text-slate-400 block mt-0.5 font-medium">
                        Topper: {sub.studentName} ({sub.board})
                      </span>
                    </div>
                  </div>

                  <div className="bg-secondary/15 text-secondary-dark rounded-xl px-3 py-2 text-center min-w-[60px] shrink-0 border border-secondary/20">
                    <span className="text-xs text-slate-500 font-bold block uppercase leading-none mb-0.5">Marks</span>
                    <span className="text-lg font-black">{sub.marks}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Excellence Callout Box */}
        <AnimatedSection variant="fade-up" className="mt-24">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 text-white text-center relative border border-white/5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10">
              <Shield className="text-secondary w-14 h-14 mb-6 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-secondary mb-4">
                Inspiring Future Success
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
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
