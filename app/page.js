"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="p-8">
      {!session ? (
        <button onClick={() => signIn("google")}>Log in with Google</button>
      ) : (
        <>
          <p>Hi {session.user?.name}</p>
          <a href="/dashboard">Go to Dashboard</a>
          <button onClick={() => signOut()}>Log out</button>
        </>
      )}
    </main>
  );
}
