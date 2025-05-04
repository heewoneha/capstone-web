import React from 'react';
import { SketchPicker } from 'react-color';

interface ColorPaletteProps {
  brushColor: string;
  onColorChange: (color: string) => void;
  showPicker: boolean;
  onTogglePicker: () => void;
}

export default function ColorPalette({ 
  brushColor, 
  onColorChange, 
  showPicker, 
  onTogglePicker 
}: ColorPaletteProps) {
  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFFFFF', '#808080', '#AA43DE',
  ];

  return (
    <>
      <div className="grid grid-cols-10 gap-2 mb-2 max-w-full overflow-x-auto">
        {colors.map((color) => (
          <div
            key={color}
            className="w-6 h-6 rounded cursor-pointer border"
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>

      <button
        className="text-sm text-purple-600 underline mb-4"
        onClick={onTogglePicker}
      >
        {showPicker ? 'Hide custom color picker' : 'Pick custom color'}
      </button>

      {showPicker && (
        <div className="mb-6">
          <SketchPicker
            color={brushColor}
            onChangeComplete={(color) => onColorChange(color.hex)}
          />
        </div>
      )}
    </>
  );
} 