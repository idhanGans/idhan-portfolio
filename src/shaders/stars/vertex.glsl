// Star Particle Vertex Shader
attribute float size;
attribute float opacity;
attribute vec3 velocity;

uniform float uTime;
uniform float uPixelRatio;
uniform float uDepth;

varying float vOpacity;
varying float vDistance;

void main() {
  vec3 pos = position;
  
  // Move particles forward (toward camera)
  pos.z = mod(pos.z + uTime * velocity.z, uDepth) - uDepth * 0.5;
  
  // Subtle drift in x and y
  pos.x += sin(uTime * 0.5 + position.x * 10.0) * 0.1;
  pos.y += cos(uTime * 0.3 + position.y * 10.0) * 0.1;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Calculate distance for depth-based effects
  vDistance = -mvPosition.z;
  
  // Size attenuation based on distance
  float sizeAttenuation = 300.0 / vDistance;
  
  // Fade particles as they get very close
  vOpacity = opacity * smoothstep(0.0, 50.0, vDistance) * smoothstep(500.0, 100.0, vDistance);
  
  gl_PointSize = size * uPixelRatio * sizeAttenuation;
  gl_PointSize = clamp(gl_PointSize, 0.5, 50.0);
  
  gl_Position = projectionMatrix * mvPosition;
}
