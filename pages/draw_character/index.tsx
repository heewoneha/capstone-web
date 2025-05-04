import React, { useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { SketchPicker } from 'react-color';
import { useRouter } from "next/router";
import OptionButton from '@/components/common/OptionButton';

export default function DrawPage() {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(4);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(300);
  const [uuid, setUuid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setCanvasSize(width);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

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

      {/* Select tool */}
      <div className="flex gap-4 mb-4 flex-wrap justify-center">
        <button
          className={`px-4 py-2 rounded ${
            tool === 'pen' ? 'bg-purple-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTool('pen')}
        >
          ✏️ Pencil
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tool === 'eraser' ? 'bg-yellow-400 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTool('eraser')}
        >
          🧽 Eraser
        </button>
      </div>

      {/* Select color */}
      <div className="grid grid-cols-10 gap-2 mb-2 max-w-full overflow-x-auto">
        {[
          '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
          '#FF00FF', '#00FFFF', '#FFFFFF', '#808080', '#AA43DE',
        ].map((color) => (
          <div
            key={color}
            className="w-6 h-6 rounded cursor-pointer border"
            style={{ backgroundColor: color }}
            onClick={() => setBrushColor(color)}
          />
        ))}
      </div>

      {/* Toggle for Color Picker */}
      <button
        className="text-sm text-purple-600 underline mb-4"
        onClick={() => setShowPicker(!showPicker)}
      >
        {showPicker ? 'Hide custom color picker' : 'Pick custom color'}
      </button>

      {/* SketchPicker Color Picker */}
      {showPicker && (
        <div className="mb-6">
          <SketchPicker
            color={brushColor}
            onChangeComplete={(color) => setBrushColor(color.hex)}
          />
        </div>
      )}

      {/* Drawing Canvas */}
      <div
        ref={containerRef}
        className="w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[500px] aspect-square bg-white border rounded shadow mx-auto"
      >
        <CanvasDraw
          brushColor={tool === 'pen' ? brushColor : '#ffffff'}
          brushRadius={tool === 'pen' ? brushRadius : 20}
          lazyRadius={0}
          hideGrid={true}
          canvasWidth={canvasSize}
          canvasHeight={canvasSize}
          canvasBackgroundColor="#ffffff"
          className="w-full h-full rounded"
        />
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md shadow-sm max-w-md mt-8">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <p className="text-sm leading-relaxed">
            Please draw a character with a human-like shape — two arms and two legs.
          </p>
        </div>
      </div>

      {/* Test */}
      {uuid && (
        <div className="text-sm text-gray-500 mt-2">
          UUID: {uuid}
        </div>
      )}

      <div className="mt-8">
        <OptionButton
          title="Next"
          icon=""
          onClick={() => router.push('/result')}
          className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-purple-600 transition"
        />
      </div>
    </div>
  );
}
