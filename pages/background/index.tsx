import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { Method } from "axios";
import { v4 as uuidv4 } from 'uuid';
import OptionButton from '@/components/common/OptionButton';
import { useApi } from "@/hooks/useApi";

export const METHODS = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
  PUT: 'PUT' as Method,
};

export default function SelectBackground() {
  const router = useRouter();
  const {request, loading} = useApi();

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
  
  const handleEmptyBackground = async () => {
    const uuid = sessionStorage.getItem('uuid');
    if (!uuid) {
      console.warn("UUID is missing");
      return;
    }

    const payload = {
      text: null,
      image_base64: null,
    };

    try {
      await request(
        METHODS.POST,
        "/submit/background",
        payload,
      );

      router.push('/draw_character');
    } catch (err) {
      console.error("Failed to submit empty background:", err);
      alert("Failed to submit empty background. Please try again.");
    }
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
          onClick={handleEmptyBackground}
          disabled={loading}
        />
      </div>
    </div>
  );
}
