"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Creepster } from "next/font/google";
import { useSession, signOut } from "next-auth/react";
import { Satisfy, Patua_One } from "next/font/google";
import Splash from "../Splash";

const creepster = Creepster({ subsets: ["latin"], weight: "400" });
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const patuaOne = Patua_One({ subsets: ["latin"], weight: "400" });
export default function page() {
  const [isSplash, setIsSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => setFadeOut(true), 2500); // Start fade-out after 2.5s
    const timeout2 = setTimeout(() => setIsSplash(false), 3000); // Remove splash after 3s
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);
  const { data: session } = useSession();

  // if (session) {
   if (isSplash) {
    return (
      <div
        className={`transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <Splash />
      </div>
    );
  }
  return (
    <>
      {/* <div>
          <h1>Welcome, {session.user.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </div> */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
      >
        <source src="/homebg.mp4" type="video/mp4" />
      </video>
      <div className="relative flex items-center px-10 py-6">
        <img
          src="logo.jpg"
          alt="logo"
          className="rounded-full w-[80px] h-[80px] shadow-lg"
        />
        {/* <h1
          className={`${creepster.className} text-5xl text-white ml-6 drop-shadow-lg`}
        >
          Affordable Games Tamil
        </h1> */}
      </div>
      <div className="relative flex flex-col items-center h-[500px] justify-center text-center mt-20 text-white px-4">
        <h1
          className={`${patuaOne.className} text-6xl mb-4 tracking-wide drop-shadow-lg`}
        >
          UNLEASH YOUR GAMING ADVENTURE
        </h1>
        <h2
          className={`${satisfy.className} text-4xl mt-4 tracking-wide text-gray-300`}
        >
          Explore Limitless Fun!
        </h2>
        <Link
          href="/gamepage"
          className="mt-8 bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Start Exploring
        </Link>
      </div>
    </>
  );
  // }
  // if (!session) {
  // return <Link href="/Login">Login</Link>;
  // }
}
