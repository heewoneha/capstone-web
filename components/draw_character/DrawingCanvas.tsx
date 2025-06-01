import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react';
import CanvasDraw from 'react-canvas-draw';

interface DrawingCanvasProps {
  brushColor: string;
  brushRadius: number;
  tool: 'pen' | 'eraser';
}

export default forwardRef(function DrawingCanvas(
  { brushColor, brushRadius, tool }: DrawingCanvasProps,
  ref
) {
  const canvasRef = useRef<CanvasDraw>(null);
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

  useEffect(() => {
    const canvas = canvasRef.current?.canvas.drawing;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      ctx.globalCompositeOperation =
        tool === 'eraser' ? 'destination-out' : 'source-over';
    }
  }, [tool]);

  useImperativeHandle(ref, () => ({
    exportImage: () => {
      return canvasRef.current?.canvas.drawing.toDataURL('image/png');
    }
  }));

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[500px] aspect-square bg-white border rounded shadow mx-auto"
    >
      <CanvasDraw
        ref={canvasRef}
        brushColor={tool === 'pen' ? brushColor : 'rgba(0,0,0,1)'}
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
});