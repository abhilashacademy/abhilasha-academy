"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Check, AlertCircle, FileSpreadsheet, Calendar, BookOpen, Layers, ClipboardList } from "lucide-react";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";

interface DownloadItem {
  id: string;
  name: string;
  category: string;
  fileSize: string;
  fileType: string;
  description: string;
  iconName: string;
}

function DownloadsContent() {
  const searchParams = useSearchParams();
  const docParam = searchParams.get("doc");

  const downloads: DownloadItem[] = [
    {
      id: "admission-form",
      name: "Admission Form",
      category: "Admissions",
      fileSize: "1.2 MB",
      fileType: "PDF",
      description: "Official registration sheet for admissions to nursery, class 6-12 board streams.",
      iconName: "ClipboardList",
    },
    {
      id: "fee-structure",
      name: "Fee Structure",
      category: "Admissions",
      fileSize: "850 KB",
      fileType: "PDF",
      description: "Detailed description of tuition, development, examination, and computer lab fees.",
      iconName: "FileSpreadsheet",
    },
    {
      id: "prospectus",
      name: "School Prospectus",
      category: "General",
      fileSize: "4.5 MB",
      fileType: "PDF",
      description: "Comprehensive guide outlining academy history, director message, codes, and facilities.",
      iconName: "Layers",
    },
    {
      id: "holiday-calendar",
      name: "Holiday Calendar 2026-27",
      category: "Academic",
      fileSize: "620 KB",
      fileType: "PDF",
      description: "Full list of school terms, national holidays, summer/winter breaks, and parents meets.",
      iconName: "Calendar",
    },
    {
      id: "syllabus",
      name: "Academic Syllabus",
      category: "Academic",
      fileSize: "2.1 MB",
      fileType: "PDF",
      description: "Class-wise UP state board curriculum guidelines for High School & Intermediate.",
      iconName: "BookOpen",
    },
    {
      id: "books-list",
      name: "Prescribed Books List",
      category: "Academic",
      fileSize: "410 KB",
      fileType: "PDF",
      description: "List of recommended Hindi medium textbooks and notebooks for classes 6 to 12.",
      iconName: "FileText",
    },
  ];

  // Track downloading states
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [completedId, setCompletedId] = useState<string | null>(null);

  const getDocIcon = (iconName: string) => {
    const props = { className: "w-7 h-7 text-blue-600 shrink-0" };
    switch (iconName) {
      case "ClipboardList":
        return <ClipboardList {...props} />;
      case "FileSpreadsheet":
        return <FileSpreadsheet {...props} />;
      case "Layers":
        return <Layers {...props} />;
      case "Calendar":
        return <Calendar {...props} />;
      case "BookOpen":
        return <BookOpen {...props} />;
      default:
        return <FileText {...props} />;
    }
  };

  const handleDownload = (item: DownloadItem) => {
    if (downloadingId) return; // Prevent double downloads
    setDownloadingId(item.id);

    // Simulate progress
    setTimeout(() => {
      // Create mock file for browser download
      const element = document.createElement("a");
      const file = new Blob([
        `Abhilasha Group of Academies\n---------------------------\nDocument: ${item.name}\nCategory: ${item.category}\nFile Size: ${item.fileSize}\n\nNote: This is a placeholder file for verification purposes.`,
      ], { type: "text/plain" });
      
      element.href = URL.createObjectURL(file);
      element.download = `${item.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Finish state
      setDownloadingId(null);
      setCompletedId(item.id);

      // Clear completed status after 3 seconds
      setTimeout(() => {
        setCompletedId(null);
      }, 3000);
    }, 1500);
  };

  return (
    <Container>
      {/* Page Header */}
      <AnimatedSection variant="fade-up">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 block">
            Student Resource Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
            Downloads & Forms
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Find and download the latest admission sheets, academic syllabi, holiday lists, and details. Keep up with offline documentation requirements easily.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6" />
        </div>
      </AnimatedSection>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {downloads.map((item, idx) => {
          const isDownloading = downloadingId === item.id;
          const isCompleted = completedId === item.id;
          const isHighlighted = docParam === item.id;

          return (
            <AnimatedSection
              key={item.id}
              variant="fade-up"
              delay={idx * 0.05}
              className="h-full"
            >
              <div 
                className={`bg-white rounded-3xl p-6 sm:p-7 border-2 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden relative ${
                  isHighlighted 
                    ? "border-amber-400 ring-4 ring-amber-400/20 shadow-xl bg-gradient-to-br from-white to-amber-500/5" 
                    : "border-slate-200/90 shadow-lg shadow-slate-200/60"
                }`}
              >
                <div>
                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                      {getDocIcon(item.iconName)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-xl bg-slate-100/90 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                        {item.fileType}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-slate-100/90 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                        {item.fileSize}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-amber-500 font-extrabold text-[11px] uppercase tracking-wider block mb-3">
                    {item.category}
                  </span>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <button
                  onClick={() => handleDownload(item)}
                  disabled={isDownloading || isCompleted}
                  className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                    isCompleted
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/10"
                      : isDownloading
                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-wait"
                      : "bg-blue-50/70 text-blue-950 hover:text-white hover:bg-slate-900 border-blue-200/80 hover:border-slate-900 shadow-xs"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Downloaded!</span>
                    </>
                  ) : isDownloading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                      <span>Download Resource</span>
                    </>
                  )}
                </button>

              </div>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Offline Help Notice */}
      <AnimatedSection variant="fade-up" className="mt-20">
        <div className="bg-amber-500/5 rounded-3xl p-6 sm:p-8 border border-amber-500/25 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 mb-1.5 text-center sm:text-left">Need Physical Prospectus Packages?</h4>
            <p className="text-slate-500 text-sm leading-relaxed text-center sm:text-left">
              If you face issues downloading digital items, please walk in to the academy admissions office at Gaura, Kaptanganj Basti during office hours (Monday – Saturday: 9:00 AM – 4:00 PM). Parents can receive print materials directly.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </Container>
  );
}

export default function DownloadsPage() {
  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-center text-slate-400 py-20">Loading downloads portal...</div>}>
        <DownloadsContent />
      </Suspense>
    </main>
  );
}
