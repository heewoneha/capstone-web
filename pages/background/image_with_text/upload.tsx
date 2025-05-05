import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Method } from "axios";
import FileUpload from "@/components/background/FileUpload";
import TextAreaWithCounter from "@/components/background/TextAreaWithCounter";
import SubmitButton from "@/components/common/SubmitButton";
import { useApi } from "@/hooks/useApi";
import { fileToBase64 } from "@/utils/file";

export const METHODS = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
  PUT: 'PUT' as Method,
};

export default function ImageWithTextUpload() {
  const router = useRouter();
  const [uuid, setUuid] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const {request, loading} = useApi();

  const maxLength = 120;

  useEffect(() => {
    const storedUuid = sessionStorage.getItem("uuid");
    if (storedUuid) {
      setUuid(storedUuid);
      console.log("UUID loaded from session:", storedUuid);
    } else {
      console.warn("No UUID found in sessionStorage.");
      router.push("/");
    }
  }, []);

  const handleSubmit = async () => {
    if (!file || !text.trim()) {
      setError("Please upload an image and enter a description.");
      return;
    }

    if (!uuid) {
      setError("UUID is missing.");
      return;
    }

    try {
      setError("");

      const imageBase64 = await fileToBase64(file);

      const payload = {
        text: text.trim(),
        image_base64: imageBase64,
      };

      await request(
        METHODS.POST,
        "/submit/background",
        payload,
        {
          onSuccess: () => {
            router.push("/draw_character");
          },
          onError: (err: Error) => {
            setError("Failed to submit background: " + err.message);
          },
        }
      );
    } catch (e) {
      setError("Unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf7fd] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md flex flex-col items-center">
        <FileUpload
          file={file}
          onFileChange={setFile}
          error={error}
        />
        
        <TextAreaWithCounter
          value={text}
          onChange={setText}
          maxLength={maxLength}
          placeholder="Based on the image, imagine the background and describe it in words."
          error={error}
        />

        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}
