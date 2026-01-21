import { useEffect, useRef, useState } from "react";

export function useFaceTracking(video?: HTMLVideoElement) {
  const [faceData, setFaceData] = useState<any>(null);
  const faceRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!video) return;

    let active = true;

    const init = async () => {
      const FaceMeshModule = await import("@mediapipe/face_mesh");

      const face = new FaceMeshModule.FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      face.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
      });

      face.onResults((r: any) => {
        if (active) setFaceData(r);
      });

      faceRef.current = face;

      const loop = async () => {
        if (!active || !faceRef.current) return;
        await faceRef.current.send({ image: video });
        rafRef.current = requestAnimationFrame(loop);
      };

      loop();
    };

    init();

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      faceRef.current?.close?.();
      faceRef.current = null;
    };
  }, [video]);

  return faceData;
}
