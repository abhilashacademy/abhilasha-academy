export interface GalleryItem {
  id: string;
  title: string;
  category: "campus" | "classroom" | "sports" | "events" | "labs";
  src: string;
  alt: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "School Campus Frontage",
    category: "campus",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    alt: "Abhilasha Group of Academies Main Campus Building",
  },
  {
    id: "g2",
    title: "Modern Science Lab Practical",
    category: "labs",
    src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
    alt: "Students performing experiments in the chemistry lab",
  },
  {
    id: "g3",
    title: "Interactive Classroom Study",
    category: "classroom",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
    alt: "Interactive classroom lecture session",
  },
  {
    id: "g4",
    title: "Annual Sports Day Athletics",
    category: "sports",
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    alt: "Students participating in track and field event on sports ground",
  },
  {
    id: "g5",
    title: "Independence Day Cultural Event",
    category: "events",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    alt: "Cultural performance by academy students on Independence Day",
  },
  {
    id: "g6",
    title: "Well Equipped Computer Laboratory",
    category: "labs",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
    alt: "Students learning coding in computer lab",
  },
  {
    id: "g7",
    title: "Quiet Reading Hour in Library",
    category: "classroom",
    src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
    alt: "Students reading inside the academy library",
  },
  {
    id: "g8",
    title: "Volleyball Tournament Matches",
    category: "sports",
    src: "https://images.unsplash.com/photo-1592656094267-764a45068526?q=80&w=800&auto=format&fit=crop",
    alt: "Inter-school volleyball competition held in the school yard",
  },
  {
    id: "g9",
    title: "Science Exhibition Presentations",
    category: "events",
    src: "https://images.unsplash.com/photo-1564981797816-1043d01bf53d?q=80&w=800&auto=format&fit=crop",
    alt: "Students presenting models at the science exhibition",
  },
];
export type GalleryCategory = "all" | "campus" | "classroom" | "sports" | "events" | "labs";
export const categoriesList: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All Photos" },
  { value: "campus", label: "Campus" },
  { value: "classroom", label: "Classrooms" },
  { value: "sports", label: "Sports" },
  { value: "events", label: "Events" },
  { value: "labs", label: "Labs" },
];
