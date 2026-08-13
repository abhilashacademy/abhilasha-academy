import { Briefcase, Landmark, CalendarRange, Clock, BookOpen, Newspaper } from "lucide-react";

export interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  href: string;
  iconName: string;
  colorClass: string;
}

export const quickLinksData: QuickLinkItem[] = [
  {
    id: "careers",
    title: "Careers",
    description: "Join our dedicated teaching faculty and supportive administrative staff to shape young minds.",
    href: "/contact?subject=Careers",
    iconName: "Briefcase",
    colorClass: "from-blue-500/10 to-indigo-500/10 hover:border-blue-500/30 text-blue-600",
  },
  {
    id: "virtual-tour",
    title: "Virtual Tour",
    description: "Take an immersive digital journey through our classroom rows, laboratories, and green sports ground.",
    href: "/gallery",
    iconName: "Landmark",
    colorClass: "from-amber-500/10 to-orange-500/10 hover:border-amber-500/30 text-amber-600",
  },
  {
    id: "recent-events",
    title: "Recent Events",
    description: "Look back at our annual board rewards, Republic Day highlights, and sports gala programs.",
    href: "/news?category=Achievement",
    iconName: "CalendarRange",
    colorClass: "from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30 text-emerald-600",
  },
  {
    id: "upcoming-events",
    title: "Upcoming Events",
    description: "Stay informed about school re-openings, parent-teacher reviews, and holiday timetables.",
    href: "/news?category=Announcement",
    iconName: "Clock",
    colorClass: "from-rose-500/10 to-pink-500/10 hover:border-rose-500/30 text-rose-600",
  },
  {
    id: "blog",
    title: "Our Blog",
    description: "Read educational ideas, parenting guidance, study techniques, and pupil writeups.",
    href: "/news",
    iconName: "BookOpen",
    colorClass: "from-purple-500/10 to-violet-500/10 hover:border-purple-500/30 text-purple-600",
  },
  {
    id: "news",
    title: "School News",
    description: "Read formal circulars, exam dates sheets, schedule notices, and official announcements.",
    href: "/news",
    iconName: "Newspaper",
    colorClass: "from-cyan-500/10 to-sky-500/10 hover:border-cyan-500/30 text-cyan-600",
  },
];
