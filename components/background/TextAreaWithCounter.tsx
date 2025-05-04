import { ChangeEvent } from "react";

interface TextAreaWithCounterProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  error?: string;
}

export default function TextAreaWithCounter({
  value,
  onChange,
  maxLength,
  placeholder = "",
  error,
}: TextAreaWithCounterProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <textarea
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-28 p-4 pr-16 text-gray-700 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <div className="absolute bottom-2 right-3 text-xs text-gray-500">
        {value.length}/{maxLength}
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}
