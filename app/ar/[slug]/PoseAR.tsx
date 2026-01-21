"use client";

import { useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Vector3, Group } from "three";
import CameraFeed from "./CameraFeed";
import { usePoseTracking } from "./usePoseTracking";

export default function PoseAR({ model }: any) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const pose = usePoseTracking(video ?? undefined);

  return (
    <>
      <CameraFeed onReady={setVideo} />
      <Canvas className="absolute inset-0">
        <ambientLight intensity={1.3} />
        <PoseModel url={model.modelUrl} pose={pose} arProfile={model.arProfile} />
      </Canvas>
    </>
  );
}

function PoseModel({ url, pose, arProfile }: any) {
  const model = useLoader(FBXLoader, url);
  const ref = useState(() => new Group())[0];

  useFrame(() => {
    if (!pose?.poseLandmarks) return;

    // Decide anchor: wrist or ankle
    const anchor =
      arProfile.anchor === "wrist" ? pose.poseLandmarks[15] : pose.poseLandmarks[27];
    const otherAnchor =
      arProfile.anchor === "wrist" ? pose.poseLandmarks[16] : pose.poseLandmarks[28];

    if (!anchor || !otherAnchor) return;

    const x = (anchor.x + otherAnchor.x) / 2 - 0.5 + (arProfile.offset?.x ?? 0);
    const y = 0.5 - (anchor.y + otherAnchor.y) / 2 + (arProfile.offset?.y ?? 0);

    const width = Math.abs(anchor.x - otherAnchor.x);

    ref.position.lerp(new Vector3(x * 2, y * 1.6, arProfile.offset?.z ?? 0), 0.2);
    ref.scale.setScalar(width * (arProfile.scale * 100));
  });

  return <primitive ref={ref} object={model} />;
}
