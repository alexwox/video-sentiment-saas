"use client";
import React, { useState } from "react";

interface UploadVideoProps {
  apiKey: string;
}

function UploadVideo({ apiKey }: UploadVideoProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {};
  return (
    <div className="clex-col flex w-full gap-2">
      <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-10">
        TEst
      </div>
    </div>
  );
}

export default UploadVideo;
