"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, ClipboardList, BookOpen, AlertCircle, Send, FileText, Download, Calendar, Layers, Table } from "lucide-react";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";
import Button from "@/components/Common/Button";

export default function AdmissionsClient() {
  const steps = [
    {
      step: "01",
      title: "Registration Inquiry",
      description: "Submit the online inquiry form below or visit our physical campus front desk to procure a registration brochure.",
    },
    {
      step: "02",
      title: "Document Submission",
      description: "Fill the registration sheet and submit required certificates (Aadhar, Birth Proof, Marks Cards, Transfer Certificate) to the admin desk.",
    },
    {
      step: "03",
      title: "Student Review",
      description: "A minor academic assessment check is conducted for Class 6 to 12 entry to determine current understanding levels.",
    },
    {
      step: "04",
      title: "Fee Payment & Admission",
      description: "Upon approval, fulfill the fee parameters at the cashier cell to secure student enrollment status.",
    },
  ];

  const requiredDocuments = [
    "Prior Class Report Card / Marks Sheet",
    "Original Transfer Certificate (TC) signed by previous school authority",
    "Birth Certificate copy",
    "Aadhar Card copies of the Student and Parents",
    "4 Passport-sized recent photographs of the Student",
    "Category Certificate (if claiming quota benefits - SC/ST/OBC)",
  ];

  // Inquiry form states
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    medium: "English Medium",
    targetClass: "Playgroup / Nursery",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Downloadable resources state
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        if (data.resources) setResources(data.resources);
      })
      .catch((err) => console.error("Error loading resources:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.targetClass) {
      setErrorMessage("Please fill in student name, phone number, and target class.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit admission application.");
      }

      setFormSubmitted(true);
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        medium: "English Medium",
        targetClass: "Playgroup / Nursery",
        message: "",
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  const getResourceIcon = (title: string, category: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("admission") || lower.includes("form")) return <ClipboardList className="w-5 h-5 text-blue-600 shrink-0" />;
    if (lower.includes("fee")) return <Table className="w-5 h-5 text-blue-600 shrink-0" />;
    if (lower.includes("prospectus")) return <Layers className="w-5 h-5 text-blue-600 shrink-0" />;
    if (lower.includes("holiday") || lower.includes("calendar")) return <Calendar className="w-5 h-5 text-blue-600 shrink-0" />;
    if (lower.includes("syllabus") || lower.includes("academic")) return <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />;
    return <FileText className="w-5 h-5 text-blue-600 shrink-0" />;
  };

  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-20 min-h-screen bg-brand-bg select-none">
      <Container>
        {/* Page Header */}
        <AnimatedSection variant="fade-up" className="mb-16">
          <Heading
            title="Admission Procedure & Registration"
            subtitle="Enroll Your Child"
            center
          />
          <p className="text-center text-slate-500 max-w-2xl mx-auto -mt-4 text-sm sm:text-base leading-relaxed text-justify">
            Welcome to the admissions portal of Abhilasha Group of Academies. We maintain an open, merit-guided entry protocol for Class 6 to Class 12 applicants across all streams.
          </p>
        </AnimatedSection>

        {/* Process Timeline Steps */}
        <div className="mb-24" id="process">
          <AnimatedSection variant="fade-up">
            <Heading
              title="Four-Step Admission Journey"
              subtitle="Process Roadmap"
              center
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, idx) => (
              <AnimatedSection
                key={item.step}
                variant="fade-up"
                delay={idx * 0.05}
                className="h-full animate-delay-200"
              >
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 relative h-full flex flex-col justify-between group overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div>
                    <span className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors block mb-4">
                      {item.step}
                    </span>
                    <h3 className="font-extrabold text-slate-800 text-lg mb-2.5 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Dynamic Downloadable Resources & Admission Forms Grid */}
        <div className="mb-24" id="forms">
          <AnimatedSection variant="fade-up">
            <Heading
              title="Official Admission Forms & Downloadable Resources"
              subtitle="Download Documents & Application Packets"
              center
            />
          </AnimatedSection>

          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((res: any, idx: number) => (
                <AnimatedSection
                  key={res._id || idx}
                  variant="fade-up"
                  delay={idx * 0.05}
                >
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden relative">
                    <div>
                      {/* Icon & Pills Header */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-xs">
                          {getResourceIcon(res.title, res.category)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="bg-slate-100/90 text-slate-500 text-[10px] font-extrabold px-3 py-1 rounded-xl uppercase tracking-wider">
                            PDF
                          </span>
                          <span className="bg-slate-100/90 text-slate-500 text-[10px] font-extrabold px-3 py-1 rounded-xl uppercase tracking-wider">
                            {res.fileSize || "FILE"}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-slate-900 font-extrabold text-lg mb-1 group-hover:text-primary transition-colors">
                        {res.title}
                      </h4>

                      {/* Category Tag */}
                      <div className="text-amber-500 font-extrabold text-[11px] uppercase tracking-wider mb-3">
                        {res.category || "ADMISSIONS"}
                      </div>

                      {/* Description */}
                      {res.description ? (
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 text-justify">
                          {res.description}
                        </p>
                      ) : (
                        <div className="mb-4" />
                      )}
                    </div>

                    {/* Download Button */}
                    <a
                      href={res.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-blue-50/70 hover:bg-slate-900 text-blue-950 hover:text-white rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xs cursor-pointer border border-blue-200/80 hover:border-slate-900"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Resource</span>
                    </a>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-semibold">Downloadable forms are being updated by the admission desk.</p>
            </div>
          )}
        </div>

        {/* 2-Column Split: Checklists vs Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Requirements & Guidelines */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Required Docs box */}
            <AnimatedSection variant="fade-right" className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
              
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2.5">
                <ClipboardList className="text-secondary w-6 h-6" />
                <span>Required Documentation</span>
              </h3>
              
              <ul className="flex flex-col gap-4 text-sm text-slate-500 font-medium">
                {requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-600 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="leading-snug">{doc}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Fee Philosophy Info Box */}
            <AnimatedSection variant="fade-right" className="bg-gradient-to-br from-primary to-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2.5">
                <FileText className="text-secondary w-6 h-6" />
                <span>Admission Fee Policy</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 text-justify">
                Abhilasha Academy has remained committed to value-based, affordable learning since 2010. Our tuition fees are kept structured and reasonable, ensuring high-quality education is accessible to all students.
              </p>
              <div className="flex gap-2 items-center bg-white/5 p-3 rounded-xl text-xs text-amber-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Exact fee charts are available at the accounts office depending on the student&apos;s specific class registration.</span>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7" id="register">
            <AnimatedSection variant="fade-left">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />
                
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Admission Inquiry Form</h3>
                <p className="text-slate-500 text-xs sm:text-sm mb-8 leading-relaxed text-justify">
                  Fill details below to schedule an evaluation or request prospectus packets. Our team will contact you back within 24 hours.
                </p>

                {formSubmitted ? (
                  <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 text-center flex flex-col items-center gap-4">
                    <CheckCircle className="text-emerald-600 w-12 h-12" />
                    <div>
                      <h4 className="text-emerald-800 font-extrabold text-lg mb-1">Inquiry Submitted Successfully!</h4>
                      <p className="text-emerald-600 text-sm leading-relaxed">
                        Thank you for your interest in Abhilasha Group of Academies. The admissions desk coordinator will contact you shortly on the phone number provided.
                      </p>
                    </div>
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      variant="outline"
                      className="mt-2 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {errorMessage && (
                      <div className="p-4 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-medium">
                        {errorMessage}
                      </div>
                    )}
                    {/* Rows */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="studentName" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          Student Full Name <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          required
                          value={formData.studentName}
                          onChange={handleInputChange}
                          className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                          placeholder="Ex: Rajesh Kumar"
                        />
                      </div>

                      {/* Parent Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="parentName" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          Parent / Guardian Name
                        </label>
                        <input
                          type="text"
                          id="parentName"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                          placeholder="Ex: Ramesh Kumar"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                          placeholder="parent@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          Phone Contact Number <span className="text-accent">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                          placeholder="Ex: 9876543210"
                        />
                      </div>
                    </div>

                    {/* Medium & Class Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Select Medium (Hindi & English only) */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="medium" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          Medium of Instruction <span className="text-accent">*</span>
                        </label>
                        <select
                          id="medium"
                          name="medium"
                          value={formData.medium}
                          onChange={handleInputChange}
                          className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition cursor-pointer font-semibold"
                        >
                          <option value="English Medium">English Medium</option>
                          <option value="Hindi Medium">Hindi Medium</option>
                        </select>
                      </div>

                      {/* Class Requested (Play to 12) */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="targetClass" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          Target Class Admission <span className="text-accent">*</span>
                        </label>
                        <select
                          id="targetClass"
                          name="targetClass"
                          value={formData.targetClass}
                          onChange={handleInputChange}
                          className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition cursor-pointer font-semibold"
                        >
                          <option value="Playgroup / Nursery">Playgroup / Nursery</option>
                          <option value="LKG">LKG (Lower Kindergarten)</option>
                          <option value="UKG">UKG (Upper Kindergarten)</option>
                          <option value="Class 1">Class 1</option>
                          <option value="Class 2">Class 2</option>
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5</option>
                          <option value="Class 6">Class 6</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Class 8">Class 8</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                          <option value="Class 11 (Science)">Class 11 (Science)</option>
                          <option value="Class 11 (Commerce)">Class 11 (Commerce)</option>
                          <option value="Class 11 (Arts)">Class 11 (Arts)</option>
                          <option value="Class 12 (Science)">Class 12 (Science)</option>
                          <option value="Class 12 (Commerce)">Class 12 (Commerce)</option>
                          <option value="Class 12 (Arts)">Class 12 (Arts)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Additional Message / Questions
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                        placeholder="Ex: I want to know about physics lab equipment details..."
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={submitting}
                      variant="secondary"
                      className="bg-gradient-to-r from-secondary to-amber-600 hover:from-amber-600 hover:to-secondary border-none flex items-center justify-center gap-2 mt-4 shadow-lg shadow-secondary/15 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? "Submitting..." : "Submit Inquiry Sheet"}</span>
                    </Button>
                  </form>
                )}

              </div>
            </AnimatedSection>
          </div>

        </div>
      </Container>
    </main>
  );
}
