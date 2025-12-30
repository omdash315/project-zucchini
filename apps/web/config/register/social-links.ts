import { Instagram, ExternalLink, LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ComponentType, SVGProps } from "react";

export interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    href: "https://whatsapp.com/channel/0029Vb7VdBI4Crfn867OO73q",
    label: "Join WhatsApp Channel",
    icon: WhatsAppIcon,
    external: true,
  },
  {
    href: "https://www.instagram.com/nitrutsav_nitr?igsh=dTZvbWUzeGRvMmRw",
    label: "Follow on Instagram",
    icon: Instagram,
    external: true,
  },
  {
    href: "https://drive.google.com/drive/folders/1UnMuiFdB5jnp9KmIOi2d2o0mZM96xoMQ",
    label: "Participants Declaration Form.pdf",
    icon: ExternalLink,
    external: true,
  },
];
