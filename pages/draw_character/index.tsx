import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
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
  const router = useRouter();

  useEffect(() => {
    const storedUuid = sessionStorage.getItem("uuid");
    if (storedUuid) {
      setUuid(storedUuid);
      console.log("UUID loaded from session:", storedUuid);
    } else {
      console.warn("No UUID found in sessionStorage");
      router.push("/");
    }
  }, []);

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
      />
      <DrawingTip />

      {/* Test */}
      {uuid && (
        <div className="text-sm text-gray-500 mt-2">
          UUID: {uuid}
        </div>
      )}

      <div className="mt-8">
        <SubmitButton
          onClick={() => router.push('/result')}
          className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-purple-600 transition"
        >
          Next
        </SubmitButton>
      </div>
    </div>
  );
}
