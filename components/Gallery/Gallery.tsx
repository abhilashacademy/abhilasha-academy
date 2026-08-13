"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { categoriesList, GalleryCategory, GalleryItem, galleryData } from "@/data/gallery";
import { FaTimes, FaExpandAlt, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import AnimatedSection from "../Common/AnimatedSection";
import Button from "../Common/Button";

interface GalleryProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function Gallery({ limit = 9, showViewAll = true }: GalleryProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(galleryData);
  const [selectedCat, setSelectedCat] = useState<GalleryCategory>("all");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.items && Array.isArray(data.items) && data.items.length > 0) {
            const mappedItems = data.items.map((g: any) => ({
              id: g._id || g.id,
              title: g.title,
              category: g.category,
              src: g.src,
              alt: g.alt,
            }));
            setGalleryItems(mappedItems);
          }
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

  // Limit visible items to 9 for the section
  const displayedData = limit ? filteredData.slice(0, limit) : filteredData;

  // Auto-play timer for Lightbox slideshow when open
  useEffect(() => {
    if (activeIdx === null || !isPlaying) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev === null) return null;
        return (prev + 1) % displayedData.length;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [activeIdx, isPlaying, displayedData.length]);

  const openLightbox = (id: string) => {
    const idx = displayedData.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setActiveIdx(idx);
      setIsPlaying(true);
    }
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === 0 ? displayedData.length - 1 : activeIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % displayedData.length);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-20 sm:py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Header */}
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
                closeLightbox();
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                selectedCat === cat.value
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-white text-slate-700 hover:text-primary hover:bg-slate-50 border-2 border-slate-300 shadow-sm hover:border-slate-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        {/* 9 Images Clean Grid Section (Hover reveals title & category) */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedData.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.015] transition-all duration-500 cursor-pointer border border-slate-200/60 bg-slate-100 flex flex-col justify-end select-none"
              >
                {/* Image (Clean view by default) */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient & Content Overlay (Appears only on Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-secondary font-extrabold text-xs uppercase tracking-widest block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-white font-extrabold text-lg leading-snug drop-shadow-sm">
                        {item.title}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-sm shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <FaExpandAlt />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Photos Link */}
        {showViewAll && filteredData.length > (limit || 9) && (
          <AnimatedSection variant="fade-up" className="flex justify-center mt-12">
            <Button href="/gallery" variant="outline">
              View All Photos ({filteredData.length})
            </Button>
          </AnimatedSection>
        )}
      </Container>

      {/* Lightbox Modal Carousel with Auto Slideshow */}
      <AnimatePresence>
        {activeIdx !== null && displayedData[activeIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Play/Pause Auto-play button */}
            <button
              onClick={togglePlay}
              className="absolute top-6 right-20 p-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer z-55 transition-colors duration-200 flex items-center gap-2 text-xs font-bold"
              aria-label={isPlaying ? "Pause automatic slideshow" : "Play automatic slideshow"}
            >
              {isPlaying ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
              <span>{isPlaying ? "Auto" : "Paused"}</span>
            </button>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer z-55 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Previous navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-4 bg-white/10 hover:bg-white/25 rounded-full text-white cursor-pointer z-55 transition-colors duration-200"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>

            {/* Lightbox slide */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center select-none"
            >
              <img
                src={displayedData[activeIdx].src}
                alt={displayedData[activeIdx].alt}
                className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              <div className="text-center mt-6 text-white max-w-md">
                <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
                  {displayedData[activeIdx].category}
                </span>
                <h3 className="font-bold text-lg">{displayedData[activeIdx].title}</h3>
                <p className="text-slate-400 text-xs mt-1">
                  {activeIdx + 1} of {displayedData.length}
                </p>
              </div>
            </motion.div>

            {/* Next navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-4 bg-white/10 hover:bg-white/25 rounded-full text-white cursor-pointer z-55 transition-colors duration-200"
              aria-label="Next image"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
