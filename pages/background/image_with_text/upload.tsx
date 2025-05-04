import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FileUpload from "@/components/background/FileUpload";
import TextAreaWithCounter from "@/components/background/TextAreaWithCounter";
import SubmitButton from "@/components/common/SubmitButton";

export default function ImageWithTextUpload() {
  const router = useRouter();
  const [uuid, setUuid] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const maxLength = 50;

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

  const handleSubmit = () => {
    if (!file || !text.trim()) {
      setError("Please upload an image and enter a description.");
      return;
    }

    setError("");
    // for later, api process here
    console.log("Submitting with uuid:", uuid);
    router.push("/draw_character");
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
