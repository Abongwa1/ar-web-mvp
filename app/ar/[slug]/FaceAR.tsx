"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Vector3, Group } from "three";

import CameraFeed from "./CameraFeed";
import { useFaceTracking } from "./useFaceTracking";

export default function FaceAR({ model }: any) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const face = useFaceTracking(video ?? undefined);

  return (
    <>
      <CameraFeed onReady={setVideo} />
      <Canvas className="absolute inset-0">
        <ambientLight intensity={1.2} />
        <Glasses url={model.modelUrl} face={face} arProfile={model.arProfile} />
      </Canvas>
    </>
  );
}

function Glasses({ url, face, arProfile }: any) {
  const model = useLoader(FBXLoader, url);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current || !face?.multiFaceLandmarks?.[0]) return;

    const lm = face.multiFaceLandmarks[0];
    const leftEye = lm[33];
    const rightEye = lm[263];
    const nose = lm[168];

    const x = (leftEye.x + rightEye.x) / 2 - 0.5 + (arProfile.offset?.x ?? 0);
    const y = 0.5 - nose.y + (arProfile.offset?.y ?? 0);
    const z = arProfile.offset?.z ?? 0.15;

    const width = Math.abs(leftEye.x - rightEye.x);

    ref.current.position.lerp(new Vector3(x * 2, y * 2, z), 0.3);
    ref.current.scale.setScalar(width * (arProfile.scale * 600));
  });

  return <primitive ref={ref} object={model} />;
}
