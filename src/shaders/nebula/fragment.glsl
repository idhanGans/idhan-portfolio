// Nebula Fragment Shader
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uNoiseScale;
uniform float uSpeed;

varying vec2 vUv;
varying vec3 vPosition;

// Simplex 3D Noise
vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Fractal Brownian Motion
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for(int i = 0; i < 6; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  
  return value;
}

// Domain warping for more organic look
float warpedFbm(vec3 p, float time) {
  vec3 q = vec3(
    fbm(p + vec3(0.0, 0.0, 0.0)),
    fbm(p + vec3(5.2, 1.3, 2.8)),
    fbm(p + vec3(1.7, 9.2, 3.1))
  );
  
  vec3 r = vec3(
    fbm(p + 4.0 * q + vec3(1.7, 9.2, 0.0) + 0.15 * time),
    fbm(p + 4.0 * q + vec3(8.3, 2.8, 0.0) + 0.126 * time),
    fbm(p + 4.0 * q + vec3(0.0, 0.0, 0.0) + 0.1 * time)
  );
  
  return fbm(p + 4.0 * r);
}

void main() {
  vec2 uv = vUv;
  vec2 centeredUv = uv - 0.5;
  
  // Create depth effect with time
  float time = uTime * uSpeed;
  
  // Multiple layers of noise for depth
  vec3 pos1 = vec3(uv * uNoiseScale, time * 0.1);
  vec3 pos2 = vec3(uv * uNoiseScale * 0.5, time * 0.05 + 10.0);
  vec3 pos3 = vec3(uv * uNoiseScale * 2.0, time * 0.15 + 20.0);
  
  // Generate warped noise layers
  float noise1 = warpedFbm(pos1, time);
  float noise2 = warpedFbm(pos2, time * 0.8);
  float noise3 = warpedFbm(pos3, time * 1.2);
  
  // Combine noise layers
  float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
  combinedNoise = (combinedNoise + 1.0) * 0.5; // Normalize to 0-1
  
  // Create color gradients
  vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.5, combinedNoise));
  color = mix(color, uColor3, smoothstep(0.5, 1.0, combinedNoise));
  
  // Add radial gradient for depth
  float radialGradient = 1.0 - length(centeredUv) * 1.2;
  radialGradient = smoothstep(0.0, 1.0, radialGradient);
  
  // Add subtle pulsing glow
  float pulse = sin(time * 0.5) * 0.1 + 0.9;
  
  // Add bright spots (stars in nebula)
  float brightSpots = pow(snoise(vec3(uv * 20.0, time * 0.2)) * 0.5 + 0.5, 8.0);
  
  // Combine everything
  color *= radialGradient * pulse;
  color += brightSpots * vec3(1.0, 0.9, 0.8) * 0.3;
  
  // Apply intensity
  color *= uIntensity;
  
  // Add subtle vignette
  float vignette = 1.0 - pow(length(centeredUv) * 1.1, 2.0);
  color *= vignette;
  
  // Output with alpha for blending
  float alpha = smoothstep(0.0, 0.3, combinedNoise) * uIntensity;
  
  gl_FragColor = vec4(color, alpha);
}
