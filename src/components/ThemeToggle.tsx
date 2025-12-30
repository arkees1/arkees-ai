"use client";

export default function ThemeToggle() {
  return (
    <button
      onClick={() => {
        const root = document.documentElement;
        const isDark = root.classList.toggle("dark");
        localStorage.setItem("arkees_theme", isDark ? "dark" : "light");
      }}
      className="rounded-lg border px-3 py-2 text-sm dark:border-gray-700"
    >
      🌗 Theme
    </button>
  );
}
