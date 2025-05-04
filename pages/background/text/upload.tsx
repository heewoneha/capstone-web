import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TextAreaWithCounter from "@/components/background/TextAreaWithCounter";
import SubmitButton from "@/components/common/SubmitButton";

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
      router.push("/");
    }
  }, []);

  const handleSubmit = () => {
    if (!text.trim()) {
      setError("Please enter a description before proceeding.");
      return;
    }

    setError("");
    console.log("Submitting with uuid:", uuid);
    router.push("/draw_character");
  };

  return (
    <div className="bg-[#fdf7fd] flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <TextAreaWithCounter
          value={text}
          onChange={setText}
          maxLength={maxLength}
          placeholder="Imagine your background and describe it in writing. (Max 120 characters)"
          error={error}
        />

        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}
