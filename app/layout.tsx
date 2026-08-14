import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollProgress from "@/components/Common/ScrollProgress";
import ScrollToTop from "@/components/Common/ScrollToTop";
import AnnouncementPopup from "@/components/Common/AnnouncementPopup";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.mdabhilasha.in"),
  title: {
    default: "Abhilasha Group of Academies | Where Teaching is an Interest",
    template: "%s | Abhilasha Group of Academies",
  },
  description: "Established in 2010, Abhilasha Academy and Maa Durga Abhilasha Inter College provide affordable, value-based, quality Hindi and English medium state board education for classes Nursery to 12. Gorakhpur & Basti, Uttar Pradesh.",
  keywords: [
    "Abhilasha Group of Academies",
    "Abhilasha Academy",
    "Maa Durga Abhilasha Inter College",
    "School in Gorakhpur",
    "School in Basti",
    "UP Board Hindi and English Medium School",
    "Gorakhpur School admission",
    "Class Nursery to 12 Hindi English Medium",
    "Quality Hindi and English Medium Education",
  ],
  authors: [{ name: "Abhilasha Group of Academies" }],
  creator: "Abhilasha Admin Desk",
  publisher: "Abhilasha Group of Academies",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Abhilasha Group of Academies | Where Teaching is an Interest",
    description: "Value-based quality Hindi and English medium state board education for classes Nursery to 12. Gorakhpur & Basti, UP.",
    url: "https://www.mdabhilasha.in",
    siteName: "Abhilasha Group of Academies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/hero1.jpeg",
        width: 1200,
        height: 630,
        alt: "Abhilasha Group of Academies Campus",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text">
        {/* Scroll Progress Bar at very top */}
        <ScrollProgress />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Dynamic page content container */}
        <div className="flex-grow flex flex-col">
          {children}
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Floating Scroll To Top button */}
        <ScrollToTop />

        {/* Dynamic Entrance Announcement Popup */}
        <AnnouncementPopup />
      </body>
    </html>
  );
}
