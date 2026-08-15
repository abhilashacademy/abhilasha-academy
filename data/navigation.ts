import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

export interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    subItems: [
      { label: "About Us", href: "/about" },
      { label: "Facilities", href: "/facilities" },
      { label: "Downloads", href: "/downloads" }
    ]
  },
  {
    label: "Academics",
    href: "/academics",
    subItems: [
      { label: "Pre Primary Level", href: "/academics?tab=pre-primary" },
      { label: "Primary Level", href: "/academics?tab=primary" },
      { label: "Middle Level", href: "/academics?tab=middle-level" },
      { label: "Learning Environment", href: "/academics?tab=environment" },
      { label: "Faculty", href: "/academics?tab=faculty" },
      { label: "Beyond Academics", href: "/academics?tab=beyond" }
    ]
  },
  {
    label: "Admissions",
    href: "/admissions",
    subItems: [
      { label: "Admission Process", href: "/admissions#process" },
      { label: "Online Registration", href: "/admissions#register" },
      { label: "Admission Form", href: "/downloads?doc=admission-form" },
      { label: "Fee Structure 26-27", href: "/downloads?doc=fee-structure" }
    ]
  },
  {
    label: "Gallery",
    href: "/gallery",
    subItems: [
      { label: "Campus Gallery", href: "/gallery" },
      { label: "Toppers Gallery", href: "/toppers" }
    ]
  },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const contactDetails = {
  phone: "+91 9956789374",
  helplines: [
    "+91 95191 40191",
    "+91 63874 28041",
    "+91 99182 61610",
    "+91 99561 42111"
  ],
  email: "abhilasha558@gmail.com",
  address: "Gaura, Kaptanganj, Basti, Uttar Pradesh (Near SBI, Kaptanganj)",
  director: "Hari Shankar Pandey",
  directorQualifications: "M.A. (Hindi, English, Education), B.Ed.",
  directorPhone: "+91 99567 89374",
  googleMapsLink: "https://maps.app.goo.gl/ry1YARu1Jww9yzeM8?g_st=ic",
  timings: "Mon - Sat: 9:00 AM - 4:00 PM",
};

export const socialLinks = [
  { icon: "Facebook", href: "https://www.facebook.com/share/1Bcp6nFi64/?mibextid=wwXIfr", label: "Facebook" },
  { icon: "Twitter", href: "https://x.com/hspandeytanha?s=11", label: "Twitter" },
  { icon: "Instagram", href: "https://www.instagram.com/mdabhilasha", label: "Instagram" },
  { icon: "Youtube", href: "https://www.youtube.com/@harishankarpandey4219", label: "YouTube" },
];
