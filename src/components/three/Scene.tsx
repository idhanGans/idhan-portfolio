"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import dynamic from "next/dynamic";

// Dynamic imports for code splitting
const Nebula = dynamic(() => import("./Nebula"), { ssr: false });
const StarField = dynamic(() => import("./StarField"), { ssr: false });
const CameraController = dynamic(() => import("./CameraController"), {
  ssr: false,
});

interface SceneProps {
  reducedMotion?: boolean;
}

function SceneContent({ reducedMotion }: SceneProps) {
  return (
    <>
      <CameraController enableMouseMove={!reducedMotion} intensity={0.15} />
      <Nebula
        intensity={reducedMotion ? 0.2 : 0.4}
        speed={reducedMotion ? 0.05 : 0.1}
      />
      <StarField
        count={reducedMotion ? 200 : 600}
        speed={reducedMotion ? 0.2 : 0.5}
      />
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function Scene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Check for mobile
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Mark as loaded
    setIsLoaded(true);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-primary-dark z-0">
        <div className="absolute inset-0 bg-gradient-radial from-secondary via-primary-dark to-primary-dark opacity-50" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        style={{ background: "#0a0a0a" }}
      >
        <Suspense fallback={null}>
          <SceneContent reducedMotion={reducedMotion || isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
