import { NextRequest } from "next/server";

/**
 * TEMP DEMO AUTH
 * Later replace with NextAuth session
 */
export async function requireAuth(req: NextRequest) {
  // DEMO USER (hardcoded for now)
  return {
    userId: "demo-user-1",
    email: "arkees@gmail.com",
  };
}
