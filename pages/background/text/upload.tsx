import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BackgroundTextPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const maxLength = 120;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="bg-purple-50 flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <textarea
          id="backgroundText"
          maxLength={maxLength}
          value={text}
          onChange={handleInput}
          placeholder="Imagine your background and describe it in writing. (Max 120 characters)"
          className="w-full h-40 p-4 text-gray-700 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        ></textarea>
        <div className="text-right text-sm text-gray-500 mt-1">
          {text.length}/{maxLength}
        </div>
        <button
          onClick={() => router.push('/draw_character')}
          className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
