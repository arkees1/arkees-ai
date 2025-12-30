"use client";

import { useState } from "react";
import CreditsBadge from "./CreditsBadge";

type Msg = {
  role: "user" | "assistant";
  content: string;
  pdfUrl?: string;
};

export default function DashboardClient() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function runWorkflow() {
    if (!input.trim() || loading) return;

    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 🔥 CHANGE HERE: PDF workflow
      const res = await fetch("/api/workflow/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.content }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const aiMsg: Msg = {
        role: "assistant",
        content: "📄 Your PDF is ready",
        pdfUrl: url,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: err.message || "Error" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CreditsBadge credits={50} />
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 20,
          minHeight: 300,
          marginBottom: 12,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 8,
                background: m.role === "user" ? "#dbeafe" : "#f3f4f6",
              }}
            >
              {m.content}
              {m.pdfUrl && (
                <div style={{ marginTop: 6 }}>
                  <a
                    href={m.pdfUrl}
                    download="arkees-ai.pdf"
                    style={{ color: "#2563eb", fontWeight: 500 }}
                  >
                    ⬇ Download PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your prompt..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={runWorkflow}
          disabled={loading}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>
    </div>
  );
}
