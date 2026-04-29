"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const FluidMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#0A1628"),
    uLightColor1: new THREE.Color("#2563EB"), // Blue
    uLightColor2: new THREE.Color("#5AC83A"), // Gold
    uResolution: new THREE.Vector2(),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uLightColor1;
    uniform vec3 uLightColor2;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Ripple effect
      float ripple = sin(uv.x * 10.0 + uTime * 0.5) * 0.1;
      ripple += cos(uv.y * 12.0 - uTime * 0.4) * 0.1;
      
      // Secondary waves
      float waves = sin(uv.x * 20.0 - uv.y * 15.0 + uTime * 0.2) * 0.05;
      
      vec3 finalColor = uColor;
      
      // Light from top-left (Blue)
      float light1 = smoothstep(0.8, 0.0, length(uv - vec2(0.2 + ripple, 0.8 + waves)));
      finalColor = mix(finalColor, uLightColor1, light1 * 0.3);
      
      // Light from bottom-right (Gold)
      float light2 = smoothstep(0.8, 0.0, length(uv - vec2(0.8 - waves, 0.2 - ripple)));
      finalColor = mix(finalColor, uLightColor2, light2 * 0.2);
      
      // Add subtle noise/shimmer
      float shimmer = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) * 0.02;
      finalColor += shimmer;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ FluidMaterial });

export default function FluidDistortion() {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      {/* @ts-ignore */}
      <fluidMaterial ref={materialRef} transparent />
    </mesh>
  );
}
