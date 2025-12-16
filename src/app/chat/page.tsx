"use client";

import { useEffect, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const c = localStorage.getItem("arkees_credits");
    if (c) setCredits(Number(c));
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (credits <= 0) {
      alert("No credits left");
      return;
    }

    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      if (!res.ok) throw new Error("AI failed");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      const updated = credits - 1;
      setCredits(updated);
      localStorage.setItem("arkees_credits", String(updated));
    } catch {
      alert("Chat error");
    } finally {
      setLoading(false);
    }
  };

  const exportChatPDF = async () => {
    if (credits <= 0) {
      alert("No credits left");
      return;
    }

    const res = await fetch("/api/chat-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      alert("PDF error");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "arkees-chat.pdf";
    a.click();
    URL.revokeObjectURL(url);

    const updated = credits - 1;
    setCredits(updated);
    localStorage.setItem("arkees_credits", String(updated));
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>ARKEES AI Chat</h1>
      <p>🔋 Credits: {credits}</p>

      <div
        style={{
          border: "1px solid #ddd",
          padding: 15,
          minHeight: 220,
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        style={{ padding: 8, width: "70%" }}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button onClick={sendMessage} disabled={loading} style={{ marginLeft: 10 }}>
        {loading ? "Thinking..." : "Send"}
      </button>

      <br /><br />

      <button onClick={exportChatPDF}>
        Export Chat PDF (–1 credit)
      </button>
    </div>
  );
}
