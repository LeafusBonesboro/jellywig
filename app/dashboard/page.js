"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If not logged in, just show button or message or redirect manually
  if (!session) {
    return (
      <main className="p-8">
        <p>You must be signed in to view the dashboard.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
    </main>
  );
}
