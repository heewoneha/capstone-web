import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import SubmitButton from '@/components/common/SubmitButton';
import ToolSelector from '@/components/draw_character/ToolSelector';
import ColorPalette from '@/components/draw_character/ColorPalette';
import DrawingCanvas from '@/components/draw_character/DrawingCanvas';
import DrawingTip from '@/components/draw_character/DrawingTip';

export default function DrawPage() {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(4);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [showPicker, setShowPicker] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const canvasRef = useRef<{ exportImage: () => string }>(null);

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

    setLoading(true);
    try {
      const base64DataUrl = canvasRef.current.exportImage();
      const blob = await (await fetch(base64DataUrl)).blob();
      const file = new File([blob], "character.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("image_file", file);

      await axios.post("/submit/character", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/result");
    } catch (err) {
      console.error(err);
      setError("Failed to upload character image.");
    } finally {
      setLoading(false);
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
