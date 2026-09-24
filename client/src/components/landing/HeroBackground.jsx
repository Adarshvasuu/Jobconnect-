// HeroBackground.jsx — High-contrast, crystal-clear WebGL gradient shader
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = vUv;
    float noise = snoise(uv * 1.8 + vec2(uTime * 0.04, uTime * 0.02)) * 0.2;
    float diagonal = (uv.x + uv.y) * 0.5;
    float gradient = clamp(diagonal + noise, 0.0, 1.0);
    
    // Soft, luminous pale blue to ambient white gradient
    vec3 accentBlue = uColor1; // #60A5FA
    vec3 paleBlue = uColor2;   // #EFF6FF
    vec3 white = vec3(1.0, 1.0, 1.0);

    vec3 color = mix(white, paleBlue, smoothstep(0.0, 0.6, gradient));
    color = mix(color, accentBlue, smoothstep(0.6, 1.2, gradient) * 0.35);

    // Subtle soft vignette
    float vignette = smoothstep(1.3, 0.4, length(uv - 0.5));
    color = mix(color, color * 0.98, (1.0 - vignette) * 0.2);

    gl_FragColor = vec4(color, 1.0);
}
`;

function GradientPlane({ color1, color2, speed = 1 }) {
  const meshRef = useRef(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1000, 1000) },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
  }), [color1, color2]);

  useFrame((state) => {
    const { clock, size } = state;
    uniforms.uTime.value = clock.getElapsedTime() * speed;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function HeroBackground({ color1 = "#60A5FA", color2 = "#EFF6FF", speed = 0.8 }) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div
        className="hero-bg-canvas"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #EFF6FF 0%, #FFFFFF 80%)',
        }}
      />
    );
  }

  return (
    <div className="hero-bg-canvas">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1]} gl={{ antialias: true, alpha: true }}>
        <GradientPlane color1={color1} color2={color2} speed={speed} />
      </Canvas>
    </div>
  );
}
