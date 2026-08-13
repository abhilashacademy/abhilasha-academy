"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaTimes } from "react-icons/fa";
import Container from "../Common/Container";
import Heading from "../Common/Heading";
import Button from "../Common/Button";
import AnimatedSection from "../Common/AnimatedSection";

export default function DirectorMessage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Container>
        <AnimatedSection variant="fade-up">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

              {/* Photo Column */}
              <div className="lg:col-span-4 relative min-h-[350px] lg:min-h-auto bg-slate-800">
                <Image
                  src="/director.webp"
                  alt="Academy Director H.S. Pandey Sir"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Message Column */}
              <div className="lg:col-span-8 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white relative z-10">
                <div>
                  <FaQuoteLeft className="text-secondary/30 w-12 h-12 mb-6" />

                  <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-2">
                    Director&apos;s Desk Message
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
                    &ldquo;Dear Parents, Students, and Well-Wishers&rdquo;
                  </h3>

                  <p className="text-slate-300 leading-relaxed mb-6 italic text-sm sm:text-base">
                    &ldquo;It is my privilege to welcome you to Abhilasha Group of Academies, built on the belief that education is the foundation of a progressive and responsible society. Since our establishment, our mission has been to provide quality education that is affordable, accessible, and focused on the all-round development of every child.&rdquo;
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-white/10">
                  <div>
                    <h4 className="font-extrabold text-lg tracking-wide text-secondary">
                      Hari Shankar Pandey
                    </h4>
                    <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">
                      Director, Abhilasha Group of Academies
                    </p>
                  </div>

                  <Button
                    onClick={toggleModal}
                    variant="outline"
                    className="text-white border-white/30 hover:border-white hover:bg-white hover:text-primary transition-all duration-300"
                  >
                    Read Full Message
                  </Button>
                </div>

              </div>

            </div>

          </div>
        </AnimatedSection>
      </Container>

      {/* Expanded message modal drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Body */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-slate-100"
              >
                {/* Header */}
                <div className="px-6 py-4 bg-primary text-white flex justify-between items-center">
                  <h3 className="font-bold text-lg">Director&apos;s Full Address</h3>
                  <button
                    onClick={toggleModal}
                    className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors duration-200 cursor-pointer"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-grow flex flex-col gap-6 text-slate-600 leading-relaxed text-sm sm:text-base">
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src="/director.webp"
                        alt="Director Portrait"
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800">Hari Shankar Pandey</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Director</p>
                    </div>
                  </div>

                   <p className="font-semibold text-slate-800">
                    Dear Parents, Students, and Well-Wishers,
                  </p>
                  <p>
                    It is my privilege to welcome you to Abhilasha Group of Academies, built on the belief that education is the foundation of a progressive and responsible society. Since our establishment, our mission has been to provide quality education that is affordable, accessible, and focused on the all-round development of every child.
                  </p>
                  <p>
                    At our institution, we firmly believe that every student possesses unique abilities and immense potential. Our responsibility is not only to impart knowledge but also to inspire confidence, cultivate discipline, and nurture values that prepare students to face life's challenges with courage and integrity.
                  </p>
                  <p>
                    Our dedicated team of experienced educators works tirelessly to create a supportive and motivating learning environment where students are encouraged to think critically, dream big, and strive for excellence. Along with academic achievement, we place equal importance on character building, moral values, leadership, and social responsibility, ensuring that our students grow into responsible citizens and compassionate human beings.
                  </p>
                  <p>
                    We are proud to provide an environment where learning extends beyond the classroom through co-curricular activities, regular assessments, personal guidance, and individual attention. We continuously strive to adopt better teaching methodologies and create opportunities that help every child realize their full potential.
                  </p>
                  <p>
                    I sincerely thank all our parents for their continued trust and support, and I assure you that we will remain committed to maintaining the highest standards of education and nurturing future generations with dedication, sincerity, and excellence.
                  </p>
                  <p>
                    Together, let us continue to build a brighter future where education becomes a journey of knowledge, values, and lifelong success.
                  </p>
                  <p className="font-semibold text-slate-800 border-t border-slate-100 pt-4">
                    With Warm Regards, <br />
                    <span className="text-secondary font-bold text-lg block mt-2">Hari Shankar Pandey</span>
                    <span className="text-xs text-slate-500 block uppercase tracking-widest font-normal">Director, Abhilasha Group of Academies</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
