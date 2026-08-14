"use client";

import React from "react";
import Image from "next/image";
import { 
  Calendar, 
  Target, 
  Award, 
  Shield, 
  Sparkles, 
  BookOpen, 
  Compass, 
  CheckCircle, 
  MapPin, 
  School, 
  Medal, 
  Trophy, 
  Heart,
  Quote
} from "lucide-react";
import Container from "@/components/Common/Container";
import Heading from "@/components/Common/Heading";
import AnimatedSection from "@/components/Common/AnimatedSection";
import Button from "@/components/Common/Button";

export default function AboutPage() {
  const differences = [
    { title: "Affordable Excellence", desc: "Quality education at an affordable fee structure to ensure accessibility." },
    { title: "Qualified Educators", desc: "Experienced, passionate, and highly qualified teachers guiding our students." },
    { title: "Individual Attention", desc: "Focus on personal attention for every student to nurture their unique potential." },
    { title: "Ideal Learning Ratio", desc: "Student–teacher ratio focused on better learning and personal guidance." },
    { title: "Modern Classrooms", desc: "Spacious, well-ventilated, and comfortable classrooms for an optimal environment." },
    { title: "Regular Assessments", desc: "Monthly assessments to monitor student progress and provide constructive feedback." },
    { title: "Safe & Disciplined Campus", desc: "A highly secure environment that emphasizes discipline and safety." },
    { title: "Character & Moral Values", desc: "Strong focus on character building, moral values, and essential life skills." },
    { title: "Complete Facilities", desc: "Healthy environment with library, playground, clean drinking water, and key student amenities." }
  ];

  const branches = [
    { name: "Shri Krishna Shiksha Sadan", location: "Sarraiya Mishra" },
    { name: "Shri Krishna Abhilasha Kanya P.M.V.", location: "Sarraiya Mishra" }
  ];

  return (
    <main className="pt-36 sm:pt-40 lg:pt-44 pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Page Header */}
        <AnimatedSection variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 block">
              Learn Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">
              About Abhilasha Group of Academies
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
            <p className="text-slate-600 italic font-semibold text-lg md:text-xl">
              &ldquo;Where Teaching is Not a Business but an Interest. Hope Sustains Life.&rdquo;
            </p>
          </div>
        </AnimatedSection>

        {/* 2-Column Split: General Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-6 relative">
            <AnimatedSection variant="fade-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-100 group">
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
                  alt="Abhilasha school campus main entrance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-secondary rounded-3xl -z-1" />
            </AnimatedSection>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <AnimatedSection variant="fade-left">
              <Heading
                title="A Legacy of Value-Based Quality Education"
                subtitle="Who We Are"
                className="mb-4"
              />
              <div className="text-slate-600 leading-relaxed space-y-4 text-justify">
                <p>
                  Established in 2010, <strong>Abhilasha Academy</strong> and <strong>Maa Durga Abhilasha Inter College</strong> (Abhilasha Group of Academies) have been committed to providing quality education that is affordable, value-driven, and accessible to every child. Our institutions strive to nurture students into confident, responsible, and compassionate individuals who are prepared to succeed in academics and life.
                </p>
                <p>
                  Located in Gaura, Kaptanganj, Basti (Uttar Pradesh), we offer education through two dedicated institutions:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-center gap-3 font-semibold text-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span>Abhilasha Academy – Nursery to Class 11 (English Medium)</span>
                  </li>
                  <li className="flex items-center gap-3 font-semibold text-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    <span>Maa Durga Abhilasha Inter College – Classes 6 to 12 (Hindi Medium)</span>
                  </li>
                </ul>
                <p>
                  Over the years, we have earned the trust of parents by maintaining high academic standards, disciplined learning environments, and a student-first approach. Our experienced faculty members focus not only on academic excellence but also on the overall personality development of every student.
                </p>
                <p>
                  We believe every child possesses unique potential, and our responsibility is to nurture that potential through quality teaching, personal attention, and continuous guidance.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <AnimatedSection variant="fade-up" className="h-full">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-md h-full flex flex-col gap-6 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Target className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Our Mission</h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base text-justify">
                  Our mission is to deliver holistic education through experienced teachers, modern teaching practices, and a student-centric approach that ensures every learner receives the guidance and attention they deserve. We are committed to promoting academic excellence, strong moral values, leadership qualities, critical thinking, and social responsibility while preparing students to confidently face the opportunities and challenges of the future.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.1} className="h-full">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-md h-full flex flex-col gap-6 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-primary" />
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Our Vision</h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base text-justify">
                  We envision becoming one of the most trusted educational institutions in Uttar Pradesh by providing affordable, value-based, and quality education that empowers every student to reach their full potential. We strive to create a learning environment where curiosity is encouraged, creativity is nurtured, discipline is instilled, and every child is inspired to become a lifelong learner.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* What Makes Us Different */}
        <AnimatedSection variant="fade-up" className="mb-24">
          <Heading
            title="What Makes Us Different"
            subtitle="Our Strengths"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {differences.map((diff, idx) => (
              <div
                key={diff.title}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 relative group flex flex-col gap-3"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-lg group-hover:text-primary transition-colors">
                  {diff.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed text-justify">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Branches Section */}
        <AnimatedSection variant="fade-up" className="mb-24">
          <div className="bg-gradient-to-br from-slate-900 to-primary-dark rounded-3xl p-8 sm:p-12 text-white border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <Heading
              title="Our Branch Network"
              subtitle="Expanding Our Reach"
              center
              className="text-white mb-10"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {branches.map((branch, idx) => (
                <div key={branch.name} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                    <School className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-lg mb-1">{branch.name}</h4>
                    <div className="flex items-center gap-2 text-slate-300 text-sm mt-1">
                      <MapPin className="w-4 h-4 text-secondary shrink-0" />
                      <span>{branch.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-300 mt-10 max-w-2xl mx-auto text-sm sm:text-base text-justify">
              Together, our institutions continue to work towards creating an environment where learning becomes meaningful, inspiring, and transformative.
            </p>
          </div>
        </AnimatedSection>

        {/* Our Achievements & Academic Excellence */}
        <AnimatedSection variant="fade-up" className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Heading
                title="Achievements & Academic Excellence"
                subtitle="Nurturing Excellence"
              />
              <div className="text-slate-600 leading-relaxed space-y-4 text-justify">
                <p>
                  At Abhilasha Group of Academies, academic excellence has always been the hallmark of our educational journey. Over the years, our students have consistently demonstrated outstanding performance in board examinations, competitive activities, and co-curricular events, bringing pride to the institution and the community.
                </p>
                <p>
                  We are proud that our students have regularly secured positions in the District and State Merit Lists, reflecting our commitment to quality education and dedicated mentorship. On multiple occasions, our institution has had the honor of producing the District Topper (Rank 1), a testament to the hard work of our students and the unwavering support of our experienced faculty.
                </p>
                <p>
                  Beyond academics, our students have earned numerous awards and recognitions at the District, State, and National levels across academics, sports, cultural programs, debates, quizzes, science exhibitions, and various talent competitions. These achievements reflect our belief in nurturing not only brilliant minds but also confident, creative, and responsible individuals.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-secondary" />
              <h4 className="font-extrabold text-slate-800 text-lg mb-6 flex items-center gap-2.5">
                <Trophy className="text-secondary w-6 h-6" />
                <span>Academic Highlights</span>
              </h4>
              <ul className="flex flex-col gap-4 text-sm text-slate-500 font-semibold">
                <li className="flex items-start gap-3">
                  <Medal className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-snug text-slate-700">Consistent presence in District & State Merit Lists every year.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Medal className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-snug text-slate-700">District Rank 1 achieved by our students on multiple occasions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Medal className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-snug text-slate-700">Numerous awards and recognitions at District, State, and National levels.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Medal className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-snug text-slate-700">Strong record of excellence in academics, sports, cultural, and competitive events.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Medal className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-snug text-slate-700">A legacy of producing confident, disciplined, and high-achieving students.</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Leadership Profile: Director Message block */}
        <AnimatedSection variant="fade-up" className="mb-12">
          <Heading
            title="Our Leadership & Guidance"
            subtitle="Founder Profile"
            center
          />
          <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 text-white grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
            
            {/* Leadership avatar */}
            <div className="lg:col-span-4 relative flex flex-col items-center">
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white/20 bg-slate-800 mb-6 shadow-xl">
                <Image
                  src="/director.webp"
                  alt="Academy Director Hari Shankar Pandey"
                  fill
                  sizes="224px"
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-2xl font-extrabold text-secondary tracking-wide text-center">
                Hari Shankar Pandey
              </h3>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold text-center mt-1">
                Director, Abhilasha Group of Academies
              </p>
              <p className="text-slate-400 text-[10px] uppercase font-bold text-center mt-0.5">
                M.A. (Hindi, English, Education), B.Ed.
              </p>
            </div>

            {/* Address message */}
            <div className="lg:col-span-8 flex flex-col gap-5 leading-relaxed text-slate-300 text-sm sm:text-base text-justify">
              <div className="flex items-center gap-2 mb-2">
                <Quote className="text-secondary/30 w-8 h-8 rotate-180 shrink-0" />
                <span className="text-secondary font-bold text-xs uppercase tracking-widest block">
                  Director&apos;s Message
                </span>
              </div>
              <p className="italic font-semibold text-white">
                Dear Parents, Students, and Well-Wishers,
              </p>
              <p className="text-slate-300">
                It is my privilege to welcome you to Abhilasha Group of Academies, built on the belief that education is the foundation of a progressive and responsible society. Since our establishment, our mission has been to provide quality education that is affordable, accessible, and focused on the all-round development of every child.
              </p>
              <p className="text-slate-300">
                At our institution, we firmly believe that every student possesses unique abilities and immense potential. Our responsibility is not only to impart knowledge but also to inspire confidence, cultivate discipline, and nurture values that prepare students to face life's challenges with courage and integrity.
              </p>
              <p className="text-slate-300">
                Our dedicated team of experienced educators works tirelessly to create a supportive and motivating learning environment where students are encouraged to think critically, dream big, and strive for excellence. Along with academic achievement, we place equal importance on character building, moral values, leadership, and social responsibility, ensuring that our students grow into responsible citizens and compassionate human beings.
              </p>
              <p className="text-slate-300">
                We are proud to provide an environment where learning extends beyond the classroom through co-curricular activities, regular assessments, personal guidance, and individual attention. We continuously strive to adopt better teaching methodologies and create opportunities that help every child realize their full potential.
              </p>
              <p className="text-slate-300">
                I sincerely thank all our parents for their continued trust and support, and I assure you that we will remain committed to maintaining the highest standards of education and nurturing future generations with dedication, sincerity, and excellence.
              </p>
              <p className="text-slate-300">
                Together, let us continue to build a brighter future where education becomes a journey of knowledge, values, and lifelong success.
              </p>
              <p className="font-semibold text-white mt-4 border-t border-white/10 pt-4">
                Warm Regards, <br />
                <span className="text-secondary font-bold text-lg block mt-2">Hari Shankar Pandey</span>
                <span className="text-xs text-slate-400 block uppercase tracking-widest font-normal">Director, Abhilasha Group of Academies</span>
              </p>
            </div>

          </div>
        </AnimatedSection>

      </Container>
    </main>
  );
}
