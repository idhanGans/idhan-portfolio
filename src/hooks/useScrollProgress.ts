"use client";

import { useState, useEffect, RefObject } from "react";

interface ScrollProgress {
  progress: number;
  isInView: boolean;
}

export function useScrollProgress(ref: RefObject<HTMLElement>): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    isInView: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function handleScroll() {
      const rect = element!.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Check if element is in view
      const isInView = rect.top < windowHeight && rect.bottom > 0;

      // Calculate progress (0 when element enters, 1 when it leaves)
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + elementHeight))
      );

      setScrollProgress({ progress, isInView });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return scrollProgress;
}
