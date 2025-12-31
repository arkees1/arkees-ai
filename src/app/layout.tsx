import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata = {
  title: "ARKEES AI",
  description: "Think Less. Create More.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {/* ===== PREMIUM HEADER ===== */}
        <header className="border-b">
          <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
            
            {/* LEFT: Logo + Brand */}
            <div className="flex items-center gap-4">
              <Image
                src="/arkees-logo.png"
                alt="ARKEES AI Logo"
                width={64}
                height={64}
                priority
              />

              <div>
                <div
                  style={{
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                  }}
                  className="text-[22px] text-[#0B2A5B]"

                >
                  ARKEES AI
                </div>

                <div className="text-sm text-gray-500 -mt-1">
                  Think Less. Create More.
                </div>
              </div>
            </div>

            <div />
          </div>
        </header>

                <main className="max-w-[1400px] mx-auto">
          {children}
        </main>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
  );
}
