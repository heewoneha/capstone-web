import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BackgroundTextPage() {
  const router = useRouter();
  const [uuid, setUuid] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const maxLength = 120;

  useEffect(() => {
    const storedUuid = sessionStorage.getItem("uuid");
    if (storedUuid) {
      setUuid(storedUuid);
      console.log("UUID loaded from session:", storedUuid);
    } else {
      console.warn("No UUID found in sessionStorage.");
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      setError("Please enter a description before proceeding.");
      return;
    }

    setError("");
    console.log("Submitting with uuid:", uuid); // test
    router.push("/draw_character");
  };

  return (
    <div className="bg-purple-50 flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        
        {/* Textarea + counter */}
        <div className="relative w-full">
          <textarea
            id="backgroundText"
            maxLength={maxLength}
            value={text}
            onChange={handleInput}
            placeholder="Imagine your background and describe it in writing. (Max 120 characters)"
            className="w-full h-40 p-4 pr-16 text-gray-700 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="absolute bottom-2 right-3 text-xs text-gray-500">
            {text.length}/{maxLength}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
