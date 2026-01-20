"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import { models } from "@/lib/models";

import CameraFeed from "./CameraFeed";
import ARCanvas from "./ARCanvas";
import SnapshotButton from "./SnapshotButton";

export default function ArPage() {
  const { slug } = useParams<{ slug: string }>();
  const modelData = models.find((m) => m.slug === slug);
  const canvasRef = useRef<any>(null);

  const [started, setStarted] = useState(false);
  const [poseData, setPoseData] = useState<any>(null);
  const [bodyProfile, setBodyProfile] = useState<any>(null);
  const [enableAR, setEnableAR] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (!modelData) return <p className="text-white text-center mt-20">Model not found</p>;

  return (
    <main className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between px-4 py-3 bg-black/40 backdrop-blur">
        <Link href={`/models/${slug}`}>← Back</Link>
        <button
          onClick={() => setEnableAR(v => !v)}
          className="bg-white text-black px-3 py-1 rounded text-sm"
        >
          {enableAR ? "3D Preview" : "AR Mode"}
        </button>
      </header>

      {/* Camera */}
      <CameraFeed
        started={started}
        enableAR={enableAR}
        setPoseData={setPoseData}
        setBodyProfile={setBodyProfile}
        isMobile={isMobile}
      />

      {/* Canvas */}
      <ARCanvas
        started={started}
        enableAR={enableAR}
        modelUrl={modelData.modelUrl}
        poseData={poseData}
        bodyProfile={bodyProfile}
        canvasRef={canvasRef}
      />

      {/* Snapshot */}
      {started && enableAR && <SnapshotButton canvasRef={canvasRef} />}

      {/* Start */}
      {!started && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70">
          <button
            onClick={() => setStarted(true)}
            className="bg-white text-black px-6 py-3 rounded-lg"
          >
            Start Try-On
          </button>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </main>
  );
}
