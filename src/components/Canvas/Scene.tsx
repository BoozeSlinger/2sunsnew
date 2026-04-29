"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FluidDistortion from "./FluidDistortion";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: false }} // Performance optimization from cinematic-scroll-world skill
    >
      <Suspense fallback={null}>
        <FluidDistortion />
        
        {/* Lights */}
        <pointLight position={[-5, 5, 5]} intensity={50} color="#2563EB" />
        <pointLight position={[5, -5, 5]} intensity={30} color="#F59E0B" />
        
        {/* Post-processing */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={0.5} 
            radius={0.4}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
