"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { testimonialsData, Testimonial as TestimonialType } from "@/data/testimonials";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import AnimatedSection from "../Common/AnimatedSection";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [items, setItems] = useState<TestimonialType[]>(testimonialsData);

  useEffect(() => {
    async function loadTestimonials() {
      const deletedIds: string[] = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("deleted_testimonial_ids") || "[]")
        : [];

      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
            const active = data.testimonials
              .filter((t: any) => !deletedIds.includes(String(t._id || t.id)))
              .map((t: any) => ({
                id: t._id || t.id,
                name: t.name,
                role: t.role,
                text: t.text,
                rating: t.rating || 5,
                image: t.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
              }));
            setItems(active);
            return;
          }
        }
        setItems(testimonialsData.filter((t) => !deletedIds.includes(String(t.id))));
      } catch (err) {
        setItems(testimonialsData.filter((t) => !deletedIds.includes(String(t.id))));
      }
    }

    loadTestimonials();
  }, []);

  return (
    <section className="py-10 sm:py-12 bg-slate-100/90 border-y border-slate-200/80 relative overflow-hidden">
      {/* Ambient Decorative Lighting */}
      <div className="absolute top-5 right-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <Container>
        {/* Title Header with integrated Navigation Controls */}
        <AnimatedSection variant="fade-up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="text-center sm:text-left">
              <Heading
                title="What Our Community Says"
                subtitle="Testimonials"
              />
            </div>

            {/* Custom Dynamic Navigation Controls */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                ref={prevRef}
                aria-label="Previous Testimonial"
                className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200/80 text-primary shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
              >
                <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                ref={nextRef}
                aria-label="Next Testimonial"
                className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200/80 text-primary shadow-md hover:bg-primary hover:text-white hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
              >
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Carousel Container */}
        <AnimatedSection variant="scale" className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={items.length > 1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="py-1 px-0.5"
          >
            {items.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <div className="bg-white rounded-2xl p-5 border-2 border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_rgba(10,57,129,0.14)] hover:border-primary/40 flex flex-col justify-between h-full group hover:-translate-y-1 transition-all duration-300 relative select-none">
                  
                  {/* Top Quote Badge & Rating */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <FaQuoteLeft className="w-4 h-4" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <FaStar key={i} className="text-amber-500 w-3 h-3" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 italic font-medium line-clamp-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Profile info */}
                  <div className="flex items-center gap-3 mt-auto border-t border-slate-100 pt-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-slate-500 text-[11px] font-medium truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedSection>
      </Container>
    </section>
  );
}
