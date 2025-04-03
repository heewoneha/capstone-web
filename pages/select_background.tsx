import React from 'react';

export default function SelectBackground() {
  return (
    <div className="min-h-screen bg-[#fdf7fd] flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
        🧐 Choose how you'd like to create the background!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* TEXT TO IMAGE */}
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
          <p className="font-bold text-lg mb-4">TEXT TO IMAGE</p>
          <div className="text-6xl font-extrabold mb-4">Tt</div>
        </div>

        {/* IMAGE + TEXT to STYLIZED IMAGE */}
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
          <p className="font-bold text-lg mb-4">IMAGE + TEXT to <br /> STYLIZED IMAGE</p>
          <div className="text-5xl mb-4">🖼️💬</div>
        </div>

        {/* RAW IMAGE */}
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer">
          <p className="font-bold text-lg mb-4">RAW IMAGE</p>
          <div className="text-6xl mb-4">📷</div>
        </div>
      </div>
    </div>
  )
}
