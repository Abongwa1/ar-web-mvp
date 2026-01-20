"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "@react-three/drei";
import { useParams } from "next/navigation";
import Link from "next/link";
import { models } from "@/lib/models";
import { Box3, Vector3 } from "three";
import { useEffect } from "react";

function CenteredModel({ url }: { url: string }) {
  const model = useLoader(FBXLoader, url);

  useEffect(() => {
    // Compute bounding box
    const box = new Box3().setFromObject(model);
    const center = new Vector3();
    box.getCenter(center);

    // Move model so its center is at (0,0,0)
    model.position.sub(center);

    // Optional: uniform scale for FBX
    model.scale.setScalar(0.01);
  }, [model]);

  return <primitive object={model} />;
}

export default function ModelPageDesign() {
  const { slug } = useParams<{ slug: string }>();

  const modelData = models.find((m) => m.slug === slug);
  if (!modelData) {
    return (
      <div className="text-white text-center mt-20">
        Model not found
      </div>
    );
  }

  return (
    <main className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* Top bar */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-md">
        <Link href="/products" className="text-sm font-medium">
          ← Back
        </Link>
        <span className="text-sm text-gray-300">
          {modelData.name} • 3D Preview
        </span>
        <div className="w-6" />
      </header>

      {/* 3D Display */}
      <section className="absolute inset-0 flex items-center justify-center">
        <Canvas
          className="w-3/4 h-3/4 bg-gray-800 rounded-xl"
          camera={{ position: [0, 1.2, 3], fov: 50 }}
        >
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <OrbitControls enablePan={false} />

          <CenteredModel url={modelData.modelUrl} />
        </Canvas>
      </section>

      {/* Bottom CTA */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center px-4 py-4 bg-black/30 backdrop-blur-md">
        <Link
          href={`/ar/${modelData.slug}`}
          className="bg-white text-black px-6 py-3 rounded-lg font-medium mb-2"
        >
          View in AR
        </Link>
        <span className="text-xs text-gray-400">
          Drag to rotate • Scroll to zoom
        </span>
      </footer>
    </main>
  );
}
