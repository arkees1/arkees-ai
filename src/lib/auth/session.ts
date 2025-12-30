// /lib/auth/session.ts
// Phase-3: Soft auth / multi-user foundation for ARKEES AI
// No real auth yet — safe abstraction layer

export type SessionUser = {
  userId: string;
  isAuthenticated: boolean;
};

// 🔐 TEMP SESSION RESOLVER
// Later replace with NextAuth / Clerk / Custom JWT
export function getSessionUser(
  req?: Request
): SessionUser {
  /**
   * Current behavior:
   * - Always returns demo-user
   * - Keeps existing system 100% intact
   * - Enables multi-user later without refactor
   */

  return {
    userId: "demo-user",
    isAuthenticated: false,
  };
}
