import React from 'react';

interface GifGalleryProps {
  gifs: Array<{ full: string; title: string }>;
  onSelectGif: (gifUrl: string) => void;
}

export default function GifGallery({ gifs, onSelectGif }: GifGalleryProps) {
  return (
    <div className="w-full md:w-1/2 h-[400px] overflow-y-scroll grid grid-cols-2 gap-4 p-2 bg-white rounded shadow">
      {gifs.map((gif, index) => (
        <div
          key={index}
          className="aspect-square border rounded relative cursor-pointer hover:ring-2 hover:ring-purple-400"
          onClick={() => onSelectGif(gif.full)}
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
  );
} 