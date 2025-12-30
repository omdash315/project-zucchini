import { Instagram, Mail, Phone, LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ComponentType, SVGProps } from "react";

export interface MunSocialLink {
  href: string;
  label: string;
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
  value?: string;
}

export const munContactDetails: MunSocialLink[] = [
  {
    href: "mailto:secretariat.nitrimun2026@gmail.com",
    label: "Email",
    value: "secretariat.nitrimun2026@gmail.com",
    icon: Mail,
    external: true,
  },
  {
    href: "tel:+8303963026",
    label: "Contact",
    value: "+91 8303963026",
    icon: Phone,
    external: true,
  },
];

export const munSocialLinks: MunSocialLink[] = [
  {
    href: "https://chat.whatsapp.com/GAI3MlRX4TN5dyP6ZyFzlX",
    label: "Join WhatsApp Group",
    icon: WhatsAppIcon,
    external: true,
  },
  {
    href: "https://www.instagram.com/nitrimun?igsh=eXQ4enM0c3c5aW0x",
    label: "Follow NITRIMUN on Instagram",
    icon: Instagram,
    external: true,
  },
];
