import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import OptionButton from '@/components/common/OptionButton';

export default function SelectBackground() {
  const router = useRouter();

  useEffect(() => {
    const existing = sessionStorage.getItem('uuid');
    if (!existing) {
      const newUuid = uuidv4();
      sessionStorage.setItem('uuid', newUuid);
    }
  }, []);

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#fdf7fd] flex flex-col items-center justify-start px-4 py-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-12 text-center flex items-center gap-2">
        🧐 Choose how you'd like to create the background!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <OptionButton
          title="TEXT TO IMAGE"
          icon="Tt"
          onClick={() => handleRoute('/background/text/upload')}
          className="font-extrabold"
        />

        <OptionButton
          title="IMAGE + TEXT to STYLIZED IMAGE"
          icon="🖼️💬"
          onClick={() => handleRoute('/background/image_with_text/upload')}
          className="text-5xl"
        />

        <OptionButton
          title="RAW IMAGE"
          icon="📷"
          onClick={() => handleRoute('/background/raw_image/upload')}
        />

        <OptionButton
          title="EMPTY BACKGROUND"
          icon="⬜️"
          onClick={() => handleRoute('/draw_character')}
        />
      </div>
    </div>
  );
}
