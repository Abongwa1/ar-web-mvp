"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Upload2DPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Call your 2D → 3D conversion API
      const res = await fetch("/api/convert2d3d", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // Redirect to 3D preview page
      router.push(`/user-model/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Conversion failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
        <div className="mb-6 pt-10">
        <Link
          href="/"
          className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-24"
        style={{
          backgroundImage: "url('/preview.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* lighter overlay */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 relative z-10 text-yellow-100">
          Turn Your 2D Images into 3D Models
        </h1>
        <p className="text-gray-200 max-w-xl mb-8 relative z-10">
          Upload a photo, convert it to 3D, preview it interactively, and even
          view it in AR — all from your browser.
        </p>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Upload Your Image",
            text: "Choose any 2D image from your device. We support JPG, PNG, and more.",
            img: "/preview.webp",
          },
          {
            title: "Convert to 3D",
            text: "Click the Convert button to transform your 2D photo into a 3D model using AI.",
            img: "/preview.webp",
          },
          {
            title: "Preview & AR",
            text: "Interact with your 3D model in the browser or view it in augmented reality.",
            img: "/preview.webp",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-gray-700 p-6 rounded-xl flex flex-col items-center hover:shadow-2xl transition-shadow"
          >
            <img src={item.img} alt={item.title} className="mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-100 text-center">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Upload Section */}
      <section className="px-6 py-16 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-100">Upload Your Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 text-white"
        />
        <button
          onClick={handleConvert}
          disabled={!file || loading}
          className="bg-yellow-500 px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 disabled:opacity-50 transition"
        >
          {loading ? "Converting..." : "Convert to 3D"}
        </button>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Instant 3D Preview",
            text: "See your model in 3D immediately after conversion.",
            img: "/preview.webp",
          },
          {
            title: "Augmented Reality",
            text: "Visualize your model in your real-world environment.",
            img: "/preview.webp",
          },
          {
            title: "Share & Export",
            text: "Download or share your models for projects or fun.",
            img: "/preview.webp",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-gray-700 p-6 rounded-xl flex flex-col items-center hover:shadow-2xl transition-shadow"
          >
            <img src={item.img} alt={item.title} className="mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-100 text-center">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 p-6 text-center">
        <p className="text-sm text-gray-300">
          © 2023 YourCompany. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
