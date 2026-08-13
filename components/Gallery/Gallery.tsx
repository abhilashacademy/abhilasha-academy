"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { categoriesList, GalleryCategory, GalleryItem } from "@/data/gallery";
import { FaTimes, FaExpandAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import AnimatedSection from "../Common/AnimatedSection";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<GalleryCategory>("all");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          const mappedItems = (data.items || []).map((g: any) => ({
            id: g._id,
            title: g.title,
            category: g.category,
            src: g.src,
            alt: g.alt,
          }));
          setGalleryItems(mappedItems);
        }
      } catch (err) {
        console.error("Failed to fetch gallery items from database API:", err);
      }
    };
    fetchGallery();
  }, []);

  // Filtered list
  const filteredData = galleryItems.filter(
    (item) => selectedCat === "all" || item.category === selectedCat
  );

  const openLightbox = (id: string) => {
    const idx = filteredData.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setActiveIdx(idx);
    }
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null && activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null && activeIdx < filteredData.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <Container>
        {/* Title */}
        <AnimatedSection variant="fade-up">
          <Heading
            title="Snapshots of Campus Life"
            subtitle="Photo Gallery"
            center
          />
        </AnimatedSection>

        {/* Filter Categories Bar */}
        <AnimatedSection variant="fade-up" className="flex justify-center flex-wrap gap-2.5 mb-12">
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCat(cat.value);
                closeLightbox(); // Safety check
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCat === cat.value
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-white text-slate-600 hover:text-primary hover:bg-slate-50 border border-slate-200/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        {/* Masonry Columns Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 cursor-pointer border border-slate-200/30 bg-slate-100 aspect-auto"
              >
                {/* Image aspect-ratio auto-handled by native image size or custom class */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Floating overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-secondary font-bold text-[10px] uppercase tracking-widest block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-white font-bold text-base leading-tight">
                        {item.title}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm">
                      <FaExpandAlt />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* Lightbox Modal Carousel */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer z-55 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Previous navigation arrow */}
            {activeIdx > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 p-4 bg-white/5 hover:bg-white/15 rounded-full text-white cursor-pointer z-55 transition-colors duration-200"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Lightbox slide */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center select-none"
            >
              <img
                src={filteredData[activeIdx].src}
                alt={filteredData[activeIdx].alt}
                className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              <div className="text-center mt-6 text-white max-w-md">
                <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
                  {filteredData[activeIdx].category}
                </span>
                <h3 className="font-bold text-lg">{filteredData[activeIdx].title}</h3>
                <p className="text-slate-400 text-xs mt-1">
                  {activeIdx + 1} of {filteredData.length}
                </p>
              </div>
            </motion.div>

            {/* Next navigation arrow */}
            {activeIdx < filteredData.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 p-4 bg-white/5 hover:bg-white/15 rounded-full text-white cursor-pointer z-55 transition-colors duration-200"
                aria-label="Next image"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
