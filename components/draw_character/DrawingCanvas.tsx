import React, { useRef, useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

interface DrawingCanvasProps {
  brushColor: string;
  brushRadius: number;
  tool: 'pen' | 'eraser';
}

export default function DrawingCanvas({ brushColor, brushRadius, tool }: DrawingCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(300);

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

  return (
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
  );
} 