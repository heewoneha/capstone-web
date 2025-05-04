import React from 'react';

interface StartEndButtonProps {
  onClick: () => void;
  isStart?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function StartEndButton({ onClick, isStart = true, className = "", children }: StartEndButtonProps) {
  const baseStyles = "text-xl px-8 py-4 rounded-full font-semibold transition-all shadow-md w-full max-w-md";
  const startStyles = "bg-[#AA43DE] text-white hover:bg-[#9329c5]";
  const endStyles = "bg-white text-black border border-gray-300 hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${isStart ? startStyles : endStyles} ${className}`}
    >
      {children}
    </button>
  );
}
