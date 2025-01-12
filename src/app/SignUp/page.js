"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn } from "next-auth/react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
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

export default function SignUp() {
  //for api 
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [notification, setNotification] = useState(null);

  const [rules, setRules] = useState({
    length: false,
    letters: false,
    number: false,
    symbol: false,
  });

  const validateUsername = (value) => {
    setUsername(value);
    setRules({
      length: value.length >= 8,
      letters: value.replace(/[^a-zA-Z]/g, "").length >= 6,
      number: /\d/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };
  const handleSubmit = async () => {
    if (pass != cpass) {
      setPass("");
      setCpass("");
      const password = document.getElementById("pass");
      if (username && password) {
        password.focus();
        password.classList.add("vibrate");
      }
    } else if (username != "" && pass != "" && cpass != "") {
      //add api logic
      const password = pass;
      try{

        const config = {
          method: "post",
          url: 'https://tamil-games-api.vercel.app/api/create-account',
          headers: {
            'Content-Type': 'application/json',
             auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
          },
          data: JSON.stringify({ username, password })
        }
        const response = await axios(config)
        if (response.status === 201 || response.status === 200) {
  
          localStorage.setItem("name", username)
          localStorage.setItem("status", "1")
          setNotification("Account Created!");
          setTimeout(() => setNotification(null), 3000);
          setTimeout(() => {
            window.location.href = "/Home";
          }, 3000);
        }
        else{
          setNotification("Please Check username and password");
          setTimeout(() => setNotification(null), 3000);
        }
      }
      catch(error){
        setNotification("Error! While creating Account Please retry!!");
          setTimeout(() => setNotification(null), 3000);
        console.log(error.response?.data || error.message)
      }

    } else {
      const username = document.getElementById("username");
      if (username) {
        username.focus();
        username.classList.add("vibrate");
      }
      const password = document.getElementById("pass");
      if (username && password) {
        username.focus();
        password.classList.add("vibrate");
      }
      const cpassword = document.getElementById("cpass");
      if (username && password && cpassword) {
        username.focus();
        cpassword.classList.add("vibrate");
      }
    }
    setUsername("");
    setPass("");
    setCpass("");
  };
  if (session) {
    // alert("user registered");
    const email = session.user.email;
    const name = session.user.name;
    console.log(email, name);
  }
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isCpassVisible, setIsCpassVisible] = useState(false);
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setIsPassVisible(!isPassVisible);
    } else if (field === "cpassword") {
      setIsCpassVisible(!isCpassVisible);
    }
  };

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
            id="username"
            name="username"
            value={username}
            onChange={(e) => validateUsername(e.target.value)}
            onFocus={() =>
              (document.getElementById("rules").style.display = "block")
            }
            onBlur={() =>
              (document.getElementById("rules").style.display = "none")
            }
            placeholder="create your username"
            className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <div
            id="rules"
            style={{ display: "none", marginTop: "10px", position: "relative" }}
          >
            <p className={`rule ${rules.length ? "valid" : "invalid"}`}>
              <FontAwesomeIcon
                icon={rules.length ? faCheckCircle : faTimesCircle}
                className="symbol mr-4"
                style={{ color: rules.length ? "green" : "red" }}
              />
              Must be at least 8 characters long
            </p>
            <p className={`rule ${rules.letters ? "valid" : "invalid"}`}>
              <FontAwesomeIcon
                icon={rules.letters ? faCheckCircle : faTimesCircle}
                className="symbol mr-4"
                style={{ color: rules.letters ? "green" : "red" }}
              />
              Must contain at least 6 letters
            </p>
            <p className={`rule ${rules.number ? "valid" : "invalid"}`}>
              <FontAwesomeIcon
                icon={rules.number ? faCheckCircle : faTimesCircle}
                className="symbol mr-4"
                style={{ color: rules.number ? "green" : "red" }}
              />
              Must contain at least 1 number
            </p>
            <p className={`rule ${rules.symbol ? "valid" : "invalid"}`}>
              <FontAwesomeIcon
                icon={rules.symbol ? faCheckCircle : faTimesCircle}
                className="symbol mr-4"
                style={{ color: rules.symbol ? "green" : "red" }}
              />
              Must contain at least 1 symbol
            </p>
          </div>
        </div>
        <div className="mb-4 relative flex">
          <input
            type={isPassVisible ? "text" : "password"}
            name="password"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="create your password"
            className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <FontAwesomeIcon
            onClick={() => togglePasswordVisibility("password")}
            icon={faGlasses}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 cursor-pointer"
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={isCpassVisible ? "text" : "password"}
            name="password"
            id="cpass"
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
            placeholder="confirm your password"
            className="w-full px-4 py-2 rounded-md bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <FontAwesomeIcon
            icon={faGlasses}
            onClick={() => togglePasswordVisibility("cpassword")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 cursor-pointer"
          />
        </div>
        <div className="text-center relative w-[200px] pl-8">
          <button
            title="Shoot"
            onClick={handleSubmit}
            className="relative py-2 mb-4 px-4 flex items-center justify-center gap-2 rounded-full w-[150px] bg-red-800  text-white"
          >
            Shoot
            {/* <Link href="/Login">Shoot</Link> */}
            <FontAwesomeIcon
              icon={faCrosshairs}
              className="text-white h-[30px]"
            />
          </button>
        </div>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="relative">
          <span>---------------------------------------------------------</span>
        </div>
        {/* <button
          className="relative mt-4 flex items-center space-x-2 bg-red-800 text-white p-2 rounded"
          onClick={() => signIn("google")}
        >
          <FontAwesomeIcon icon={faGoogle} className="text-xl" />
          <span className="">Sign Up with Google</span>
        </button> */}
        <div className="relative mt-4">
          <Link href="/Login" className="text-blue-400 text-lg">
            Already an user? Click me{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
