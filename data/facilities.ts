export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
}

export const facilitiesData: Facility[] = [
  {
    id: "library",
    title: "Resourceful Library",
    description: "A wide collection of textbooks, reference guides, encyclopedias, and educational journals to foster research and deep reading habits.",
    iconName: "BookOpen",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "science-lab",
    title: "Science Laboratory",
    description: "Hands-on learning through fully equipped Physics, Chemistry, and Biology laboratories conforming to safety standard procedures.",
    iconName: "Beaker",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "computer-lab",
    title: "Hi-Tech Computer Lab",
    description: "Modern computer terminal infrastructure running computational software and programming modules with high-speed internet access.",
    iconName: "Laptop",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "sports",
    title: "Sports Playground",
    description: "Expansive outdoor play court facilities for football, cricket, basketball, volleyball, and athletic practices promoting physical fitness.",
    iconName: "Trophy",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "cultural-activities",
    title: "Cultural Activities",
    description: "Encouraging children to participate in debates, music, dance, and theater, fostering personality development and self-confidence.",
    iconName: "Music",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "smart-classes",
    title: "Smart Classes",
    description: "Modern classrooms equipped with interactive smart boards, audio-visual aids, and ergonomic seating to make learning engaging and dynamic.",
    iconName: "MonitorPlay",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "cctv-campus",
    title: "CCTV Guarded Campus",
    description: "24/7 high-definition surveillance coverage throughout the campus along with verified gate checks ensuring total student safety.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "transport",
    title: "Transport Facility",
    description: "Safe and convenient school bus transport covering major routes around Kaptanganj, Basti with experienced drivers and supervisors.",
    iconName: "Bus",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
  },
];
