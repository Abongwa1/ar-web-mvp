"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Group, Vector3, MathUtils } from "three";
import { useRef } from "react";

interface TryOnModelProps {
  url: string;
  poseData: any;
  enabled: boolean;
  bodyProfile: { scale: number; offsetY: number; depth: number } | null;
}

export default function TryOnModel({
  url,
  poseData,
  enabled,
  bodyProfile,
}: TryOnModelProps) {
  const model = useLoader(FBXLoader, url);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;

    // Preview rotation
    if (!enabled || !poseData?.poseLandmarks || !bodyProfile) {
      ref.current.position.lerp(new Vector3(0, -0.6, 0), 0.1);
      ref.current.rotation.y += 0.005;
      ref.current.scale.lerp(
        new Vector3(bodyProfile?.scale ?? 1, bodyProfile?.scale ?? 1, bodyProfile?.scale ?? 1),
        0.1
      );
      return;
    }

    const lm = poseData.poseLandmarks;
    const ls = lm[11], rs = lm[12];
    if (!ls || !rs) return;

    const chestX = (ls.x + rs.x) / 2 - 0.5;
    const chestY = 0.5 - (ls.y + rs.y) / 2;
    const angle = Math.atan2(rs.x - ls.x, rs.y - ls.y);

    ref.current.position.lerp(
      new Vector3(
        chestX * 2,
        chestY * 1.6 - bodyProfile.offsetY,
        -bodyProfile.depth
      ),
      0.2
    );

    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      Math.PI + angle,
      0.2
    );

    ref.current.scale.lerp(new Vector3(bodyProfile.scale, bodyProfile.scale, bodyProfile.scale), 0.1);
  });

  return <primitive ref={ref} object={model} />;
}
