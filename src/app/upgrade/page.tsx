import Link from "next/link";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-6 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-xl font-bold mb-1">
          Upgrade ARKEES AI 🚀
        </h1>

        <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
          Free users get 50 credits. Upgrade for more power.
        </p>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start mb-6">
          {/* STANDARD */}
          <div className="bg-white dark:bg-gray-900 rounded-md border p-3 text-xs">
            <h2 className="text-sm font-semibold mb-1">Standard</h2>
            <div className="text-lg font-bold mb-2">
              ₹499 <span className="text-xs font-normal">/ mo</span>
            </div>
            <ul className="space-y-1 text-left mb-3">
              <li>✔ More monthly credits</li>
              <li>✔ Chat + downloads</li>
              <li>✔ Faster responses</li>
            </ul>
            <button
              disabled
              className="w-full py-1 rounded bg-gray-300 text-gray-600 cursor-not-allowed text-xs"
            >
              Coming Soon
            </button>
          </div>

          {/* EXECUTIVE */}
          <div className="bg-white dark:bg-gray-900 rounded-md border-2 border-blue-600 p-3 text-xs">
            <h2 className="text-sm font-semibold mb-1">
              Executive ⭐
            </h2>
            <div className="text-lg font-bold mb-2">
              ₹999 <span className="text-xs font-normal">/ mo</span>
            </div>
            <ul className="space-y-1 text-left mb-3">
              <li>✔ High monthly credits</li>
              <li>✔ All downloads</li>
              <li>✔ Priority processing</li>
            </ul>
            <button
              disabled
              className="w-full py-1 rounded bg-blue-600 text-white opacity-60 cursor-not-allowed text-xs"
            >
              Coming Soon
            </button>
          </div>

          {/* PREMIUM */}
          <div className="bg-white dark:bg-gray-900 rounded-md border p-3 text-xs">
            <h2 className="text-sm font-semibold mb-1">
              Premium 👑
            </h2>
            <div className="text-lg font-bold mb-2">
              ₹2,499 <span className="text-xs font-normal">/ mo</span>
            </div>
            <ul className="space-y-1 text-left mb-3">
              <li>✔ Maximum credits</li>
              <li>✔ All features</li>
              <li>✔ Fastest performance</li>
            </ul>
            <button
              disabled
              className="w-full py-1 rounded bg-gray-800 text-white opacity-60 cursor-not-allowed text-xs"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* ENTERPRISE CTA */}
        <div className="border-t pt-4">
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
            Looking for team or enterprise usage?
          </p>

          <Link
            href="/enterprise"
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Explore ARKEES AI for Enterprises →
          </Link>
        </div>
      </div>
    </div>
  );
}
