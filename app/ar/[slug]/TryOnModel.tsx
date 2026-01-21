"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Group, Vector3, MathUtils } from "three";

type Props = {
  url: string;
  enableAR: boolean;
  poseData: any;
};

export default function TryOnModel({
  url,
  enableAR,
  poseData,
}: Props) {
  const model = useLoader(FBXLoader, url);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;

    if (!enableAR || !poseData?.poseLandmarks) {
      ref.current.position.lerp(new Vector3(0, -0.6, 0), 0.1);
      ref.current.rotation.y += 0.005;
      return;
    }

    const lm = poseData.poseLandmarks;
    const ls = lm[11];
    const rs = lm[12];
    if (!ls || !rs) return;

    const cx = (ls.x + rs.x) / 2 - 0.5;
    const cy = 0.5 - (ls.y + rs.y) / 2;
    const width = Math.abs(ls.x - rs.x);

    const angle = Math.atan2(rs.y - ls.y, rs.x - ls.x);

    ref.current.position.lerp(
      new Vector3(cx * 2, cy * 1.6, 0),
      0.2
    );

    ref.current.scale.lerp(
      new Vector3(width * 3, width * 3, width * 3),
      0.2
    );

    ref.current.rotation.z = MathUtils.lerp(
      ref.current.rotation.z,
      -angle,
      0.2
    );

    ref.current.rotation.y = Math.PI;
  });

  return <primitive ref={ref} object={model} scale={0.01} />;
}
