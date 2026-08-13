import { contactDetails, socialLinks } from "@/data/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import Container from "../Common/Container";
import Link from "next/link";

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "Facebook":
      return <FaFacebookF className="w-3.5 h-3.5" />;
    case "Twitter":
      return <FaTwitter className="w-3.5 h-3.5" />;
    case "Instagram":
      return <FaInstagram className="w-3.5 h-3.5" />;
    case "Youtube":
      return <FaYoutube className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};

export default function TopBar() {
  return (
    <div className="bg-primary text-white border-b border-white/10 py-2.5 text-sm hidden sm:block">
      <Container className="flex justify-between items-center">
        {/* Contact info */}
        <div className="flex items-center gap-6">
          <Link
            href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 hover:text-secondary transition-colors duration-200"
          >
            <FaPhoneAlt className="w-3 h-3 text-secondary" />
            <span>{contactDetails.phone}</span>
          </Link>
          <Link
            href={`mailto:${contactDetails.email}`}
            className="flex items-center gap-2 hover:text-secondary transition-colors duration-200"
          >
            <FaEnvelope className="w-3.5 h-3.5 text-secondary" />
            <span>{contactDetails.email}</span>
          </Link>
          <div className="hidden lg:flex items-center gap-2 text-white/80">
            <FaClock className="w-3.5 h-3.5 text-secondary" />
            <span>{contactDetails.timings}</span>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-secondary text-white hover:text-primary flex items-center justify-center transition-all duration-300"
              aria-label={social.label}
            >
              {getSocialIcon(social.icon)}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
