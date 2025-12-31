import { useState, useEffect, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMouseParallax(containerRef: RefObject<HTMLDivElement | null>): MousePosition {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile (768px or lower)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse position to -1 to 1 range
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [containerRef, isMobile]);

  return mouse;
}

export function useScrollParallax(): number {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile (768px or lower)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (isMobile) return;
      setScrollY(window.scrollY);
    };

    if (!isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return scrollY;
}

export function useParallax(containerRef: RefObject<HTMLDivElement | null>) {
  const mouse = useMouseParallax(containerRef);
  const scrollY = useScrollParallax();

  return { mouse, scrollY, containerRef };
}
