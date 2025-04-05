import React from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#fdf7fd] text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          🎨 Motion Canvas
        </h1>

        <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📋 How to use?</h2>

          {/* Step 1 */}
          <div className="bg-gray-100 rounded-xl p-4 mb-4 flex items-start gap-4">
            <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-none shrink-0 leading-none">
              1
            </div>
            <div>
              <p className="font-semibold">
                Start from a text prompt / raw uploaded image / AI-refined image / no background
              </p>
              <p className="text-sm text-gray-600">
                Set the background for the dancing character.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-100 rounded-xl p-4 mb-4 flex items-start gap-4">
            <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-none shrink-0 leading-none">
              2
            </div>
            <div>
              <p className="font-semibold">
                Use uploaded character / create character live on drawing board
              </p>
              <p className="text-sm text-gray-600">
                Choose a dancing character.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-100 rounded-xl p-4 flex items-start gap-4">
            <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-none shrink-0 leading-none">
              3
            </div>
            <div>
              <p className="font-semibold">Select a dance</p>
              <p className="text-sm text-gray-600">Export the result.</p>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => router.push('/background/index.tsx')}
            className="bg-[#AA43DE] text-white text-xl px-8 py-4 rounded-full font-semibold hover:bg-[#9329c5] transition-all shadow-md w-full max-w-md"
          >
            Let's Get Started!
          </button>
        </div>

      </div>
    </div>
  );
}
