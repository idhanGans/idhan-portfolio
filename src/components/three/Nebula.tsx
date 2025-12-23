"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NebulaProps {
  intensity?: number;
  speed?: number;
  noiseScale?: number;
}

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Highly optimized fragment shader - uses simple hash noise instead of simplex
const fragmentShader = `
precision mediump float;

uniform float uTime;
uniform float uIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uNoiseScale;

varying vec2 vUv;

// Fast hash function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Simple value noise - much faster than simplex
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Simple FBM with only 3 octaves (was 5)
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  
  value += amplitude * noise(p); p *= 2.0; amplitude *= 0.5;
  value += amplitude * noise(p); p *= 2.0; amplitude *= 0.5;
  value += amplitude * noise(p);
  
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 centeredUv = uv - 0.5;
  
  float time = uTime * 0.08;
  
  // Simple domain warping with only 3 fbm calls (was 9+)
  vec2 q = vec2(
    fbm(uv * uNoiseScale + time * 0.2),
    fbm(uv * uNoiseScale + vec2(5.2, 1.3) + time * 0.15)
  );
  
  float n = fbm(uv * uNoiseScale + q * 2.0 + time * 0.1);
  n = (n + 1.0) * 0.5;
  
  // Color mixing
  vec3 color = mix(uColor1, uColor2, smoothstep(0.2, 0.5, n));
  color = mix(color, uColor3, smoothstep(0.5, 0.8, n));
  
  // Simple vignette
  float vignette = 1.0 - length(centeredUv) * 1.1;
  vignette = smoothstep(0.0, 0.7, vignette);
  
  color *= vignette * uIntensity;
  
  float alpha = n * uIntensity * 0.5;
  
  gl_FragColor = vec4(color, alpha);
}
`;

export default function Nebula({
  intensity = 0.5,
  speed = 0.2,
  noiseScale = 2.5,
}: NebulaProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uColor1: { value: new THREE.Color("#0a0a1a") },
      uColor2: { value: new THREE.Color("#1a1a3a") },
      uColor3: { value: new THREE.Color("#2a1a4a") },
      uNoiseScale: { value: noiseScale },
    }),
    [intensity, noiseScale]
  );

  useFrame((state) => {
    // Update only every 2nd frame for better performance
    frameCount.current++;
    if (frameCount.current % 2 === 0 && meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
