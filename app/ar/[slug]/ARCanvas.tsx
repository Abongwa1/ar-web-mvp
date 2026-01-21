"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function ARCanvas({
  children,
  enableAR,
}: {
  children: React.ReactNode;
  enableAR: boolean;
}) {
  return (
    <Canvas
      className="absolute inset-0 z-10"
      camera={{ position: [0, 0.8, 4], fov: 45 }}
      gl={{ alpha: true, preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 5, 5]} />
      {children}
      {!enableAR && <OrbitControls />}
    </Canvas>
  );
}
