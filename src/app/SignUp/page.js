"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn } from "next-auth/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SignUp() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const handleSubmit = () =>{
    console.log(username,pass,cpass)
    setUsername("")
    setPass("")
    setCpass("")
    setTimeout(()=>{
      window.location.href = "/Login";
    },3000)
  }
  if (session) {
    alert("user registered");
    const email = session.user.email;
    const name = session.user.name;
    console.log(email, name);
  }
  return (
    <>
      <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="relative z-0 flex flex-col ">
          <img
            src="/logo.jpg"
            alt="logo"
            width={120}
            height={120}
            className="rounded-full shadow-lg mb-6"
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="create your username"
            className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="password"
            name="password"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
            placeholder="create your password"
            className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="password"
            name="password"
            value={cpass}
            onChange={(e)=>setCpass(e.target.value)}
            placeholder="confirm your password"
            className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div className="text-center relative w-[200px] pl-8">
          <button
            title="Shoot"
            onClick={handleSubmit}
            className="relative py-2 mb-4 px-4 flex items-center justify-center gap-2 rounded-full w-[150px] bg-red-800  text-white"
          >Shoot
            {/* <Link href="/Login">Shoot</Link> */}
            <FontAwesomeIcon
              icon={faCrosshairs}
              className="text-white h-[30px]"
            />
          </button>
        </div>
        <div className="relative">
          <span>---------------------------------------------------------</span>
        </div>
        <button
          className="relative mt-4 flex items-center space-x-2 bg-red-800 text-white p-2 rounded"
          onClick={() => signIn("google")}
        >
          <FontAwesomeIcon icon={faGoogle} className="text-xl" />
          <span className="">Sign Up with Google</span>
        </button>
        <div className="relative mt-4">
          <Link href="/Login" className="text-blue-400 text-lg">
            Already an user? Click me{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
