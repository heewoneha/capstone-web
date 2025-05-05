import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Method } from "axios";
import StartEndButton from '@/components/common/StartEndButton';
import GifGallery from '@/components/result/GifGallery';
import GifPreview from '@/components/result/GifPreview';
import DownloadButtons from '@/components/result/DownloadButtons';
import axios from 'axios';

export const METHODS = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
  PUT: 'PUT' as Method,
};

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
    } else {
      router.push("/");
    }
  }, []);

  const handleDownloadImage = async () => {
    if (!selectedGif || !uuid) {
      alert("Please select an animation first.");
      return;
    }

    const title = dummyGifs.find(gif => gif.full === selectedGif)?.title;
    if (!title) return;

    const danceName = title.toLowerCase().replace(" ", "_");

    try {
      const response = await axios.get(`/result/${danceName}`, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "image/gif" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${danceName}_${uuid}.gif`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download image.");
    }
  };

  const handleDownloadVideo = () => {
    alert("Video download not implemented yet.");
  };

  return (
    <div className="min-h-screen bg-[#fdf7fd] p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">🎞️ Choose Your Animation</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        <GifGallery gifs={dummyGifs} onSelectGif={setSelectedGif} />

        <div className="w-full md:w-1/2 flex flex-col items-center justify-between bg-white rounded shadow p-4">
          <GifPreview
            selectedGif={selectedGif}
            selectedTitle={dummyGifs.find(gif => gif.full === selectedGif)?.title || null}
          />
          <DownloadButtons
            onDownloadImage={handleDownloadImage}
            onDownloadVideo={handleDownloadVideo}
          />
        </div>
      </div>

      {uuid && (
        <div className="text-xs text-gray-400 mt-4">
          UUID: {uuid}
        </div>
      )}

      <div className="mt-6">
        <StartEndButton onClick={() => router.push('/')} isStart={false}>
          🏠 Go back home
        </StartEndButton>
      </div>
    </div>
  );
}
