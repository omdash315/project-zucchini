import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { footerLinks } from "@/config/marginals/footer";
import { WhatsAppIcon } from "@/components/ui/icons";
import { nuLogo } from "@/config/hero";

const socialIcons: Record<string, React.ReactNode> = {
  WhatsApp: <WhatsAppIcon className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-black/90 border-t border-white/10 font-inria">
      {/* Gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#fb229e] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="md:flex flex-col items-center md:items-start lg:col-span-1 hidden">
            <div className="mb-4">
              <Image
                src={nuLogo}
                alt="Nitrutsav Logo"
                width={450}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-white/70 text-sm text-center md:text-left leading-relaxed">
              {footerLinks.brand.tagline}
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-white mb-4 text-base tracking-wide">Quick Links</h3>
            <nav className="flex flex-col gap-3 items-center md:items-start">
              {footerLinks.quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-[#fb229e] transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-white mb-4 text-base tracking-wide">Legal</h3>
            <nav className="flex flex-col gap-3 items-center md:items-start">
              {footerLinks.legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-[#fb229e] transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-white mb-4 text-base tracking-wide">
              Connect With Us
            </h3>
            <div className="flex gap-4 mb-6">
              {footerLinks.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#fb229e]/20 hover:text-[#fb229e] transition-all duration-300"
                  aria-label={social.label}
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
            <a
              href={`mailto:${footerLinks.contact.email}`}
              className="text-white/70 hover:text-[#fb229e] transition-colors duration-300 text-sm"
            >
              {footerLinks.contact.email}
            </a>
          </div>
        </div>

        {/* <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">{footerLinks.credits.copyright}</p>
          <a
            href={footerLinks.credits.teamLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#fb229e] transition-colors duration-300 text-sm flex items-center gap-2"
          >
            {footerLinks.credits.text} <span className="text-[#e7581f] animate-pulse">❤️</span> by{" "}
            {footerLinks.credits.team}
          </a>
        </div> */}
      </div>
    </footer>
  );
}
