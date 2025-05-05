import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GifPreviewProps {
  selectedGif: string | null;
  selectedTitle: string | null;
}

export default function GifPreview({ selectedGif, selectedTitle }: GifPreviewProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedTitle) {
      setPreviewSrc(null);
      return;
    }

    const fetchImage = async () => {
      try {
        setError("");
        const danceName = selectedTitle.toLowerCase().replace(" ", "_");
        const response = await axios.get(`/result/${danceName}`, {
          responseType: "arraybuffer",
        });

        const blob = new Blob([response.data], { type: "image/gif" });
        const imageUrl = URL.createObjectURL(blob);
        setPreviewSrc(imageUrl);
      } catch (err: any) {
        setError("Failed to load dance result.");
        console.error(err);
      }
    };

    fetchImage();
  }, [selectedTitle]);

  return (
    <div className="w-full aspect-video bg-gray-200 rounded mb-6 flex items-center justify-center">
      {previewSrc ? (
        <img
          src={previewSrc}
          alt="Dance Result"
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
