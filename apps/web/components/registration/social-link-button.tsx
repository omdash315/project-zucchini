import Link from "next/link";
import type { SocialLink } from "@/config/register/social-links";

interface SocialLinkButtonProps {
  link: SocialLink;
}

export function SocialLinkButton({ link }: SocialLinkButtonProps) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="gradient-border-btn w-full py-3 px-6 text-white font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2 font-inria"
    >
      <Icon className="w-5 h-5" />
      {link.label}
    </Link>
  );
}
