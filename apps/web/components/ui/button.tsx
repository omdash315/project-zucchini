"use client";

import { ButtonHTMLAttributes } from "react";
import ActiveButton from "./button/active";
import InactiveButton from "./button/inactive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button({ children = "Register Now", className, ...props }: ButtonProps) {
  return (
    <button
      className={`relative  inline-flex items-center justify-center group cursor-pointer backdrop-blur-sm rounded-[100px] ${className || ""}`}
      {...props}
    >
      <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
        <InactiveButton />
      </div>

      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <ActiveButton />
      </div>

      <span className="relative z-10 font-inria text-[25px] font-[700] text-white tracking-wide transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4),0_0_15px_rgba(255,255,255,0.3),0_0_20px_rgba(255,255,255,0.2)]">
        {children}
      </span>
    </button>
  );
}
