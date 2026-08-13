export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Admissions Open" | "Board Results" | "Competitions" | "Achievements";
  date: string;
  image: string;
  author: string;
}

export const newsData: NewsItem[] = [
  {
    id: "news-1",
    title: "Admissions Open for Academic Year 2026-27",
    summary: "Registration is now open for Nursery to Class 11 (English Medium) and Class 6 to 12 (Hindi Medium). Secure your child's future today.",
    content: "Abhilasha Group of Academies is pleased to announce that admissions are open for the upcoming academic session 2026-27. We offer admission to Nursery through Class 11 in English Medium (Abhilasha Academy) and Classes 6 through 12 in Hindi Medium (Maa Durga Abhilasha Inter College). We focus on providing quality, value-based, and highly affordable education. Registration forms can be obtained from the physical campus office or inquired online.",
    category: "Admissions Open",
    date: "July 18, 2026",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop",
    author: "Admissions Office",
  },
  {
    id: "news-2",
    title: "100% Pass Rate in UP Board Examinations",
    summary: "Maa Durga Abhilasha Inter College achieves outstanding results in Class 10 and 12 Board examinations with multiple distinctions.",
    content: "We are proud to share that our students have once again achieved a 100% pass rate in the Class 10 and Class 12 Uttar Pradesh Madhyamik Shiksha Parishad (UP Board) Examinations. Many of our students secured distinction marks, and our teachers' rigorous mock evaluation campaigns have paid off beautifully. The Director, Hari Shankar Pandey, expressed his congratulations to all parents and students.",
    category: "Board Results",
    date: "June 25, 2026",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    author: "Academic Council",
  },
  {
    id: "news-3",
    title: "District Rank 1 Achieved by Abhilasha Student",
    summary: "Our student secures District Rank 1 in the State Board Examinations, continuing our legacy of academic excellence.",
    content: "In a momentous achievement for the Abhilasha Group of Academies, one of our bright intermediate students has secured Rank 1 in the District merit list. This stellar accomplishment continues our long-standing record of producing state and district rankers. A special ceremony was organized on campus to honor the toppers and award them scholarships for higher education.",
    category: "Achievements",
    date: "June 26, 2026",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
    author: "Director's Desk",
  },
  {
    id: "news-4",
    title: "Champions of the District Volleyball Tournament",
    summary: "The senior boys volleyball team clinches gold in the inter-school tournament after a spectacular final match.",
    content: "The Abhilasha athletics squad won the District Volleyball Championship trophy this season. Competing against 16 top teams in Basti division, our boys showed superior discipline, coordination, and physical fitness under sports mentor Mr. Pandey. The final match concluded in a thrilling three-set victory, drawing loud cheers from the spectators.",
    category: "Competitions",
    date: "May 14, 2026",
    image: "https://images.unsplash.com/photo-1592656094267-764a45068526?q=80&w=600&auto=format&fit=crop",
    author: "Sports Cell",
  },
  {
    id: "news-5",
    title: "Prizes Awarded at the Regional Science Fair",
    summary: "Abhilasha science models win first and second prize in the Basti Regional Science & Art Exhibition.",
    content: "Students from our intermediate science stream presented working models of clean water purification and renewable solar grids at the regional exhibition, securing the first and second prizes. Their ability to explain complex principles in simple Hindi medium terms was highly praised by the evaluation panel. Congratulations to our young inventors!",
    category: "Competitions",
    date: "April 22, 2026",
    image: "https://images.unsplash.com/photo-1564981797816-1043d01bf53d?q=80&w=600&auto=format&fit=crop",
    author: "Science Dept",
  },
];
