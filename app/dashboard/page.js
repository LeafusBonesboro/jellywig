"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Logged in as {session?.user?.email}</p>

      <div className="p-4 rounded border">
        <h2 className="font-semibold mb-2">Manage Leagues</h2>
        <p className="mb-2">Link your Yahoo league to start analysis.</p>
        <a
          className="inline-block px-4 py-2 rounded bg-black text-white"
          href="/api/yahoo"
        >
          Link Yahoo
        </a>
      </div>
    </div>
  );
}
