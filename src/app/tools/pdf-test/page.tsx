"use client";

import { useState } from "react";

export default function PDFTestPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function downloadPDF() {
    if (!text.trim()) {
      alert("Pehle text daalo");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "download.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
    setLoading(false);
  }

  return (
    <div style={{ padding: 30, maxWidth: 900 }}>
      <h1>Universal PDF Test Tool</h1>

      <p>
        Yahan koi bhi text paste karo (chat reply, report, summary).
        Jo likhoge, wahi PDF me milega.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 14,
          marginBottom: 20,
        }}
        placeholder="Yahan chat ka output / AI reply paste karo..."
      />

      <button onClick={downloadPDF} disabled={loading}>
        {loading ? "PDF ban rahi hai..." : "Download PDF"}
      </button>
    </div>
  );
}
