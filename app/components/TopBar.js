"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-neutral-900 text-white">
      <Link href="/" className="text-lg font-bold">
        Jellywig
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <span>{session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded bg-neutral-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 rounded bg-white text-neutral-900"
        >
          Login
        </button>
      )}
    </div>
  );
}
