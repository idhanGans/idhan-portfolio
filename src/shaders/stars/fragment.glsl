// Star Particle Fragment Shader
precision highp float;

uniform vec3 uColor;
uniform float uGlow;

varying float vOpacity;
varying float vDistance;

void main() {
  // Create circular point with soft edges
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  
  // Soft circle falloff
  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
  
  // Add glow effect
  float glow = exp(-dist * 3.0) * uGlow;
  
  // Color with slight variation based on distance
  vec3 color = uColor;
  color += glow * 0.5;
  
  // Twinkle effect
  float twinkle = alpha * vOpacity;
  
  if (twinkle < 0.01) discard;
  
  gl_FragColor = vec4(color, twinkle);
}
