"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn("email")}
        className="px-4 py-2 rounded bg-black text-white text-sm"
      >
        Sign in
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 rounded border text-sm"
    >
      Sign out
    </button>
  );
}
