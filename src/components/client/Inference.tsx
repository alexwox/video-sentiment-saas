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
  const [analysis, setAnalysis] = useState<Analysis | null>({
    utterances: [
      {
        start_time: 0.5,
        end_time: 3.2,
        text: "I'm really excited about this new project!",
        emotions: [
          { label: "joy", confidence: 0.78 },
          { label: "suprise", confidence: 0.15 },
          { label: "neutral", confidence: 0.07 },
        ],
        sentiments: [
          { label: "positive", confidence: 0.85 },
          { label: "neutral", confidence: 0.12 },
          { label: "negative", confidence: 0.03 },
        ],
      },
      {
        start_time: 3.8,
        end_time: 8.5,
        text: "The challenges we're facing seem significant, but I believe we can overcome them.",
        emotions: [
          { label: "neutral", confidence: 0.45 },
          { label: "fear", confidence: 0.25 },
          { label: "joy", confidence: 0.3 },
        ],
        sentiments: [
          { label: "positive", confidence: 0.55 },
          { label: "neutral", confidence: 0.4 },
          { label: "negative", confidence: 0.05 },
        ],
      },
      {
        start_time: 9.1,
        end_time: 12.7,
        text: "I'm quite disappointed with the recent setbacks we've encountered.",
        emotions: [
          { label: "sadness", confidence: 0.62 },
          { label: "anger", confidence: 0.25 },
          { label: "neutral", confidence: 0.13 },
        ],
        sentiments: [
          { label: "negative", confidence: 0.75 },
          { label: "neutral", confidence: 0.2 },
          { label: "positive", confidence: 0.05 },
        ],
      },
      {
        start_time: 13.3,
        end_time: 18.9,
        text: "That approach seems questionable and potentially harmful.",
        emotions: [
          { label: "disgust", confidence: 0.58 },
          { label: "anger", confidence: 0.32 },
          { label: "fear", confidence: 0.1 },
        ],
        sentiments: [
          { label: "negative", confidence: 0.82 },
          { label: "neutral", confidence: 0.15 },
          { label: "positive", confidence: 0.03 },
        ],
      },
      {
        start_time: 19.5,
        end_time: 25.0,
        text: "Wow! I didn't expect those results! This is amazing!",
        emotions: [
          { label: "suprise", confidence: 0.75 },
          { label: "joy", confidence: 0.2 },
          { label: "neutral", confidence: 0.05 },
        ],
        sentiments: [
          { label: "positive", confidence: 0.9 },
          { label: "neutral", confidence: 0.08 },
          { label: "negative", confidence: 0.02 },
        ],
      },
    ],
  });

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
        if (!sentimentScores[sentiment.label])
          sentimentScores[sentiment.label] = [];
        sentimentScores[sentiment.label]!.push(sentiment.confidence);
      });
    });

    //Calculate the average
    const avgEmotions = Object.entries(emotionScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
      }),
    );

    const avgSentiments = Object.entries(sentimentScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
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
              {averages.topEmotion?.confidence.toFixed(3)} (
              {(averages.topEmotion?.confidence! * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">Primary Sentiment</span>
            <span className="text-[40px]">
              {SENTIMENT_EMOJI[averages?.topSentiment?.label!]}
            </span>
            <span className="text-sm text-gray-500">
              {averages.topSentiment?.confidence.toFixed(3)} (
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
      <h2 className="mt-2 text-sm text-slate-800">Analysis of utterances</h2>

      {averages ? (
        <div className="flex flex-col gap-2">
          {analysis?.utterances.map((utterance, i) => {
            return (
              <div
                key={i}
                className="flex h-fit w-full flex-wrap justify-between gap-8 rounded-xl border border-gray-200 px-6 py-4 sm:gap-4"
              >
                {/*Time and text*/}
                <div className="flex w-full max-w-24 flex-col justify-center">
                  <div className="text-sm font-semibold">
                    {Number(utterance.start_time).toFixed(1)} -{" "}
                    {Number(utterance.end_time).toFixed(1)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 p-4">
          <span className="text-sm text-gray-400">
            Upload a video to see analysis results
          </span>
        </div>
      )}
    </div>
  );
}
