import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import { Method } from "axios";
import SubmitButton from '@/components/common/SubmitButton';
import ToolSelector from '@/components/draw_character/ToolSelector';
import ColorPalette from '@/components/draw_character/ColorPalette';
import DrawingCanvas from '@/components/draw_character/DrawingCanvas';
import DrawingTip from '@/components/draw_character/DrawingTip';
import { useApi } from '@/hooks/useApi';

export const METHODS = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
  PUT: 'PUT' as Method,
};

export default function DrawPage() {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(4);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [showPicker, setShowPicker] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const canvasRef = useRef<{ exportImage: () => string }>(null);
  const { request, loading } = useApi();

  useEffect(() => {
    const storedUuid = sessionStorage.getItem("uuid");
    if (storedUuid) {
      setUuid(storedUuid);
    } else {
      router.push("/");
    }
  }, []);

  const handleSubmit = async () => {
    if (!uuid || !canvasRef.current) return;

    try {
      const base64DataUrl = canvasRef.current.exportImage();
      const blob = await (await fetch(base64DataUrl)).blob();
      const file = new File([blob], "character.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("image_file", file);

      await request(METHODS.POST, '/submit/character', formData);

      await request(METHODS.POST, '/model');

      router.push("/result");
    } catch (err) {
      console.error(err);
      setError("Failed to upload character image.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf7fd] overflow-x-hidden px-4 sm:px-6 md:px-12 py-12 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🖌️ Draw your character!
      </h1>

      <ToolSelector tool={tool} onToolChange={setTool} />
      <ColorPalette
        brushColor={brushColor}
        onColorChange={setBrushColor}
        showPicker={showPicker}
        onTogglePicker={() => setShowPicker(!showPicker)}
      />
      <DrawingCanvas
        brushColor={brushColor}
        brushRadius={brushRadius}
        tool={tool}
        ref={canvasRef}
      />
      <DrawingTip />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-8">
        <SubmitButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Next"}
        </SubmitButton>
      </div>
    </div>
  );
}
