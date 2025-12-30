"use client";

type CreditsBadgeProps = {
  credits: number | null;
  loading?: boolean;
};

export default function CreditsBadge({
  credits,
  loading = false,
}: CreditsBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="opacity-70">Credits:</span>
      <span className="font-semibold">
        {loading || credits === null ? "Loading..." : credits}
      </span>
    </div>
  );
}
