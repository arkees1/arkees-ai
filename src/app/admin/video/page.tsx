"use client";

import { useEffect, useState } from "react";

type VideoJob = {
  id: string;
  userId: string;
  prompt: string;
  status: "queued" | "processing" | "completed" | "failed";
  createdAt: string;
};

export default function AdminVideoQueuePage() {
  const [jobs, setJobs] = useState<VideoJob[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQueue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/video/queue");
      const json = await res.json();
      setJobs(json.jobs || []);
    } catch (e) {
      console.error("Failed to load video queue", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
    const interval = setInterval(loadQueue, 5000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">🎬 Video Generation Queue</h1>
        <p className="text-sm text-gray-500 mt-1">
          Soft video mode enabled. Jobs are queued for early access. No videos are generated yet.
        </p>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading queue…</div>
      ) : jobs.length === 0 ? (
        <div className="text-gray-500">No video jobs found.</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Job ID</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Prompt</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="px-4 py-2 font-mono text-xs">{job.id}</td>
                  <td className="px-4 py-2">{job.userId}</td>
                  <td className="px-4 py-2 max-w-md truncate" title={job.prompt}>
                    {job.prompt}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {new Date(job.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: VideoJob["status"] }) {
  const map: Record<string, string> = {
    queued: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}
