"use client";
import React from "react";


export default function ChatInput({ value, onChange, onSend }: { value: string; onChange: (v: string) => void; onSend: () => void }) {
return (
<div style={{ display: "flex", gap: 12 }}>
<textarea
value={value}
onChange={(e) => onChange(e.target.value)}
onKeyDown={(e) => {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
onSend();
}
}}
placeholder="Type your message..."
rows={2}
/>
<button className="send" onClick={onSend}>
Send
</button>
</div>
);
}