import React from 'react';
import { useRouter } from "next/router";

export default function SelectBackground() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#fdf7fd] flex flex-col items-center justify-start px-4 py-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-12 text-center flex items-center gap-2">
        🧐 Choose how you'd like to create the background!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* TEXT TO IMAGE */}
        <div
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer"
          onClick={() => router.push('/background/text/upload')}
        >
          <p className="font-bold text-lg mb-4">TEXT TO IMAGE</p>
          <div className="text-6xl font-extrabold mb-4">Tt</div>
        </div>

        {/* IMAGE + TEXT to STYLIZED IMAGE */}
        <div
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer"
          onClick={() => router.push('/background/image_with_text/upload')}
        >
          <p className="font-bold text-lg mb-4">
            IMAGE + TEXT to <br /> STYLIZED IMAGE
          </p>
          <div className="text-5xl mb-4">🖼️💬</div>
        </div>

        {/* RAW IMAGE */}
        <div
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer"
          onClick={() => router.push('/background/raw_image/upload')}
        >
          <p className="font-bold text-lg mb-4">RAW IMAGE</p>
          <div className="text-6xl mb-4">📷</div>
        </div>

        {/* EMPTY BACKGROUND */}
        <div
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer"
          onClick={() => router.push('/draw_character')}
        >
          <p className="font-bold text-lg mb-4">EMPTY BACKGROUND</p>
          <div className="text-6xl mb-4">⬜️</div>
        </div>
      </div>
    </div>
  )
}
