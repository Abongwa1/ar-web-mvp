"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { models } from "@/lib/models";

import PoseAR from "./PoseAR";
import FaceAR from "./FaceAR";
import WorldAR from "./WorldAR";

export default function ARPage() {
  const { slug } = useParams<{ slug: string }>();
  const model = models.find((m) => m.slug === slug);

  if (!model) return null;

  const { arProfile } = model;

  return (
    <main className="relative h-screen w-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between px-4 py-3 bg-black/40">
        <Link href={`/models/${slug}`}>← Back</Link>
        <span className="text-sm">{model.name}</span>
      </header>

      {/* Render AR screen based on type */}
      {arProfile.type === "pose" && <PoseAR model={model} />}
      {arProfile.type === "face" && <FaceAR model={model} />}
      {arProfile.type === "world" && <WorldAR model={model} />}
    </main>
  );
}
