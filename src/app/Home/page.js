"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../Nav";
import InScroll from "../InScroll";
import { Creepster } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useSession, signOut } from "next-auth/react";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Satisfy, Patua_One } from "next/font/google";
import Splash from "../Splash";
import Intro from "../Intro";
import AboutUs from "../About";
import BirthdayBanner from "../Banner";

const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const patuaOne = Patua_One({ subsets: ["latin"], weight: "400" });

export default function Page() {
  const [isSplash, setIsSplash] = useState(false); 
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeen");

    if (!hasSeen) {
      setIsSplash(true); 
      const timeout1 = setTimeout(() => setFadeOut(true), 2500);
      const timeout2 = setTimeout(() => {
        setIsSplash(false);
        sessionStorage.setItem("hasSeen", "true"); 
      }, 3000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, []);

  const { data: session } = useSession();

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
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75 mb-8"
      >
        <source src="/homebg.mp4" type="video/mp4" />
      </video>
      <Nav />

      <div className="relative flex flex-col items-center h-[500px] justify-center text-center mt-20 text-white px-4">
        <h1
          className={`${patuaOne.className} lg:mb-4 mb-4 tracking-wide drop-shadow-lg bg-none lg:text-6xl text-3xl`}
        >
          UNLEASH YOUR GAMING ADVENTURE
        </h1>
        <h2
          className={`${satisfy.className} lg:text-4xl lg:mt-4 mt-2 tracking-wide text-gray-300 bg-none text-2xl`}
        >
          Explore Limitless Fun!
        </h2>
        <Link
          href="/gamepage"
          className="mt-8 bg-red-900 hover:bg-red-800 text-white lg:px-8 lg:py-3 px-5 py-2 rounded-full lg:text-lg text-sm shadow-lg transition-transform transform hover:scale-105 bg-none text-decoration-none"
        >
          Start Exploring
        </Link>
      </div>
      <InScroll />
      <BirthdayBanner />
      <Intro />
      <AboutUs />
    </>
  );
}