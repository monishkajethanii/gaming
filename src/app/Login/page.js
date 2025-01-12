"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn } from "next-auth/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";


const Notification = ({ message, onClose }) => (
  <div className="fixed top-5 right-5 bg-gradient-to-r from-purple-700 to-blue-900 text-white p-4 rounded-lg shadow-lg z-50 transition-transform transform scale-100 hover:scale-105">
    <div className="flex items-center space-x-4">
      <span className="text-lg font-bold">{message}</span>
      <button
        onClick={onClose}
        className="text-white bg-red-500 hover:bg-red-700 rounded-full px-3 py-1"
      >
        ✕
      </button>
    </div>
  </div>
);

export default function Login() {
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  //for api check login
  const config = {
    method: 'post',
    url: 'https://tamil-games-api.vercel.app/api/user-login',
    headers: {
      'Content-Type': 'application/json',
      auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
    },
    data: JSON.stringify({ username, password })
  };
  const { data: session } = useSession();

  const handleLogin = async () => {
    try {
      //for api
      console.log(username, password)
      const response = await axios(config);
      if (response.status === 200) {
        localStorage.setItem("name", username)
        setNotification("Logged in");
        setTimeout(() => setNotification(null), 3000);
        localStorage.setItem("status", "1");
        window.location.href = "/Home";
      }
      else {
        setNotification("Please Check username and password");
        setTimeout(() => setNotification(null), 3000);
      }

    }
    catch (error) {
      console.log(error.response?.data || error.message)
    }
    // google logic
    try{

      if (session) {
        localStorage.setItem("name", session.user.name);
        localStorage.setItem("status", "1");
        setNotification("Logged In!");
        setTimeout(() => setNotification(null), 3000);
        window.location.href = "/Home";
      }
    }
    catch(error){
      setNotification("Error While Google login please try again!");
      setTimeout(() => setNotification(null), 3000);
    }
  };
  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="relative z-0 flex flex-col mb-10">
        <img
          src="/logo.jpg"
          alt="logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => { setUsername(e.target.value) }}
          className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="mb-6 relative">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => { setPassword(e.target.value) }}
          className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="text-center relative w-[200px] pl-8">
        <button
          title="Shoot"
          className="relative py-2 px-4 mb-2 flex items-center justify-center gap-2 rounded-full w-[150px] bg-red-800 text-white"
          onClick={handleLogin}>
          Shoot
          <FontAwesomeIcon
            icon={faCrosshairs}
            className="text-white h-[30px]"
          />
        </button>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
      <div className="relative">
        <span>----------------------------------------------------</span>
      </div>
      <button
        className="relative mt-4 flex items-center space-x-2 bg-red-800 text-white p-2 rounded"
        onClick={() => signIn("google")}>
        <FontAwesomeIcon icon={faGoogle} className="text-xl" />
        <span className="">Sign in with Google</span>
      </button>
      <div className="relative mt-4 text-lg text-blue-400">
        <Link href="/SignUp">New User? Click here</Link>
      </div>
    </div>
  );
}