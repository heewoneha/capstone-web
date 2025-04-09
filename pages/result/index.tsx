import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const dummyGifs = Array.from({ length: 10 }, (_, i) => ({
  full: `/gifs/sample-${i + 1}.gif`,
  title: `Dance ${i + 1}`
}));

export default function GalleryPage() {
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUuid = sessionStorage.getItem("uuid");
    if (storedUuid) {
      setUuid(storedUuid);
      console.log("UUID in gallery:", storedUuid);
    } else {
      console.warn("No UUID found in sessionStorage");
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf7fd] p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">🎞️ Choose Your Animation</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        {/* Left: Scrollable GIF list */}
        <div className="w-full md:w-1/2 h-[400px] overflow-y-scroll grid grid-cols-2 gap-4 p-2 bg-white rounded shadow">
          {dummyGifs.map((gif, index) => (
            <div
              key={index}
              className="aspect-square border rounded relative cursor-pointer hover:ring-2 hover:ring-purple-400"
              onClick={() => setSelectedGif(gif.full)}
            >
              <img
                src={gif.full}
                alt={`GIF ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
              <span className="absolute bottom-1 right-1 text-[12px] text-gray-800 bg-white/80 px-1 rounded">
                {gif.title}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Selected GIF display */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-between bg-white rounded shadow p-4">
          <div className="w-full aspect-video bg-gray-200 rounded mb-6 flex items-center justify-center">
            {selectedGif ? (
              <img src={selectedGif} alt="Selected GIF" className="max-w-full max-h-full object-contain rounded" />
            ) : (
              <span className="text-gray-400">No dance selected</span>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <button className="bg-purple-500 text-white px-6 py-2 rounded shadow hover:bg-purple-600">
              Download image
            </button>
            <button className="bg-purple-500 text-white px-6 py-2 rounded shadow hover:bg-purple-600">
              Download video
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-100"
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>

      {/* Test */}
      {uuid && (
        <div className="text-xs text-gray-400 mt-4">
          UUID: {uuid}
        </div>
      )}
    </div>
  );
}
