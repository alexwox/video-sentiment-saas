"use client";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard");
    }
  };
  return (
    <button onClick={handleCopy} className="">
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default CopyButton;
