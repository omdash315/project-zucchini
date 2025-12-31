"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type MainButtonVariant = "default" | "hover";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MainButtonVariant;
  children?: React.ReactNode;
}

const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  ({ variant = "default", children = "Register Now", className, ...props }, ref) => {
    const isHover = variant === "hover";

    return (
      <button
        ref={ref}
        className={cn(
          "relative flex items-center justify-center",
          "h-[60px] w-[308px] rounded-[48px]",
          "backdrop-blur-sm",
          "px-6 py-4",
          "font-inria text-[32px] font-bold text-white",
          "transition-all duration-300 ease-out",
          "cursor-pointer",
          "group",
          className
        )}
        style={{
          backgroundImage:
            "linear-gradient(77deg, rgba(170, 22, 126, 0.51) 2.5%, rgba(62, 113, 217, 0.51) 100%)",
        }}
        {...props}
      >
        <span
          className={cn(
            "absolute -inset-0.5 rounded-[48px] pointer-events-none transition-opacity duration-300",
            "opacity-0 group-hover:opacity-100",
            "shadow-[inset_-4px_-4px_20px_0px_rgba(255,255,255,0.25),inset_4px_4px_20px_0px_white]"
          )}
        />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

MainButton.displayName = "MainButton";

export default MainButton;
