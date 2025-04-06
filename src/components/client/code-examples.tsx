"use client";

import { useState } from "react";

function CodeExamples() {
  const [activeTab, setActiveTab] = useState<"ts" | "curl">("ts");

  const tsCode = `
  const fileType = .mp4;
  const res = await fetch("/api/upload-url", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileType: fileType }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to get upload URL");
  }
  const { url, fileId, key } = await res.json();
  // 2. Upload file to S3

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
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
  });

  if (!analysisRes.ok) {
    const error = await analysisRes.json();
    throw new Error(error?.error || "Failed to analyze video");
  }
  const analysis = await analysisRes.json();
  `;

  const curlCode = `
  # 1. Get upload URL
# Note: The output will be JSON containing the 'url' and 'key' needed for subsequent steps.
curl -X POST 'http://YOUR_API_BASE_URL/api/upload-url' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"fileType": "mp4"}'

# --- Manually get 'url' and 'key' from the output above ---
# Example: url="https://s3...", key="uploads/..."

# 2. Upload file to S3
# Replace $url with the actual URL from step 1
# Replace /path/to/your/video.mp4 with the actual file path
# Note: Using POST as per the TS example. S3 presigned URLs often use PUT.
curl -X POST '$url' \
  -H 'Content-Type: video/mp4' \
  --data-binary '@/path/to/your/video.mp4'

# 3. Analyze video
# Replace YOUR_API_KEY, YOUR_API_BASE_URL, and $key (from step 1)
curl -X POST 'http://YOUR_API_BASE_URL/api/sentiment-inference' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"key": "$key"}'
  
  `;

  return (
    <div className="flex-h-fit mt-3 flex w-full flex-col rounded-xl bg-gray-100 bg-opacity-70 p-4">
      <span className="text-sm">API Usage</span>
      <span className="mb-4 text-sm text-gray-500">
        Examples of how to use the API with TS and CURL.
      </span>
      <div className="overflow-hidden rounded-md bg-gray-900">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-4 py-2 text-xs ${activeTab === "ts" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300"}`}
            onClick={() => setActiveTab("ts")}
          >
            TypeScript
          </button>
          <button
            className={`px-4 py-2 text-xs ${activeTab === "curl" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300"}`}
            onClick={() => setActiveTab("curl")}
          >
            CURL
          </button>
        </div>
        <div className="p-4">
          <pre className="max-h-[300px] overflow-y-auto text-xs text-gray-300">
            <code>{activeTab === "ts" ? tsCode : curlCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default CodeExamples;
