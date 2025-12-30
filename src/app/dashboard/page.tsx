"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [credits, setCredits] = useState<number>(0);

  const loadGallery = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setGallery(data.items || []);
  };

  const loadCredits = async () => {
    const res = await fetch("/api/credits");
    const data = await res.json();

    // 🔒 HARD SAFETY
    setCredits(Number(data.credits) || 0);
  };

  useEffect(() => {
    loadGallery();
    loadCredits();
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setMessage("Please enter a prompt first.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Image generation failed");
      }

      setImageUrl(data.imageUrl);
      loadGallery();
      loadCredits();
    } catch (err: any) {
      setMessage(err.message || "Image generation failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!imageUrl && !prompt.trim()) {
      setMessage("Please generate image or content first.");
      return;
    }

    setMessage(null);

    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, imageUrl }),
    });

    if (!res.ok) {
      setMessage("Failed to generate PDF");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "arkees-ai-report.pdf";
    a.click();
    window.URL.revokeObjectURL(url);

    loadCredits();
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>ARKEES AI Dashboard</h1>

      <p style={{ marginBottom: 12 }}>
        <strong>Credits left:</strong> {credits}
      </p>

      <textarea
        placeholder="Describe what you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>

        <button onClick={downloadPDF}>
          Download Analytics PDF
        </button>

        <button
          onClick={() =>
            setMessage("Video generation is Early Access. Coming soon.")
          }
        >
          Generate Video (Early Access)
        </button>
      </div>

      {message && (
        <p style={{ marginTop: 12, color: "crimson" }}>{message}</p>
      )}

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "100%" }} />
        </div>
      )}

      {gallery.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Gallery History</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
              marginTop: 16,
            }}
          >
            {gallery.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  padding: 8,
                  borderRadius: 6,
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.prompt}
                  style={{ width: "100%", borderRadius: 4 }}
                />
                <p style={{ fontSize: 12, marginTop: 6 }}>
                  {item.prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
