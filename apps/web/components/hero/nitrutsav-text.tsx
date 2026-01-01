"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const imgNitrutsavFilled =
  "https://www.figma.com/api/mcp/asset/30138af7-72d1-4743-8d36-8ce06b3f8424";
const imgNitrutsavOutline =
  "https://www.figma.com/api/mcp/asset/69f1e7ac-1757-4150-81b4-d41d80b86609";

export default function NitrutsavText() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-[1146px] aspect-[1146/303] rotate-[-1.5deg]">
        {/* 2. Filled Image (Animated Reveal from Bottom) */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <Image
            src={imgNitrutsavFilled}
            alt="Nitrutsav Filled"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>

        {/* 3. Foreground Outline (Ensures crisp edges on top of animation) */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={imgNitrutsavOutline}
            alt="Nitrutsav Outline"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
