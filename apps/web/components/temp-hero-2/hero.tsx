"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MusicVisualizer from "./music-visualizer";

// Image assets from Figma (updated to match design node 260-1118)
const imgBackground = "https://www.figma.com/api/mcp/asset/e6d6ed01-f68b-4d77-8c1d-26b9c53580c7";
const imgOverlay = "https://www.figma.com/api/mcp/asset/d9101acb-baff-4229-bf44-3d8560649539";
const imgOwl = "https://www.figma.com/api/mcp/asset/ebd34185-d2b9-4e83-97ef-8e94c8117c07"; // Owl with feathers
const imgOwlRight = "https://www.figma.com/api/mcp/asset/d71a9bfa-9fe8-4b40-ba68-4917214da112"; // Right side owl
const imgPeacock = "https://www.figma.com/api/mcp/asset/aaeebbb5-39aa-4509-a203-90c5d19386c5"; // Peacock feathers
const imgPeacockBehind = "https://www.figma.com/api/mcp/asset/956c785f-f510-493e-a8e9-0f83edb9a487"; // Peacock behind girl
const imgGirl = "https://www.figma.com/api/mcp/asset/419059b6-f45f-497c-95b0-855e4a07c551";
const imgLogo = "https://www.figma.com/api/mcp/asset/91b6497e-2b0e-4055-a5e6-fc70e91b8138";
const imgFlowersTopLeft =
  "https://www.figma.com/api/mcp/asset/6290ce3f-2188-48b2-aebc-0c45fdf1a40e";
const imgFlowersTopRight =
  "https://www.figma.com/api/mcp/asset/474108c6-df75-4214-9dc8-6ee57f0567d9";
const imgLine1 = "https://www.figma.com/api/mcp/asset/ee66a6ef-f7ce-4119-bb44-351e95099293";

