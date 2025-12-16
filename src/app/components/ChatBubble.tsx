export default function ChatBubble({ role, content, pdfUrl }: { role: string; content: string; pdfUrl?: string }) {
const cls = role === "user" ? "chat-bubble-user" : "chat-bubble-assistant";
return (
<div className={cls}>
{pdfUrl ? (
<a className="pdf-link" href={pdfUrl} download>
Download PDF
</a>
) : (
<div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
)}
</div>
);
}