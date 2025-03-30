"use client";

import { useState } from "react";

function CodeExamples() {
  const [activeTab, setActiveTab] = useState<"ts" | "curl">("ts");

  const tsCode = `
// 1. Get upload URL
const {url, key} = await fetch('/api/upload-url', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + YOUR_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({fileType: 'mp4'})
}).then(res => res.json());  

// 2. Upload file to S3
await fetch(url, {
  method: 'POST',
  headers: {'Content-Type': 'video/mp4'},
  body: videoFile,
})

// 3. Analyze video
const analysis = await fetch('/api/sentiment-inference', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + YOUR_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key })
}).then(res => res.json())
  `;

  const curlCode = `
  
  
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
