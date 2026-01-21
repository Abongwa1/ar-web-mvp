import { useEffect, useRef, useState } from "react";

export function usePoseTracking(video?: HTMLVideoElement) {
  const [poseData, setPoseData] = useState<any>(null);
  const poseRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!video) return;

    let active = true;

    const init = async () => {
      const PoseModule = await import("@mediapipe/pose/pose.js");

      const pose = new PoseModule.Pose({
        locateFile: (f: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      pose.onResults((r: any) => {
        if (active) setPoseData(r);
      });

      poseRef.current = pose;

      const loop = async () => {
        if (!active || !poseRef.current) return;
        await poseRef.current.send({ image: video });
        rafRef.current = requestAnimationFrame(loop);
      };

      loop();
    };

    init();

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      poseRef.current?.close?.();
      poseRef.current = null;
    };
  }, [video]);

  return poseData;
}
