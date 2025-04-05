import { useState } from "react";
import { useRouter } from "next/router";

export default function ImageOnlyUpload() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && /\.(png|jpe?g)$/i.test(selectedFile.name)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Only .png, .jpg, or .jpeg files are allowed.");
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Please upload an image before proceeding.");
      return;
    }

    setError("");
    // for later, api process here
    router.push("/draw_character");
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md flex flex-col items-center">
        {/* Upload file */}
        <div className="flex items-center gap-3 w-full mb-4">
          {file && (
            <div className="flex items-center gap-2 bg-purple-100 text-gray-700 px-4 py-2 rounded-full text-sm">
              <button
                className="text-xl font-bold text-gray-500 hover:text-gray-700"
                onClick={() => setFile(null)}
              >
                ✕
              </button>
              <span>{file.name}</span>
            </div>
          )}

          <label
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md cursor-pointer transition"
          >
            Select a file
            <input
              key={file ? file.name : "initial"}
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
