"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TryOnModel from "./TryOnModel";

interface ARCanvasProps {
  started: boolean;
  enableAR: boolean;
  modelUrl: string;
  poseData: any;
  bodyProfile: any;
  canvasRef: any;
}

export default function ARCanvas({
  started,
  enableAR,
  modelUrl,
  poseData,
  bodyProfile,
  canvasRef,
}: ARCanvasProps) {
  if (!started) return null;

  return (
    <Canvas
      className="absolute inset-0 z-10"
      camera={{ position: [0, 0.8, 4], fov: 45 }}
      gl={{ alpha: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => (canvasRef.current = gl)}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 5, 5]} />

      <TryOnModel
        url={modelUrl}
        poseData={poseData}
        enabled={enableAR}
        bodyProfile={bodyProfile}
      />

      {!enableAR && <OrbitControls />}
    </Canvas>
  );
}
