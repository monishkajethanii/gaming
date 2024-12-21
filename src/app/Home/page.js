"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
export default function page() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div>
          <h1>Welcome, {session.user.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
        <div>home page</div>
      </>
    );
  }
  if(!session)
  {
    return(
      <Link href="/Login">Login</Link>
    )
  }
}
