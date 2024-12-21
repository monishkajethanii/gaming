"use client";
import React, { useEffect } from "react";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn } from "next-auth/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      window.location.href = "/Home";
    }
  }, [session]);

  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white">
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="relative z-0 flex flex-col mb-10">
        <img src="/logo.jpg" alt="logo" width={120} height={120} className="rounded-full shadow-lg" />
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="mb-6 relative">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="text-center relative w-[200px] pl-8">
        <button title="Shoot" className="relative py-2 px-4 mb-2 flex items-center justify-center gap-2 rounded-full w-[150px] bg-red-800 text-white">
          Shoot
          <FontAwesomeIcon icon={faCrosshairs} className="text-white h-[30px]" />
        </button>
      </div>
      <div className="relative">
        <span>----------------------------------------------------</span>
      </div>
      <button className="relative mt-4 flex items-center space-x-2 bg-red-800 text-white p-2 rounded" onClick={() => signIn("google")}>
        <FontAwesomeIcon icon={faGoogle} className="text-xl" />
        <span className="">Sign in with Google</span>
      </button>

      <div className="relative mt-4 text-lg text-blue-400">
        <Link href="/SignUp">New User? Click here</Link>
      </div>
    </div>
  );
}
