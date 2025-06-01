import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Method } from "axios";
import TextAreaWithCounter from "@/components/background/TextAreaWithCounter";
import SubmitButton from "@/components/common/SubmitButton";
import { useApi } from "@/hooks/useApi";

export const METHODS = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
  PUT: 'PUT' as Method,
};

export default function BackgroundTextPage() {
  const router = useRouter();
  const [uuid, setUuid] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { request, loading } = useApi();
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
    if (!text.trim()) {
      setError("Please enter a description before proceeding.");
      return;
    }

    if (!uuid) {
      setError("UUID is missing.");
      return;
    }

    try {
      setError("");

      const payload = {
        text: text.trim(),
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
            setError("Failed to submit description: " + err.message);
          },
        }
      );
    } catch {
      setError("Unexpected error occurred.");
    }
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

        <div className="flex justify-center mt-4">
          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Next"}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
}