const NavItem = ({ text, active = false }: { text: string; active?: boolean }) => (
  <div className="relative flex flex-col items-center group cursor-pointer">
    <span
      className={`font-bold font-inria transition-colors ${
        active ? "text-white" : "text-white/40 group-hover:text-white"
      }`}
    >
      {text}
    </span>
    <div
      className={`absolute top-[calc(100%+0.4vw)] w-[3.2vw] h-[0.15vw] relative transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      <Image src={imgLine1} alt="" fill className="object-contain" unoptimized />
    </div>
  </div>
);

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse position to -1 to 1 range
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date("2026-02-06T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main ref={containerRef} className="h-screen w-full bg-[#010005] overflow-hidden relative">
      {/* Background Layer - minimal movement */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mouse.x * 0.3}vw, ${mouse.y * 0.15}vw)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image
          src={imgBackground}
          alt=""
          fill
          className="object-cover object-center scale-105"
          priority
          unoptimized
        />
        {/* Starry overlay */}
        <Image
          src={imgOverlay}
          alt=""
          fill
          className="object-cover object-top mix-blend-screen scale-105"
          unoptimized
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Owl Left - bottom left corner */}
      <div
        className="absolute left-[-10vw] bottom-[-5vw] w-[40vw] h-[40vw] md:left-[15vw] md:bottom-[-20vw] md:w-[45vw] md:h-[45vw]"
        style={{
          transform: `translate(${mouse.x * 1.5}vw, ${mouse.y * 0.8}vw) rotate(-8deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgOwl} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Owl Right - mirrored, bottom right */}
      <div
        className="absolute right-[-10vw] bottom-[-5vw] w-[40vw] h-[40vw] md:right-[15vw] md:bottom-[-20vw] md:w-[45vw] md:h-[45vw]"
        style={{
          transform: `translate(${mouse.x * 1.5}vw, ${mouse.y * 0.8}vw) rotate(8deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgOwl} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Peacock Feathers Left - bottom */}
      <div
        className="absolute left-[-20vw] bottom-[-10vw] w-[50vw] h-[50vw] md:left-[-15vw] md:bottom-[-15vw] md:w-[35vw] md:h-[35vw]"
        style={{
          transform: `translate(${mouse.x * 1.2}vw, ${mouse.y * 0.6}vw) rotate(38deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgPeacock} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Owl Right Side decoration - bottom right */}
      <div
        className="absolute right-[-15vw] bottom-[-10vw] w-[40vw] h-[40vw] md:right-[-10vw] md:bottom-[-10vw] md:w-[30vw] md:h-[30vw]"
        style={{
          transform: `translate(${mouse.x * 1.1}vw, ${mouse.y * 0.5}vw) rotate(-31deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgOwlRight} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Flowers Top Left Corner Frame */}
      <div
        className="absolute left-[-5vw] top-[15vh] w-[40vw] h-[20vw] md:left-[-3vw] md:top-[22vh] md:w-[32vw] md:h-[15vw]"
        style={{
          transform: `translate(${mouse.x * 1.2}vw, ${mouse.y * 0.6}vw) rotate(-20deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgFlowersTopLeft} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Flowers Top Right Corner Frame (mirrored) */}
      <div
        className="absolute right-[-5vw] top-[12vh] w-[40vw] h-[20vw] md:right-[-3vw] md:top-[18vh] md:w-[32vw] md:h-[15vw]"
        style={{
          transform: `translate(${mouse.x * 1.2}vw, ${mouse.y * 0.6}vw) rotate(20deg) scaleX(-1) scaleY(-1)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgFlowersTopRight} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Peacock Behind Girl - Centered */}
      <div
        className="absolute left-1/2 bottom-[-10vw] w-[80vw] h-[80vw] md:bottom-[-19vw] md:w-[44vw] md:h-[44vw] z-20"
        style={{
          transform: `translateX(-50%) translate(${mouse.x * 1.8}vw, ${mouse.y * 0.8}vw)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgPeacockBehind} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Girl Character - Center at very bottom */}
      <div
        className="absolute left-1/2 bottom-[-5vw] w-[80vw] h-[120vw] md:bottom-[-21vw] md:w-[30vw] md:h-[60vw] z-30"
        style={{
          transform: `translateX(-50%) translate(${mouse.x * 2}vw, ${mouse.y * 0.9}vw)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Image src={imgGirl} alt="" fill className="object-contain object-bottom" unoptimized />
      </div>

      {/* Logo + Date Container - Centered properly */}
      <div
        className="absolute left-1/2 top-[15vh] md:top-[12vh] flex flex-col gap-[2vw] md:gap-[0.8vw] items-center md:items-start w-[90vw] md:w-[60vw] z-20"
        style={{
          transform: `translateX(-50%) translate(${mouse.x * 0.6}vw, ${mouse.y * 0.3}vw)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Logo */}
        <div className="relative w-full h-[25vw] md:h-[18vw]">
          <Image
            src={imgLogo}
            alt="Nitrutsav 2026"
            fill
            className="object-contain object-center md:object-left"
            unoptimized
          />
        </div>
        {/* Date */}
        <p className="text-white text-[5vw] md:text-[2vw] font-baloo tracking-wide self-center md:self-start md:ml-[0.5vw]">
          6 - 8<span className="text-[3vw] md:text-[1.3vw] align-super">TH</span>, FEBRUARY
        </p>
      </div>

      {/* Navigation Bar - Fixed, no parallax */}
      <div className="absolute top-[5vw] md:top-[2.5vw] left-[5vw] md:left-[6vw] right-[5vw] md:right-[6vw] flex justify-between items-center z-30">
        {/* Nav Links - Hidden on mobile */}
        <nav className="hidden md:flex gap-[2.5vw] items-center text-[1.25vw]">
          <NavItem text="Home" active />
          <NavItem text="About" />
          <NavItem text="Events" />
          <NavItem text="FAQs" />
          <NavItem text="Sponsors" />
        </nav>

        {/* Countdown + Music Visualizer */}
        <div className="flex gap-[4vw] md:gap-[2.8vw] items-center w-full md:w-auto justify-center md:justify-end">
          {/* Countdown */}
          <div className="flex gap-[1.5vw] md:gap-[0.5vw] items-start text-white">
            {/* Days */}
            <div className="flex flex-col gap-[0.5vw] items-center">
              <span className="text-[6vw] md:text-[1.8vw] font-baloo font-bold">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[3vw] md:text-[1.25vw] font-baloo font-light">DAYS</span>
            </div>
            <span className="text-[4vw] md:text-[1.25vw] font-baloo self-center">:</span>
            {/* Hours */}
            <div className="flex flex-col gap-[0.5vw] items-center">
              <span className="text-[6vw] md:text-[1.8vw] font-baloo font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[3vw] md:text-[1.25vw] font-baloo font-light">HOURS</span>
            </div>
            <span className="text-[4vw] md:text-[1.25vw] font-baloo self-center">:</span>
            {/* Minutes */}
            <div className="flex flex-col gap-[0.5vw] items-center">
              <span className="text-[6vw] md:text-[1.8vw] font-baloo font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[3vw] md:text-[1.25vw] font-baloo font-light">MINUTES</span>
            </div>
          </div>
          {/* Music Visualizer Icon */}
          <MusicVisualizer />
        </div>
      </div>
    </main>
  );
}
