/* 
  Dummy data for testing the Inference component state.
  Matches the Analysis type interface with utterances containing:
  - timestamps
  - transcribed text
  - emotion classifications with confidence scores
  - sentiment classifications with confidence scores
*/

export const dummyAnalysis = {
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
};
