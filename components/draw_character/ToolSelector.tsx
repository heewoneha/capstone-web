import React from 'react';

interface ToolSelectorProps {
  tool: 'pen' | 'eraser';
  onToolChange: (tool: 'pen' | 'eraser') => void;
}

export default function ToolSelector({ tool, onToolChange }: ToolSelectorProps) {
  return (
    <div className="flex gap-4 mb-4 flex-wrap justify-center">
      <button
        className={`px-4 py-2 rounded ${
          tool === 'pen' ? 'bg-purple-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onToolChange('pen')}
      >
        ✏️ Pencil
      </button>
      <button
        className={`px-4 py-2 rounded ${
          tool === 'eraser' ? 'bg-yellow-400 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onToolChange('eraser')}
      >
        🧽 Eraser
      </button>
    </div>
  );
} 