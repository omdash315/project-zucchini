"use client";

import { useRef } from "react";
import { useParallax } from "./hooks";
import {
  BackgroundLayer,
  PeacockLeftLayer,
  OwlRightDecorationLayer,
  GirlLayer,
  LogoLayer,
  GradientOverlay,
  PeacockRightLayer,
  Parrot,
} from "./layers";
import FireworksEffect from "@/components/coming-soon/fireworks-effects";
import { LightStrings } from "./light-strings";
import Button from "../ui/button";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mouse, scrollY } = useParallax(containerRef);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden relative 2xl:max-h-[56.25vw] 2xl:min-h-[56.25vw]"
    >
      <FireworksEffect />

      <BackgroundLayer mouse={mouse} scrollY={scrollY} />

      <PeacockLeftLayer mouse={mouse} scrollY={scrollY} />
      <PeacockRightLayer mouse={mouse} scrollY={scrollY} />
      <Parrot mouse={mouse} scrollY={scrollY} />
      <OwlRightDecorationLayer mouse={mouse} scrollY={scrollY} />

      {/* <PeacockBehindLayer mouse={mouse} scrollY={scrollY} /> */}

      <LogoLayer mouse={mouse} scrollY={scrollY}>
        <LightStrings />
      </LogoLayer>

      <GirlLayer mouse={mouse} scrollY={scrollY} />

      <div className="absolute md:bottom-20 bottom-10 left-1/2 -translate-x-1/2 z-50">
        <Link href="/register">
          <Button className="h-[75px] w-[275px]">Register Now</Button>
        </Link>
      </div>
      <GradientOverlay />
    </main>
  );
}
