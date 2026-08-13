export interface StudentTopper {
  id: string;
  name: string;
  photo: string;
  percentage: number;
  rank: number;
  board: "High School (Class 10)" | "Intermediate (Class 12)";
  rankType: "State Rank" | "District Rank" | "School Rank";
}

export interface SubjectTopper {
  subject: string;
  studentName: string;
  marks: number;
  board: string;
}

export interface YearToppers {
  year: string;
  students: StudentTopper[];
  subjects: SubjectTopper[];
}

export const toppersData: YearToppers[] = [
  {
    year: "2026",
    students: [
      {
        id: "2026-t1",
        name: "Abhishek Pandey",
        photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
        percentage: 98.4,
        rank: 1,
        board: "Intermediate (Class 12)",
        rankType: "District Rank",
      },
      {
        id: "2026-t2",
        name: "Sneha Shukla",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
        percentage: 97.2,
        rank: 2,
        board: "High School (Class 10)",
        rankType: "District Rank",
      },
      {
        id: "2026-t3",
        name: "Priyansh Mishra",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
        percentage: 96.8,
        rank: 1,
        board: "High School (Class 10)",
        rankType: "School Rank",
      },
      {
        id: "2026-t4",
        name: "Komal Yadav",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        percentage: 95.5,
        rank: 3,
        board: "Intermediate (Class 12)",
        rankType: "School Rank",
      },
    ],
    subjects: [
      { subject: "Physics", studentName: "Abhishek Pandey", marks: 99, board: "Class 12" },
      { subject: "Chemistry", studentName: "Abhishek Pandey", marks: 98, board: "Class 12" },
      { subject: "Mathematics", studentName: "Abhishek Pandey", marks: 100, board: "Class 12" },
      { subject: "English", studentName: "Komal Yadav", marks: 97, board: "Class 12" },
      { subject: "Hindi", studentName: "Sneha Shukla", marks: 99, board: "Class 10" },
      { subject: "Science", studentName: "Priyansh Mishra", marks: 98, board: "Class 10" },
    ],
  },
  {
    year: "2025",
    students: [
      {
        id: "2025-t1",
        name: "Divya Prakash Pandey",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
        percentage: 97.8,
        rank: 1,
        board: "Intermediate (Class 12)",
        rankType: "District Rank",
      },
      {
        id: "2025-t2",
        name: "Roshni Sen",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
        percentage: 96.4,
        rank: 4,
        board: "High School (Class 10)",
        rankType: "District Rank",
      },
    ],
    subjects: [
      { subject: "Physics", studentName: "Divya Prakash Pandey", marks: 98, board: "Class 12" },
      { subject: "Chemistry", studentName: "Divya Prakash Pandey", marks: 97, board: "Class 12" },
      { subject: "Mathematics", studentName: "Divya Prakash Pandey", marks: 99, board: "Class 12" },
      { subject: "Science", studentName: "Roshni Sen", marks: 99, board: "Class 10" },
    ],
  },
  {
    year: "2024",
    students: [
      {
        id: "2024-t1",
        name: "Anuj Kumar Tiwari",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
        percentage: 96.5,
        rank: 1,
        board: "Intermediate (Class 12)",
        rankType: "District Rank",
      },
      {
        id: "2024-t2",
        name: "Anjali Gupta",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
        percentage: 95.8,
        rank: 2,
        board: "High School (Class 10)",
        rankType: "School Rank",
      },
    ],
    subjects: [
      { subject: "Mathematics", studentName: "Anuj Kumar Tiwari", marks: 98, board: "Class 12" },
      { subject: "Biology", studentName: "Anjali Gupta", marks: 96, board: "Class 10" },
    ],
  },
];
