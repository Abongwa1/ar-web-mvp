"use client";

import { useEffect, useRef } from "react";

interface CameraFeedProps {
  onReady?: (video: HTMLVideoElement) => void;
}

export default function CameraFeed({ onReady }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          onReady?.(videoRef.current);
        }
      } catch (err) {
        console.error("Camera not accessible:", err);
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [onReady]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      playsInline
      muted
    />
  );
}
