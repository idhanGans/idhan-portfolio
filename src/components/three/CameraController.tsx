"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface CameraControllerProps {
  enableMouseMove?: boolean;
  intensity?: number;
}

export default function CameraController({
  enableMouseMove = true,
  intensity = 0.2,
}: CameraControllerProps) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameCount = useRef(0);

  useEffect(() => {
    if (!enableMouseMove) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableMouseMove]);

  useFrame(() => {
    if (!enableMouseMove) return;

    // Update only every 3rd frame for subtle movement
    frameCount.current++;
    if (frameCount.current % 3 !== 0) return;

    // Smooth camera movement with reduced lerp factor
    targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.03;
    targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.03;

    // Apply to camera position
    camera.position.x = targetRef.current.x * intensity;
    camera.position.y = targetRef.current.y * intensity;
  });

  return null;
}
