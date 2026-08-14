"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";
import Button from "@/components/Common/Button";
import { contactDetails } from "@/data/navigation";

function ContactFormAndDetails() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "General Inquiry";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMessage("Please fill in your name, phone number, and message.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left Column: Direct Contacts info */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        <AnimatedSection variant="fade-right" className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />

          <h3 className="text-xl font-bold text-slate-800 mb-8">Contact Information</h3>

          <div className="flex flex-col gap-8">
            {/* Campus Address */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  Campus Address
                </span>
                <a
                  href={contactDetails.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 font-bold hover:text-primary transition text-sm sm:text-base leading-relaxed block"
                >
                  {contactDetails.address}
                </a>
              </div>
            </div>

            {/* Admission Helpline */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaPhoneAlt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  Admission Helpline
                </span>
                <div className="flex flex-col gap-1.5">
                  {contactDetails.helplines.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num.replace(/\s+/g, "")}`}
                      className="text-slate-700 font-bold hover:text-primary transition text-sm sm:text-base leading-none block"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Director's Office */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaPaperPlane className="w-5 h-5 text-primary group-hover:text-white" />
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  Director's Office
                </span>
                <span className="text-slate-800 font-bold text-sm sm:text-base block">
                  {contactDetails.director}
                </span>
                <span className="text-slate-500 text-xs block mb-1">
                  {contactDetails.directorQualifications}
                </span>
                <a
                  href={`tel:${contactDetails.directorPhone.replace(/\s+/g, "")}`}
                  className="text-slate-700 font-bold hover:text-primary transition text-sm sm:text-base leading-snug block"
                >
                  {contactDetails.directorPhone}
                </a>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  Email Address
                </span>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-slate-700 font-bold hover:text-primary transition text-sm sm:text-base leading-snug break-all block"
                >
                  {contactDetails.email}
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaClock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">
                  Office Hours
                </span>
                <span className="text-slate-700 font-bold text-sm sm:text-base leading-snug block">
                  {contactDetails.timings}
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Map Location placeholder */}
        <AnimatedSection variant="fade-right" className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-slate-150 relative h-72 bg-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113996.11370258071!2d83.32152431713401!3d26.76442654347716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991446a0c3321b1%3A0x4f5de79f63503698!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale saturate-150 contrast-125"
            title="School Location Map"
          />
        </AnimatedSection>
      </div>

      {/* Right Column: Contact Inquiry Form */}
      <div className="lg:col-span-7">
        <AnimatedSection variant="fade-left">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />

            <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Send an Inquiry Message</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-8 leading-relaxed text-justify">
              If you have queries regarding admissions, syllabus details, or sports coaching, write to us here and our counselors will respond shortly.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 text-center flex flex-col items-center gap-4">
                <FaCheckCircle className="text-emerald-600 w-12 h-12 animate-bounce" />
                <div>
                  <h4 className="text-emerald-800 font-extrabold text-lg mb-1">Message Sent Successfully!</h4>
                  <p className="text-emerald-600 text-sm leading-relaxed">
                    Thank you for reaching out to us. We have received your query. The academy administrator will get in touch with you shortly.
                  </p>
                </div>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-2 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {errorMessage && (
                  <div className="p-4 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-medium">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      placeholder="Ex: Amit Singh"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Phone Number <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      placeholder="Ex: +91 9450367300"
                    />
                  </div>
                </div>

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
                    placeholder="Ex: parent@example.com"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Subject / Concern <span className="text-accent">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Admissions Open">Admissions / Registrations</option>
                    <option value="Careers">Careers / Employment</option>
                    <option value="Syllabus/Curriculum">Syllabus / Hindi Medium</option>
                    <option value="Facilities/Labs">School Infrastructure</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Detailed Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-brand-bg text-slate-800 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
                    placeholder="Type details of your request here..."
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-primary hover:bg-primary-dark border-none flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/10"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function ContactClient() {
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
              Reach Out
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
              Connect With Us
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Have questions or want to plan a campus visit? Get in touch with our administrative cell today.
            </p>
          </div>
        </AnimatedSection>

        {/* Form and details wrapped inside search param check */}
        <React.Suspense fallback={<div className="text-center text-slate-400 py-10">Loading inquiry portals...</div>}>
          <ContactFormAndDetails />
        </React.Suspense>
      </Container>
    </main>
  );
}
