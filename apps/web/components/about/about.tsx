"use client";

import React from "react";
import Image from "next/image";
import { AboutImages } from "@/config/About";
import { SectionHeading } from "../ui";

export default function AboutSection() {
  return (
    <section className=" text-[12px] sm:text-[16px] md:text-[14px] overflow-x-hidden">
      {/* Background Image */}

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row w-full justify-center items-center lg:items-start gap-6 lg:gap-8 px-4 py-8 lg:py-16 mt-20">
        "{/* Left Column - About Content */}
        <div className="flex flex-col flex-1 basis-0 w-full sm:max-w-[500px] lg:max-w-[45rem] justify-center items-center lg:[transform:rotateX(-12deg)_rotateY(40deg)] lg:[transform-style:preserve-3d] lg:origin-right">
          {/* Title Section - Centered with conical lines */}
          <div className="flex justify-center items-center w-full h-[3rem] lg:h-[5rem]">
            {/* Conical line - left */}

            <SectionHeading title="ABOUT" className="text-white" />
          </div>

          {/* Content Card with Gradient Border */}
          <div
            className="relative w-full h-auto min-h-[15rem] sm:min-h-[18rem] lg:h-[20rem] rounded-br-xl rounded-tl-xl"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)",
              background:
                "linear-gradient(234deg, #FFFABE 0%, #E7581F 12%, #8D2357 30%, #055A44 44%, #FB229E 59%, #9906BE 75%, #FFF 86%)",
            }}
          >
            <div
              className="p-4 sm:p-5 lg:p-6 bg-white/10 w-full h-full"
              style={{ borderRadius: "calc(2rem - 2px) 0 calc(2rem - 2px) 0" }}
            >
              <div className="pointer-events-none">
                <div className="absolute inset-1 overflow-hidden rounded-br-xl -z-20 rounded-tl-xl">
                  <Image
                    fill
                    alt="Card Background"
                    className="object-cover"
                    src={AboutImages.cardImage}
                  />
                </div>
              </div>
              <div className="absolute top-0 right-0 inset-1 h-full w-full pointer-events-none">
                <div className="absolute inset-1 top-0 right-0 h-full w-full overflow-hidden z-10">
                  <Image
                    width={201}
                    height={201}
                    alt="Decoration"
                    className="absolute top-1 right-3 w-[80px] sm:w-[120px] lg:w-auto object-contain opacity-40"
                    src={AboutImages.topRightImage}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 inset-1 h-full w-full pointer-events-none">
                <div className="absolute inset-1 bottom-0 left-0 h-full w-full overflow-hidden z-10">
                  <Image
                    width={171}
                    height={171}
                    alt="Decoration"
                    className="absolute bottom-3 left-1 w-[60px] sm:w-[100px] lg:w-auto object-contain opacity-50"
                    src={AboutImages.bottomLeftImage}
                  />
                </div>
              </div>

              <p
                className="text-white leading-relaxed relative z-10 text-xl"
                style={{
                  color: "#FFF",
                  fontFamily: "Inria Sans",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                NITRUTSAV 2025: Odisha's grandest literary and cultural spectacle returns with an
                eerie twist—"Mythica: Shadows of the Past and Magic of the Future." From 7th to 9th
                February, 2025, the National Institute of Technology, Rourkela, becomes a portal to
                a realm where ancient secrets collide with forbidden magic. Unravel the mysteries of
                long-forgotten legends, venture into the shadows of the unknown, and awaken the
                arcane forces that blur the line between past and future. Prepare for a
                spine-chilling journey through myth and mystery—where every whisper hides a story,
                and every shadow holds a secret. Dare to join us?
              </p>
            </div>
          </div>

          {/* Bottom Title - NITRUTSAV 2026 */}
          <div className="flex justify-center items-center sm:gap-2 w-full mt-2">
            {/* Conical line image - left */}
            <Image
              width={8725}
              height={19355}
              alt="Line decoration"
              className="hidden sm:block h-[6rem] w-[10rem] sm:w-[10rem] object-contain lg:m-[-10px] m-[-8px] [transform:rotateX(16.5deg)_rotateY(40deg)] transform-style:preserve-3d"
              src={AboutImages.line1Image}
            />
            <span
              className="text-[clamp(1.1rem,3vw,2rem)] font-bold font-baloo bg-clip-text text-transparent whitespace-nowrap font-berry"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, #EA0B0F 0%, #F3BC16 48.08%, #FF0092 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              NITRUTSAV 2026
            </span>
            {/* Conical line image - right */}
            <Image
              width={8725}
              height={19355}
              alt="Line decoration"
              className="hidden sm:block h-[6rem] w-[10rem] sm:w-[10rem] object-contain lg:m-[-10px] m-[-8px] [transform:rotateX(16.5deg)_rotateY(40deg)] transform-style:preserve-3d"
              src={AboutImages.line2Image}
            />
          </div>
        </div>
        {/* Right Column - Image/Video Placeholder */}
        <div className="flex flex-col flex-1 basis-0 w-full max-w-[90vw] sm:max-w-[500px] lg:max-w-[45rem] gap-2 lg:gap-1 justify-center items-center lg:[transform:rotateX(-12deg)_rotateY(-40deg)] lg:[transform-style:preserve-3d] lg:origin-left">
          {/* Decorative Conical Lines - Top */}
          <div className="flex flex-col gap-1 sm:gap-2 justify-end w-full h-[3rem] sm:h-[4rem] lg:h-[5rem]">
            <div
              className="h-[2px] lg:h-[3px] w-8 sm:w-12 lg:w-16 bg-white"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}
            />
            <div
              className="h-[2px] lg:h-[3px] w-16 sm:w-24 lg:w-32 bg-white"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}
            />
            <div
              className="h-[2px] lg:h-[3px] w-[85%] bg-white"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}
            />
          </div>

          {/* Image Frame with Gradient Border */}
          <div
            className="w-full h-[15rem] sm:h-[18rem] lg:h-[20rem] rounded-tr-xl rounded-bl-xl"
            style={{
              border: "2px solid #FFFABE",
              background: "#888",
              boxShadow:
                "12px -10px 18px 0 rgba(106, 0, 132, 0.60), -12px 10px 18px 0 rgba(106, 0, 132, 0.62)",
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center bg-gray-400/30"
              style={{ borderRadius: "0 calc(2rem - 2px) 0 calc(2rem - 2px)" }}
            >
              <div className="text-white/50 text-sm sm:text-base lg:text-lg">Video Content</div>
            </div>
          </div>

          {/* Decorative Conical Lines - Bottom */}
          <div className="flex flex-col gap-1 sm:gap-2 mt-2 lg:mt-4 items-end w-full">
            <div
              className="h-[2px] lg:h-[3px] w-[85%] bg-white"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
            />
            <div
              className="h-[2px] lg:h-[3px] w-16 sm:w-24 lg:w-32 bg-white"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
            />
            <div
              className="h-[2px] lg:h-[3px] w-8 sm:w-12 lg:w-16 bg-white"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
    </section>
  );
}
