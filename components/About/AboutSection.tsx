"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Calendar, GraduationCap, School } from "lucide-react";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import Button from "../Common/Button";
import AnimatedSection from "../Common/AnimatedSection";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Image Collage & Timeline Badges */}
          <div className="lg:col-span-6 relative">
            <AnimatedSection variant="fade-right">
              {/* Outer frame borders with wrapper for shadow */}
              <div className="relative rounded-3xl shadow-2xl">
                <div className="relative rounded-3xl overflow-hidden border-4 border-white aspect-[4/3] bg-slate-100 group">
                  <Image
                    src="/about.webp"
                    alt="Abhilasha Group of Academies classroom students"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Visual Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Gold border backdrop */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-secondary rounded-3xl -z-1 hidden sm:block" />

              {/* Floating established badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -top-6 -left-6 bg-gradient-to-br from-secondary to-amber-600 text-white rounded-3xl p-5 shadow-lg flex flex-col items-center justify-center border border-white/20 select-none z-10"
              >
                <Calendar className="w-6 h-6 mb-1 text-white/95" />
                <span className="text-2xl font-extrabold leading-none">2010</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-100">Established</span>
              </motion.div>

              {/* Overlay card */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-4 max-w-sm hidden md:flex">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 text-sm block">UP & CBSE Board</span>
                  <span className="text-slate-500 text-xs block">Classes Nursery to 12th • English & Hindi Medium</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Text Information & Mission/Vision Tabs */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <AnimatedSection variant="fade-left">
              <Heading
                title="Empowering Students Through Education"
                subtitle="About Our Academy"
                className="mb-6"
              />

              <div className="text-slate-600 space-y-4 leading-relaxed mb-8 text-justify">
                <p>
                  Established in 2010, <strong>Abhilasha Academy</strong> and <strong>Maa Durga Abhilasha Inter College (Abhilasha Group of Academies)</strong> have been committed to providing quality education that is affordable, value-driven, and accessible to every child. Our institutions strive to nurture students into confident, responsible, and compassionate individuals who are prepared to succeed in academics and life. The inter college offers UP & CBSE Board education for Classes Nursery to 12th in English & Hindi medium.
                </p>
                <p>
                  Located in Gaura, Kaptanganj, Basti (Uttar Pradesh), we offer education through two dedicated institutions:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Card 1: Abhilasha Academy */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">Abhilasha Academy</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Nursery to Class 11 • English Medium</p>
                    </div>
                  </div>

                  {/* Card 2: Maa Durga Abhilasha Inter College */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-secondary/20 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 group">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                      <School className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">Maa Durga Abhilasha Inter College</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Classes 6 to 12 • Hindi Medium</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-xs italic mt-4 text-justify">
                  Over the years, we have earned the trust of parents by maintaining high academic standards, disciplined learning environments, and a student-first approach.
                </p>
              </div>

              {/* Action Button */}
              <div>
                <Button
                  href="/about"
                  variant="primary"
                  className="bg-primary hover:bg-primary-dark group inline-flex items-center gap-2"
                >
                  <span>Read More History</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">
                    &rarr;
                  </span>
                </Button>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </Container>
    </section>
  );
}
