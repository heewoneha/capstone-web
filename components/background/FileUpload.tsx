import { ChangeEvent } from "react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  error?: string;
}

export default function FileUpload({ file, onFileChange, accept = ".png", error }: FileUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && /\.png$/i.test(selectedFile.name)) {
      onFileChange(selectedFile);
    } else {
      onFileChange(null);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full mb-4">
      {file && (
        <div className="flex items-center gap-2 bg-purple-100 text-gray-700 px-4 py-2 rounded-full text-sm">
          <button
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
            onClick={() => onFileChange(null)}
          >
            ✕
          </button>
          <span>{file.name}</span>
        </div>
      )}
      <label className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md cursor-pointer transition">
        Select a file
        <input
          key={file ? file.name : "initial"}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
