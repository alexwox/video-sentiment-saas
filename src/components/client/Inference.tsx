"use client";

import { useState } from "react";
import UploadVideo from "./UploadVideo";

interface InferenceProps {
  quota: {
    secretKey: string;
  };
}

export type Analysis = {
  utterances: {
    start_time: number;
    end_time: number;
    text: string;
    emotion: Array<{ label: string; confidence: number }>;
    sentiments: Array<{ label: string; confidence: number }>;
  };
};
export function Inference({ quota }: InferenceProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  return (
    <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
      <h2 className="text-ls font-medium text-slate-800">Inference</h2>
      <UploadVideo onAnalysis={setAnalysis} apiKey={quota.secretKey} />
    </div>
  );
}
