import Image from "next/image";
import { HERO_IMAGES, PARALLAX_MOUSE, PARALLAX_SCROLL, TRANSITIONS } from "@/config/hero";

interface ParallaxLayerProps {
  mouse: { x: number; y: number };
  scrollY: number;
}

export function BackgroundLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.background.x}vw, ${mouse.y * PARALLAX_MOUSE.background.y}vw) translateY(${scrollY * PARALLAX_SCROLL.background}px)`,
        transition: `transform ${TRANSITIONS.background}s ease-out`,
      }}
    >
      <Image
        src={HERO_IMAGES.background}
        alt="Background"
        fill
        className="object-cover object-center scale-110 blur-[2px] brightness-110 saturate-125"
        priority
      />
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent mix-blend-overlay" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}

export function PeacockLeftLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden md:block absolute left-[-10vw] md:left-[15vw] bottom-[-5vw] md:bottom-[-20vw] w-[40vw] md:w-[45vw] h-[40vw] md:h-[45vw] z-[5] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.owls.x}vw, ${mouse.y * PARALLAX_MOUSE.owls.y}vw) rotate(-8deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.owlLeft} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function PeacockRightLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden md:block absolute right-[-10vw] md:right-[15vw] bottom-[-5vw] md:bottom-[-20vw] w-[40vw] md:w-[45vw] h-[40vw] md:h-[45vw] z-[5] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.owls.x}vw, ${mouse.y * PARALLAX_MOUSE.owls.y}vw) rotate(8deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.owlLeft} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function Parrot({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden llsmd:block absolute left-[-20vw] md:left-[-15vw] bottom-[-10vw] md:bottom-[-15vw] w-[50vw] md:w-[35vw] h-[50vw] md:h-[35vw] z-[6] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.peacockFeathers.x}vw, ${mouse.y * PARALLAX_MOUSE.peacockFeathers.y}vw) rotate(38deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.peacockLeft} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function OwlRightDecorationLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden llsmd:block absolute right-[-15vw] md:right-[-10vw] bottom-[-10vw] md:bottom-[-10vw] w-[40vw] md:w-[30vw] h-[40vw] md:h-[30vw] z-[7] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.owlRight.x}vw, ${mouse.y * PARALLAX_MOUSE.owlRight.y}vw) rotate(-31deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.owlRight} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function PeacockBehindLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="absolute left-1/2 bottom-[-5vw] md:bottom-[-10vw] lmd:bottom-[-10vw] llmd:bottom-[-15vw] 2xl:bottom-[-15vw] w-[50vw] md:w-[40vw] lmd:w-[30vw] h-[90vw] md:h-[40vw] lmd:h-[50vw] z-[20] pointer-events-none"
      style={{
        transform: `translateX(-50%) translate(${mouse.x * PARALLAX_MOUSE.peacockBehind.x}vw, ${mouse.y * PARALLAX_MOUSE.peacockBehind.y}vw) translateY(${scrollY * PARALLAX_SCROLL.peacockBehind}px)`,
        transition: `transform ${TRANSITIONS.peacockBehind}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.peacockBehind} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function GirlLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="absolute left-1/2 -bottom-0 lsm:bottom-[-30vw] md:bottom-[-5vw] h-[150vw] w-[150vw] ssm:h-[120vw] ssm:w-[120vw] lsm:h-[90vw] lmd:h-[40vw] lsm:w-[90vw] llsmd:w-[80vw] llsmd:h-[80vw] llmd:w-[70vw] md:w-[60vw] z-[30] pointer-events-none"
      style={{
        transform: `translateX(-50%) translate(${mouse.x * PARALLAX_MOUSE.girl.x}vw, ${mouse.y * PARALLAX_MOUSE.girl.y}vw) translateY(${scrollY * PARALLAX_SCROLL.girl}px)`,
        transition: `transform ${TRANSITIONS.girl}s ease-out`,
      }}
    >
      <Image
        src={HERO_IMAGES.girl}
        alt="Nitrutsav Character"
        fill
        className="object-contain object-bottom"
        priority
        unoptimized
      />
    </div>
  );
}

export function GirlLayer2({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="absolute left-1/2 -bottom-0 lsm:bottom-[-15vw] md:bottom-[-5vw] lmd:bottom-[-30vw] h-[150vw] w-[150vw] ssm:h-[120vw] ssm:w-[120vw] lsm:h-[90vw] lsm:w-[90vw] llsmd:w-[80vw] llsmd:h-[80vw] md:w-[30vw] lmd:h-[38vw] llg:h-[38vw] 2xl:h-[43vw] z-[30]"
      style={{
        transform: `translateX(-50%) translate(${mouse.x * PARALLAX_MOUSE.girl.x}vw, ${mouse.y * PARALLAX_MOUSE.girl.y}vw) translateY(${scrollY * PARALLAX_SCROLL.girl}px)`,
        transition: `transform ${TRANSITIONS.girl}s ease-out`,
      }}
    >
      <Image
        src={HERO_IMAGES.girl}
        alt="Nitrutsav Character"
        fill
        className="object-contain object-bottom"
        priority
        unoptimized
      />
    </div>
  );
}
export function LogoLayer({
  mouse,
  scrollY,
  children,
}: ParallaxLayerProps & { children?: React.ReactNode }) {
  return (
    <div className="absolute left-0 right-0 -top-55 lsm:-top-10 llmd:-top-10 llg:-top-50 2xl:-top-80 bottom-0 flex items-center justify-center z-[25] pointer-events-none">
      <div
        className="flex flex-col items-center 2xl:items-start max-w-[80%] md:max-w-[50%] 2xl:max-w-[50%]"
        style={{
          transform: `translate(${mouse.x * PARALLAX_MOUSE.logo.x}vw, ${mouse.y * PARALLAX_MOUSE.logo.y}vw) translateY(${scrollY * PARALLAX_SCROLL.logo}px)`,
          transition: `transform ${TRANSITIONS.logo}s ease-out`,
        }}
      >
        {/* Light strings relative to logo */}
        {children}
        {/* Logo */}
        <div className="relative w-[90vw] lsm:w-[80vw] md:w-[50vw] 2xl:w-[50vw] h-[35vw] lsm:h-[35vw] md:h-[20vw] 2xl:h-[15vw] drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] filter">
          <Image
            src={HERO_IMAGES.logo}
            alt="Nitrutsav 2026"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
        {/* Date */}
      </div>
    </div>
  );
}

export function GradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[10vw] bg-gradient-to-t from-black to-transparent z-[40] pointer-events-none" />
  );
}
