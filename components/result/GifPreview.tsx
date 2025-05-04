import React from 'react';

interface GifPreviewProps {
  selectedGif: string | null;
}

export default function GifPreview({ selectedGif }: GifPreviewProps) {
  return (
    <div className="w-full aspect-video bg-gray-200 rounded mb-6 flex items-center justify-center">
      {selectedGif ? (
        <img 
          src={selectedGif} 
          alt="Selected GIF" 
          className="max-w-full max-h-full object-contain rounded" 
        />
      ) : (
        <span className="text-gray-400">No dance selected</span>
      )}
    </div>
  );
} 