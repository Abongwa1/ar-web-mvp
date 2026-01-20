"use client";

import { useEffect, useRef } from "react";

interface CameraFeedProps {
  started: boolean;
  enableAR: boolean;
  setPoseData: (data: any) => void;
  setBodyProfile: (profile: {
    scale: number;
    offsetY: number;
    depth: number;
  }) => void;
  isMobile: boolean;
}

export default function CameraFeed({
  started,
  enableAR,
  setPoseData,
  setBodyProfile,
  isMobile,
}: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const poseRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const calibratedRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (!started || !enableAR) return;
    if (poseRef.current) return;

    const init = async () => {
      const videoEl = videoRef.current;
      if (!videoEl) return; // ✅ TS-safe guard

      try {
        const { Pose } = await import("@mediapipe/pose/pose.js");
        const { Camera } = await import(
          "@mediapipe/camera_utils/camera_utils.js"
        );

        const pose = new Pose({
          locateFile: (f: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`,
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.6,
        });

        pose.onResults((results: any) => {
          if (!mountedRef.current) return;

          setPoseData(results);

          // ---- ONE-TIME CALIBRATION ----
          if (!calibratedRef.current && results.poseLandmarks) {
            const ls = results.poseLandmarks[11];
            const rs = results.poseLandmarks[12];
            if (!ls || !rs) return;

            const shoulderWidth = Math.abs(ls.x - rs.x);
            const scale = shoulderWidth * (isMobile ? 2.2 : 2.6);

            setBodyProfile({
              scale,
              offsetY: isMobile ? 0.25 : 0.2,
              depth: isMobile ? 1.2 : 1.4,
            });

            calibratedRef.current = true;
          }
        });

        const camera = new Camera(videoEl, {
          width: 640,
          height: 480,
          onFrame: async () => {
            if (!poseRef.current) return;
            await poseRef.current.send({ image: videoEl });
          },
        });

        poseRef.current = pose;
        cameraRef.current = camera;

        await camera.start();
      } catch (err) {
        console.error("Mediapipe init failed", err);
      }
    };

    init();

    return () => {
      mountedRef.current = false;

      cameraRef.current?.stop();
      cameraRef.current = null;

      poseRef.current?.close?.();
      poseRef.current = null;

      calibratedRef.current = false;
    };
  }, [started, enableAR, isMobile, setPoseData, setBodyProfile]);

  return (
    <>
      {enableAR && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
      )}
    </>
  );
}
