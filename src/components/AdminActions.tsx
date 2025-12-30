"use client";

type AdminActionsProps = {
  onClearChat: () => void;
  onResetCredits: () => void;
};

export default function AdminActions({
  onClearChat,
  onResetCredits,
}: AdminActionsProps) {
  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={onClearChat}
        className="px-3 py-1 text-sm border rounded"
      >
        Clear Chat
      </button>

      <button
        onClick={onResetCredits}
        className="px-3 py-1 text-sm border rounded"
      >
        Reset Credits
      </button>
    </div>
  );
}
