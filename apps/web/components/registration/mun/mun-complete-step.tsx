"use client";

import { CheckCircle, Home, Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { munContactDetails, munSocialLinks } from "@/config/register/mun/social-links";

interface MunCompleteStepProps {
  registrationId?: string | number | null;
  userEmail?: string;
  userName?: string;
}

export function MunCompleteStep({ registrationId }: MunCompleteStepProps) {
  const [copied, setCopied] = useState(false);

  const copyRegId = () => {
    if (registrationId) {
      navigator.clipboard.writeText(registrationId.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-center py-8 max-w-md mx-auto">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2 font-baloo">Welcome to NITRIMUN!</h2>
      <p className="text-white/90 mb-6 font-inria">
        Your registration has been successfully completed
      </p>

      {registrationId && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
          <p className="text-white/70 text-sm font-inria mb-1">Your Registration ID</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-white font-bold text-2xl">{registrationId}</span>
            <button
              onClick={copyRegId}
              className="text-white/70 hover:text-white transition-colors p-1"
              title="Copy Registration ID"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
        <h3 className="text-white font-semibold mb-3 font-inria">Contact Details</h3>
        <div className="space-y-2">
          {munContactDetails.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <contact.icon className="w-4 h-4" />
              <span className="font-inria text-sm">{contact.value || contact.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Social Links / WhatsApp Group */}
      <div className="flex flex-col gap-3 mb-6">
        {munSocialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-200 font-inria border border-white/10"
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
            <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
          </a>
        ))}
      </div>

      {/* Home Button */}
      <Link
        href="/"
        className="gradient-border-btn w-full py-3 px-6 text-white font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2 font-inria"
      >
        <Home className="w-5 h-5" />
        Go to Home
      </Link>
    </div>
  );
}
