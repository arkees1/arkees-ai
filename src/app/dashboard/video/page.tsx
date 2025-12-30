"use client";

import { useState } from "react";

export default function VideoEarlyAccessPage() {
  const [prompt, setPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submitRequest = async () => {
    if (!prompt.trim() || submitting) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "demo-user",
          prompt,
        }),
      });

      const json = await res.json();

      if (json?.status === "ok") {
        setMessage(
          "✅ Your video request has been queued. Video generation is in early access. You’ll be notified when it’s ready."
        );
        setPrompt("");
      } else {
        setMessage("⚠️ Unable to queue video request.");
      }
    } catch (e) {
      setMessage("❌ Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">🎥 Video Generation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Early access mode is enabled. Videos are not generated instantly.
        </p>
      </div>

      <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
        <textarea
          placeholder="Describe the video you want to generate…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full min-h-[120px] p-3 border rounded resize-none"
        />

        <button
          onClick={submitRequest}
          disabled={submitting || !prompt.trim()}
          className={`px-4 py-2 rounded text-white ${
            submitting || !prompt.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Submitting…" : "Request Video (Early Access)"}
        </button>

        <div className="text-xs text-gray-600">
          ⚠️ Video generation is currently in early access.
          <br />
          No credits will be deducted. No video will be delivered immediately.
        </div>

        {message && (
          <div className="text-sm mt-2">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
