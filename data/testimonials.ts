export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Ramesh Kumar Sharma",
    role: "Parent (Class 10 Student)",
    text: "Abhilasha Academy provides excellent academic support. The teachers are extremely caring and pay attention to each student. The fees are highly affordable, and the focus on core values is truly commendable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Priyanjali Singh",
    role: "Alumna (Batch 2021)",
    text: "Studying at Maa Durga Abhilasha Inter College was a life-changing experience. The guidance of teachers in class 11 and 12 helped me score 92% in my UP Board examinations. I will always remain grateful.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Dr. Alok Verma",
    role: "Education Consultant / Well-wisher",
    text: "What makes Abhilasha unique is its vision: 'Teaching is not a business but an interest.' The focus is on providing high-quality Hindi medium education that gives state board students a strong footing.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Amit Dwivedi",
    role: "Parent (Class 8 & 12 Students)",
    text: "Both my children study here. The discipline, safety, and regular examinations keep the children focused. The laboratory facilities and extracurricular efforts are excellent for local students.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Sunita Tripathi",
    role: "Parent (Play Group & Class 5)",
    text: "The foundation built in early classes at Abhilasha Academy is commendable. Teacher attentiveness, safety standards, and polite management make us feel completely confident in our child's future.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Vikramaditya Pandey",
    role: "Alumnus (B.Tech Scholar)",
    text: "The strong mathematical foundation and conceptual clarity provided by Maa Durga Abhilasha Inter College faculty laid the groundwork for my engineering entrance success. Proud to be an alumnus!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
];
