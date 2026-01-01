"use client";

import { CheckCircle, Home, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { socialLinks } from "@/config/register/social-links";
import { SocialLinkButton } from "./social-link-button";

interface CompleteStepProps {
  userId?: number | null;
}

export function CompleteStep({ userId }: CompleteStepProps) {
  const [copied, setCopied] = useState(false);

  const copyRegId = () => {
    if (userId) {
      navigator.clipboard.writeText(userId.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-center py-8 max-w-md mx-auto">
      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2 font-baloo">Welcome to NITRUTSAV 2026!</h2>
      <p className="text-white/90 mb-4 font-inria">
        Your registration has been successfully completed
      </p>

      {userId && (
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <p className="text-white/70 text-sm font-inria mb-1">Your Registration ID</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-white font-bold text-xl font-baloo">{userId}</span>
            <button
              onClick={copyRegId}
              className="text-white/70 hover:text-white transition-colors"
              title="Copy Registration ID"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6">
        {socialLinks.map((link) => (
          <SocialLinkButton key={link.href} link={link} />
        ))}
      </div>

      <Link
        href={"/"}
        className="gradient-border-btn w-full py-3 px-6 text-white font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2 font-inria"
      >
        <Home className="w-5 h-5" />
        Go to Home
      </Link>
    </div>
  );
}
