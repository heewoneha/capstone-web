import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GifPreviewProps {
  selectedGif: string | null;
  selectedTitle: string | null;
  selectedDanceName: string | null;
  userUuid: string | null;
}

export default function GifPreview({ selectedGif, selectedTitle, selectedDanceName, userUuid }: GifPreviewProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;

  useEffect(() => {
    if (!selectedTitle || !userUuid || !baseUrl) {
      setPreviewSrc(null);
      return;
    }

    const fetchImage = async () => {
      try {
        setError("");
        const fullUrl = `${baseUrl}/${selectedDanceName}/${userUuid}.mp4`;

        const response = await axios.get(fullUrl, {
          responseType: "arraybuffer",
        });

        const blob = new Blob([response.data], { type: "video/mp4" });
        const imageUrl = URL.createObjectURL(blob);
        setPreviewSrc(imageUrl);
      } catch (err: any) {
        setError("Failed to load dance result.");
        console.error(err);
      }
    };

    fetchImage();
  }, [selectedTitle, userUuid, baseUrl]);

  return (
    <div className="w-full aspect-video bg-gray-200 rounded mb-6 flex items-center justify-center">
      {previewSrc ? (
        <video
          src={previewSrc}
          controls
          autoPlay
          loop
          className="max-w-full max-h-full object-contain rounded"
        />
      ) : error ? (
        <span className="text-red-500 text-sm">{error}</span>
      ) : (
        <span className="text-gray-400">No dance selected</span>
      )}
    </div>
  );
}
