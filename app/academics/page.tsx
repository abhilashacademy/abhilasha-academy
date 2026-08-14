"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  BookOpen, 
  Award, 
  CheckCircle, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Book, 
  Baby, 
  School, 
  Shield, 
  Users, 
  Trophy 
} from "lucide-react";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";
import Button from "@/components/Common/Button";

interface ProgramDetail {
  id: string;
  name: string;
  classes: string;
  medium: string;
  curriculum: string;
  subjects: string[];
  description: string;
  highlights: string[];
}

function AcademicsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const programs: ProgramDetail[] = [
    {
      id: "pre-primary",
      name: "Pre Primary Level",
      classes: "Nursery, LKG, UKG",
      medium: "English Medium",
      curriculum: "Early Childhood Play-way & Montessori",
      description: "Our early childhood program is designed to spark curiosity, social intelligence, and motor skills in young minds. We use play-based methodologies, learning games, and creative storytelling to make transition to formal learning gentle and joy-filled.",
      highlights: ["Play-based Learning", "Kindergarten Activities", "Creative Arts", "Sensory Games", "Safe Protective Environment"],
      subjects: ["English Phonics", "Mathematics (Numbers)", "General Awareness", "Rhymes & Storytelling", "Drawing & Coloring", "Moral & Social Habits"],
    },
    {
      id: "primary",
      name: "Primary Level",
      classes: "Classes 1 to 5",
      medium: "English Medium",
      curriculum: "Modern English Medium Foundation Curriculum",
      description: "Instilling primary cognitive frameworks, arithmetic abilities, and communicative strength. We focus on establishing deep familiarity with elementary sciences, environment models, moral ethics, and dual language proficiency.",
      highlights: ["Foundation Studies", "Math & Science Basics", "Story Writing", "Physical Education", "Moral Values", "Language Labs"],
      subjects: ["English Literature & Grammar", "Mathematics (Arithmetic)", "Environmental Studies (EVS)", "General Science", "Hindi Language", "Computer Basics", "Art & Craft"],
    },
    {
      id: "middle-level",
      name: "Middle & Secondary Level",
      classes: "Classes 6 to 12",
      medium: "Hindi Medium (Maa Durga Abhilasha Inter College)",
      curriculum: "UP Madhyamik Shiksha Parishad (UP Board)",
      description: "Advanced subject-oriented instruction following the UP State Board curriculum. Students are guided through analytical science concepts, structured laboratory experiments, mathematics solutions, and preparation for board examinations.",
      highlights: ["UP State Board", "Fully Verified Laboratories", "Class 10 & 12 Board Coaching", "Monthly Assessments", "Disciplined Study Routines"],
      subjects: ["General & Special Hindi", "English Grammar & Lit", "Mathematics (Algebra, Trig)", "Physics, Chemistry, Biology Labs", "History, Civics, Geography", "Computer Applications", "Moral Science & Art"],
    },
    {
      id: "environment",
      name: "Learning Environment",
      classes: "Campus Infrastructure",
      medium: "Gaura Campus",
      curriculum: "Safety & Hygiene Protocols",
      description: "Providing a physical campus that nurtures mental and physical growth. With spacious, well-ventilated classrooms, pure RO drinking water, CCTV coverage, playground courts, and digital smart boards, students learn in absolute safety.",
      highlights: ["Spacious Classrooms", "Smart Boards", "CCTV Security", "Playgrounds", "Library", "Pure Drinking Water"],
      subjects: ["State-of-the-Art Science Labs", "Hi-Tech Computer Terminals", "Verified CCTV Gate Logs", "First Aid Room Facilities", "Ergonomic Student Seating", "Hygienic Clean Restrooms"],
    },
    {
      id: "faculty",
      name: "Our Faculty & Mentors",
      classes: "Experienced Team",
      medium: "Nurturing Mindsets",
      curriculum: "Student-Centric Approach",
      description: "Our teachers are certified, experienced, and highly dedicated professionals who look upon teaching not as a commercial business but as an interest. They offer personalized attention, continuous assessment, and character guidance.",
      highlights: ["Qualified Teachers", "Personal Attention", "Low Student-Teacher Ratio", "Regular Parent Meetings", "Continuous Mentoring"],
      subjects: ["Personalized Academic Counseling", "Regular Lesson Evaluations", "Remedial Coaching for Pupils", "Behavioral & Ethics Mentorship", "Innovative Teaching Tactics", "Dedicated Exam Supervisors"],
    },
    {
      id: "beyond",
      name: "Beyond Academics",
      classes: "All Student Levels",
      medium: "Holistic Development",
      curriculum: "Co-Curricular & Sports Syllabus",
      description: "Education extends far beyond textbooks. We encourage students to build leadership and self-confidence through cultural events, national holiday festivals, inter-school debate championships, quiz bowls, and sports meets.",
      highlights: ["Cultural Activities", "Sports Tournaments", "Debates & Quizzes", "Leadership Roles", "Social Responsibility"],
      subjects: ["Volleyball & Athletics Gala", "Speech & Debate Programs", "Art, Craft, & Science Fairs", "National Independence Day Acts", "Community Social Help Drives", "Character & Morals Camps"],
    },
  ];

  const [activeTab, setActiveTab] = useState(programs[0].id);

  useEffect(() => {
    if (tabParam && programs.some((p) => p.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const activeProg = programs.find((p) => p.id === activeTab) || programs[0];

  const getProgramIcon = (id: string) => {
    switch (id) {
      case "pre-primary":
        return <Baby className="w-5 h-5" />;
      case "primary":
        return <BookOpen className="w-5 h-5" />;
      case "middle-level":
        return <School className="w-5 h-5" />;
      case "environment":
        return <Shield className="w-5 h-5" />;
      case "faculty":
        return <Users className="w-5 h-5" />;
      case "beyond":
        return <Trophy className="w-5 h-5" />;
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <Container>
      {/* Page Header */}
      <AnimatedSection variant="fade-up">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 block">
            Our Curriculum
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
            Academic Programs & Campus Life
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed text-justify">
            Discover our educational pathways across different levels, custom learning systems, and programs designed to foster character and brilliance.
          </p>
        </div>
      </AnimatedSection>

      {/* 2-Column Split: Curriculum detail vs Tabs switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* Left Column: Switcher Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <AnimatedSection variant="fade-right" className="flex flex-col gap-3 bg-white p-5 rounded-3xl border border-slate-100 shadow-md">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-2 mb-2 block">
              Select Academics Level
            </span>
            {programs.map((prog) => (
              <button
                key={prog.id}
                onClick={() => setActiveTab(prog.id)}
                className={`w-full text-left px-5 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                  activeTab === prog.id
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/10"
                    : "bg-brand-bg text-slate-600 hover:text-primary hover:bg-slate-50 border-transparent"
                }`}
              >
                <span>{prog.name}</span>
                {getProgramIcon(prog.id)}
              </button>
            ))}
          </AnimatedSection>

          {/* Quick Stat info */}
          <AnimatedSection variant="fade-right" className="bg-gradient-to-br from-primary to-slate-900 rounded-3xl p-6 text-white shadow-lg mt-4">
            <h4 className="font-extrabold text-secondary text-base mb-2 uppercase tracking-wide">
              100% Board Results
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed mb-4 text-justify">
              Consistent pass percentages in Class 10 High School and Class 12 Board exams of the Uttar Pradesh Board.
            </p>
            <Button href="/admissions" variant="secondary" size="sm" className="w-full">
              Enroll Today
            </Button>
          </AnimatedSection>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-8">
          <AnimatedSection variant="fade-left">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-md flex flex-col gap-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />

              {/* Header details */}
              <div className="flex justify-between items-start flex-wrap gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
                    {activeProg.curriculum}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                    {activeProg.name}
                  </h2>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider shrink-0">
                  {activeProg.classes}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Overview</h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base text-justify">
                  {activeProg.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Program Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-500 font-semibold">
                  {activeProg.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle className="text-secondary w-4 h-4 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subjects / Scope list */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <Book className="w-5 h-5 text-secondary" />
                  <span>Subjects & Core Areas</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeProg.subjects.map((sub) => (
                    <div
                      key={sub}
                      className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg border border-slate-100 text-slate-700 text-sm font-semibold"
                    >
                      <CheckCircle className="text-emerald-600 w-4 h-4 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium callout */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-bold text-slate-800 block">Instructional Focus</span>
                  <span className="text-slate-500 text-xs">Standard academic practices and evaluations.</span>
                </div>
                <span className="px-3.5 py-1.5 rounded-xl bg-secondary/15 text-secondary-dark font-extrabold text-xs uppercase tracking-wider">
                  {activeProg.medium}
                </span>
              </div>

            </div>
          </AnimatedSection>
        </div>

      </div>

      {/* Academic Calendar details */}
      <AnimatedSection variant="fade-up">
        <Heading
          title="School Guidelines & Hours"
          subtitle="Operational Guidelines"
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Box 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 flex flex-col gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-slate-800 text-base">Class Hours</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed text-justify">
              Regular instructional cycles operate from Monday to Saturday, starting at 9:00 AM and concluding at 4:00 PM for office desks. Core academic classroom schedules are handled term-wise.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 flex flex-col gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-slate-800 text-base">Regular Assessments</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed text-justify">
              Periodic reviews and mock assessments are held every month. Half-yearly examinations happen in October, followed by final annual reviews in February/March.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 flex flex-col gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-slate-800 text-base">Board Registration</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed text-justify">
              Registration paperwork for Class 10 (High School) and Class 12 (Intermediate) Board examinations are handled systematically in accordance with state guidelines.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </Container>
  );
}

export default function AcademicsPage() {
  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-center text-slate-400 py-20">Loading academic details...</div>}>
        <AcademicsContent />
      </Suspense>
    </main>
  );
}
