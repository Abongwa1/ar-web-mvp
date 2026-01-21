"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "@react-three/drei";

export default function WorldAR({ model }: any) {
  const obj = useLoader(FBXLoader, model.modelUrl);

  return (
    <Canvas camera={{ position: [0, 1.5, 4] }}>
      <ambientLight intensity={1.2} />
      <primitive object={obj} scale={model.arProfile.scale} />
      <OrbitControls />
    </Canvas>
  );
}
