"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="p-6 rounded-lg shadow bg-white text-center space-y-4">
          <h1 className="text-xl font-semibold">Welcome, {session.user.name}</h1>
          <div className="flex justify-center gap-4">
            <a
              href="/dashboard"
              className="px-4 py-2 rounded bg-neutral-900 text-white"
            >
              Go to Dashboard
            </a>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded border border-neutral-300"
            >
              Log out
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="p-6 rounded-lg shadow bg-white text-center space-y-4">
        <h1 className="text-xl font-semibold">Sign in to continue</h1>
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 rounded bg-neutral-900 text-white"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
