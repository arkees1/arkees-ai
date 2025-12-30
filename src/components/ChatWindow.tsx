"use client";

type WorkflowResult = {
  success: boolean;
  workflowType?: "text" | "pdf" | "ppt" | "csv";
  output?: any;
  error?: string;
};

export default function ChatWindow({
  result,
}: {
  result: WorkflowResult | null;
}) {
  if (!result) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Start by running a workflow
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="flex-1 p-6 text-red-500">
        ❌ {result.error || "Something went wrong"}
      </div>
    );
  }

  const { workflowType, output } = result;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {workflowType === "text" && (
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {output?.content}
        </div>
      )}

      {(workflowType === "pdf" ||
        workflowType === "ppt" ||
        workflowType === "csv") && (
        <div className="flex flex-col gap-4">
          <div className="text-sm">
            ✅ {workflowType.toUpperCase()} generated successfully
          </div>

          <a
            href={output?.fileUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 w-fit rounded bg-black text-white"
          >
            ⬇️ Download {workflowType.toUpperCase()}
          </a>
        </div>
      )}
    </div>
  );
}
