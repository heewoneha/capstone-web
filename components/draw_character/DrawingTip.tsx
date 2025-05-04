import React from 'react';

export default function DrawingTip() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md shadow-sm max-w-md mt-8">
      <div className="flex items-start gap-2">
        <span className="text-xl">💡</span>
        <p className="text-sm leading-relaxed">
          Please draw a character with a human-like shape — two arms and two legs.
        </p>
      </div>
    </div>
  );
} 