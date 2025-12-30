"use client";

export default function ChatBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${
          isUser
            ? "bg-black text-white rounded-br-md"
            : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-bl-md"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
