"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarFieldProps {
  count?: number;
  depth?: number;
  speed?: number;
}

const vertexShader = `
attribute float size;
attribute float opacity;
attribute vec3 velocity;

uniform float uTime;
uniform float uPixelRatio;
uniform float uDepth;

varying float vOpacity;

void main() {
  vec3 pos = position;
  
  pos.z = mod(pos.z + uTime * velocity.z, uDepth) - uDepth * 0.5;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  float distance = -mvPosition.z;
  float sizeAttenuation = 150.0 / max(distance, 1.0);
  
  vOpacity = opacity * smoothstep(0.0, 30.0, distance) * smoothstep(250.0, 60.0, distance);
  
  gl_PointSize = size * uPixelRatio * sizeAttenuation;
  gl_PointSize = clamp(gl_PointSize, 0.5, 20.0);
  
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
precision mediump float;

uniform vec3 uColor;

varying float vOpacity;

void main() {
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  
  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
  
  float twinkle = alpha * vOpacity;
  
  if (twinkle < 0.02) discard;
  
  gl_FragColor = vec4(uColor, twinkle);
}
`;

export default function StarField({
  count = 2000,
  depth = 200,
  speed = 1,
}: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, opacities, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread stars in a cylinder shape
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15 + 2;

      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * depth;

      // Vary star sizes
      sizes[i] = Math.random() * 2 + 0.5;

      // Vary opacity
      opacities[i] = Math.random() * 0.8 + 0.2;

      // Movement velocities
      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = Math.random() * 10 + 5; // Forward motion
    }

    return { positions, sizes, opacities, velocities };
  }, [count, depth]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      uDepth: { value: depth },
      uColor: { value: new THREE.Color("#ffffff") },
    }),
    [depth]
  );

  const frameCount = useRef(0);

  useFrame((state) => {
    // Update only every 2nd frame
    frameCount.current++;
    if (frameCount.current % 2 === 0 && pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime * speed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={count}
          array={opacities}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-velocity"
          count={count}
          array={velocities}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
