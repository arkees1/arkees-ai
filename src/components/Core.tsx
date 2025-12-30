"use client";

import { useState, useRef, useEffect } from "react";

export default function CoreChat() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [value, setValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!value.trim()) return;
    setMessages(m => [...m, { role: "user", content: value }]);
    setValue("");
  };

  return (
    <div className="h-screen w-screen bg-[#f7f7f8] flex justify-center">
      {/* CENTER CANVAS */}
      <div className="flex flex-col w-full max-w-3xl h-full">

        {/* TOP BRAND */}
        <div className="h-14 flex items-center px-6 text-lg font-semibold text-gray-800">
          ARKEES AI
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="mt-24 text-center text-gray-500">
              <h1 className="text-2xl font-semibold text-gray-800">
                What would you like to create today?
              </h1>
              <p className="mt-3 text-sm">
                Write naturally. ARKEES AI will handle the rest.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* INPUT BAR */}
        <div className="border-t bg-white px-6 py-4">
          <div className="flex items-end gap-3">

            {/* UPLOAD */}
            <button
              className="h-12 w-12 rounded-full bg-gray-100 text-xl flex items-center justify-center"
              title="Upload"
            >
              +
            </button>

            {/* TEXT INPUT */}
            <textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
                if (e.key === "Enter" && e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder="Message ARKEES AI…"
              className="flex-1 resize-none px-5 py-4 rounded-2xl border text-sm outline-none focus:ring-0"
            />

            {/* MIC */}
            <button
              className="h-12 w-12 rounded-full bg-gray-100 text-xl flex items-center justify-center"
              title="Dictation"
            >
              🎤
            </button>

            {/* SEND */}
            <button
              onClick={send}
              className="h-12 px-6 rounded-full bg-black text-white text-sm font-medium"
            >
              Send
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-400 text-center">
            Enter = new line · Shift + Enter = send
          </div>
        </div>
      </div>
    </div>
  );
}
