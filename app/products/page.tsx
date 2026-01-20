import Link from "next/link";
import { models } from "@/lib/models";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-10 text-center">Our Products</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {models.map((model) => (
          <div
            key={model.slug}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="h-40 bg-gray-800 rounded mb-4 flex items-center justify-center">
              {/* Display product image using thumbnail */}
              <img
                src={model.thumbnail} // Use thumbnail for the product image
                alt={model.name}
                className="h-full w-auto object-cover" // Keep aspect ratio with object-cover
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 px-4 text-center">{model.name}</h2>
            <div className="flex justify-center mb-4"> {/* Center the button */}
              <Link
                href={`/models/${model.slug}`} // Pass slug in URL
                className="bg-blue-600 text-white px-4 py-2 rounded transition-colors hover:bg-blue-500"
              >
                View Model
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 mt-10 text-center">
        <p className="text-sm text-gray-400">© 2023 YourCompany. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/terms" className="text-gray-400 hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </main>
  );
}