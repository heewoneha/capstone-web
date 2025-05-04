import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import StartEndButton from '@/components/common/StartEndButton';
import GifGallery from '@/components/result/GifGallery';
import GifPreview from '@/components/result/GifPreview';
import DownloadButtons from '@/components/result/DownloadButtons';

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

  const handleDownloadImage = () => {
    // TODO: Implement image download
  };

  const handleDownloadVideo = () => {
    // TODO: Implement video download
  };

  return (
    <div className="min-h-screen bg-[#fdf7fd] p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">🎞️ Choose Your Animation</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        <GifGallery gifs={dummyGifs} onSelectGif={setSelectedGif} />
        
        <div className="w-full md:w-1/2 flex flex-col items-center justify-between bg-white rounded shadow p-4">
          <GifPreview selectedGif={selectedGif} />
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
