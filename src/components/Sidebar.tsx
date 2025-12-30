"use client";

import { Search } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col">
      
      {/* Top Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats"
            className="w-[95%] pl-10 pr-12 py-2 text-sm rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
          />
          <Search
            size={20}
            className="absolute right-1/8 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Recent */}
      <div className="px-4 text-xs text-gray-500 uppercase tracking-wide">
        Recent
      </div>
      <ul className="px-4 py-2 space-y-1 text-sm">
        <li className="cursor-pointer hover:underline">Hello</li>
        <li className="cursor-pointer hover:underline">
          Dashboard Sales Report
        </li>
        <li className="cursor-pointer hover:underline">Image Prompt Test</li>
      </ul>

      {/* Main Actions */}
      <nav className="px-10 py-10 space-y-6text-sm">
        <div className="flex items-center gap-5 cursor-pointer">📝 Text</div>
        <div className="flex items-center gap-5 cursor-pointer">🖼 Image</div>
        <div className="flex items-center gap-5 cursor-pointer">🎥 Video</div>
        <div className="flex items-center gap-5 cursor-pointer">📄 PDF</div>
        <div className="flex items-center gap-5 cursor-pointer">📊 PPT</div>
        <div className="flex items-center gap-5 cursor-pointer">
          📈 Dashboard
        </div>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Actions — ICON + TEXT (LOCKED) */}
      <div className="px-4 py-4 border-t dark:border-gray-800 space-y-2 text-sm">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          ⚡ Upgrade
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          🏢 Enterprise
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          ⚙️ Settings
        </button>
      </div>
    </aside>
  );
}
