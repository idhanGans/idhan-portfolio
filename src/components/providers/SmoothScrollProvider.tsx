"use client";

import { useRef, useEffect, ReactNode, useState } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile or reduced motion preference
    const isMobileDevice = window.innerWidth < 768;
    setIsMobile(isMobileDevice);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Disable smooth scroll on mobile for better performance
    if (prefersReducedMotion || isMobileDevice) {
      return;
    }

    lenisRef.current = new Lenis({
      duration: 0.8, // Reduced from 1.2 for snappier feel
      easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for smoother feel
      touchMultiplier: 1.5,
      lerp: 0.1, // Lower lerp for better performance
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
