"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const images = [
  "/ar_accessible.webp", 
  "/preview.webp",
  "/confidence.jpg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-24"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Lighter overlay */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight relative z-10 text-yellow-100">
          Web-Based AR Product Viewer
        </h1>
        <p className="text-gray-200 max-w-xl mb-8 relative z-10">
          View and interact with products in augmented reality directly from your
          browser — no app required.
        </p>
        <div className="flex gap-4 relative z-10">
          <Link
            href="/products"
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition transform hover:scale-105 hover:bg-yellow-400"
          >
            View Products
          </Link>
          <Link
            href="/2d-3d"
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition transform hover:scale-105 hover:bg-yellow-400"
          >
            Convert 2D to 3D
          </Link>
        </div>
      </section>

      {/* Vision / Mission / Goal */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-16 max-w-6xl mx-auto">
        {[
          { title: "Vision", text: "Make AR accessible to everyone through the web.", img: "/ar_accessible.webp" },
          { title: "Mission", text: "Enable users to preview products in real-world environments instantly.", img: "/preview.webp" },
          { title: "Goal", text: "Help users make confident decisions through immersive previews.", img: "/confidence.jpg" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-gray-700 p-6 rounded-xl hover:shadow-2xl transition-shadow flex flex-col items-center"
          >
            <img src={item.img} alt={item.title} className="mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-100 text-center">{item.text}</p>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-yellow-100">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { step: "1. Select a product", img: "/select-product.jpg" },
            { step: "2. Allow camera access", img: "/camera-access.webp" },
            { step: "3. View and interact in AR", img: "/virtual-reality.webp" },
            { step: "4. Capture a snapshot", img: "/taking-selfie.webp" },
          ].map((item, index) => (
            <div key={index} className="flex items-center bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
              <img src={item.img} alt={item.step} className="w-16 h-16 mr-4 rounded" />
              <p className="text-gray-200">{item.step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 p-6 text-center">
        <p className="text-sm text-gray-300">© 2023 YourCompany. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/terms" className="text-gray-300 hover:underline">Terms of Service</Link>
          <Link href="/privacy" className="text-gray-300 hover:underline">Privacy Policy</Link>
        </div>
      </footer>
    </main>
  );
}
