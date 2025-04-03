"use client";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Analysis } from "./Inference";

interface UploadVideoProps {
  apiKey: string;
  onAnalysis: (analysis: Analysis) => void;
}

const EMOTION_EMOJI: Record<string, string> = {
  anger: "😠",
  disgust: "🤢",
  fear: "😨",
  joy: "😊",
  neutral: "😐",
  sadness: "😢",
  suprise: "😲",
};

const SENTIMENT_EMOJI: Record<string, string> = {
  negative: "😞",
  neutral: "😐",
  positive: "😊",
};

function UploadVideo({ apiKey, onAnalysis }: UploadVideoProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setStatus("uploading");
      setError(null);

      const fileType = `.${file.name.split(".").pop()}`;
      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileType: fileType }),
      }).then((res) => res.json());
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to get upload URL");
      }
      const { url, fileId, key } = res.json();
      // 2. Upload file to S3

      const uploadRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "video/mp4" },
        body: file.type,
      });
      if (!uploadRes.ok) {
        throw new Error("Failed to upload file");
      }

      setStatus("analyzing");

      // 3. Analyze video
      const analysisRes = await fetch("/api/sentiment-inference", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      }).then((res) => res.json());

      if (!analysisRes.ok) {
        throw new Error("Failed to analyze video");
      }
      const analysis = await analysisRes.json();
      console.log("Analysis; ", analysis);
      onAnalysis(analysis);
      setStatus("idle");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed");
      console.error("Upload failed", error);
      throw error;
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-10">
        <input
          type="file"
          accept="video/mp4,video/mov,video/avi"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          id="video-upload"
        ></input>
        <label
          htmlFor="video-upload"
          className="flex cursor-pointer flex-col items-center"
        >
          <FiUpload className="min-h-8 min-w-8 text-gray-400" />
          <h3 className="text-md mt-2 font-medium text-slate-800">
            {status === "uploading"
              ? "Uploading..."
              : status === "analyzing"
                ? "Analyzing..."
                : "Upload a video"}
          </h3>
          <p className="text-center text-xs text-gray-500">
            Get started with sentiment detection by uploading a video
          </p>
        </label>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}

export default UploadVideo;
