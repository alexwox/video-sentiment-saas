"use client";

import { useState } from "react";
import UploadVideo from "./UploadVideo";

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

interface InferenceProps {
  quota: {
    secretKey: string;
  };
}

export type Analysis = {
  utterances: Array<{
    start_time: number;
    end_time: number;
    text: string;
    emotions: Array<{ label: string; confidence: number }>;
    sentiments: Array<{ label: string; confidence: number }>;
  }>;
};
export function Inference({ quota }: InferenceProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const getAverageScores = () => {
    if (!analysis?.utterances.length) return null;

    //Aggregate all scores
    const emotionScores: Record<string, number[]> = {};
    const sentimentScores: Record<string, number[]> = {};
    analysis?.utterances.forEach((utterance) => {
      utterance.emotions.forEach((emotion) => {
        if (!emotionScores[emotion.label]) emotionScores[emotion.label] = [];
        emotionScores[emotion.label]!.push(emotion.confidence);
      });
      utterance.sentiments.forEach((sentiment) => {
        if (!emotionScores[sentiment.label])
          emotionScores[sentiment.label] = [];
        emotionScores[sentiment.label]!.push(sentiment.confidence);
      });
    });

    //Calculate the average
    const avgEmotions = Object.entries(emotionScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0 / scores.length),
      }),
    );

    const avgSentiments = Object.entries(sentimentScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0 / scores.length),
      }),
    );

    //Sort by confidence then get top emotion
    const topEmotion = avgEmotions.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];
    const topSentiment = avgSentiments.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];

    return { topEmotion, topSentiment };
  };

  const averages = getAverageScores();
  return (
    <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
      <h2 className="text-ls font-medium text-slate-800">Inference</h2>
      <UploadVideo onAnalysis={setAnalysis} apiKey={quota.secretKey} />
      <h2 className="mt-2 text-sm text-slate-800">Overall analysis</h2>
      {averages ? (
        <div className="flex h-fit w-full flex-wrap items-center justify-center gap-4 rounded-xl border border-gray-200 p-4 sm:gap-8 sm:px-6">
          <div className="flex flex-col items-center">
            <span className="text-sm">Primary Emotion</span>
            <span className="text-[40px]">
              {EMOTION_EMOJI[averages?.topEmotion?.label!]}
            </span>
            <span className="text-sm text-gray-500">
              {averages.topEmotion?.confidence} (
              {(averages.topEmotion?.confidence! * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">Primary Sentiment</span>
            <span className="text-[40px]">
              {SENTIMENT_EMOJI[averages?.topSentiment?.label!]}
            </span>
            <span className="text-sm text-gray-500">
              {averages.topSentiment?.confidence} (
              {(averages.topSentiment?.confidence! * 100).toFixed(0)}%)
            </span>
          </div>
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 p-4">
          <span className="text-sm text-gray-400">
            Upload video to see overall analysis
          </span>
        </div>
      )}
    </div>
  );
}
