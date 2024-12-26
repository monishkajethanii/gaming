"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBinoculars, faCartPlus, faForward, faHouse } from "@fortawesome/free-solid-svg-icons";
const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r shadow-lg p-4 relative bg-black">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="relative flex items-center">
          <img
            src="logo.jpg"
            alt="logo"
            className="rounded-full w-[80px] h-[80px] shadow-lg cursor-pointer transition-all duration-300 mb-2"
          />
        </div>
        <div className="flex lg:space-x-12 flex-wrap lg:flex-row flex-col space-y-2 ">
          <a
            className="text-lg hover:text-yellow-400 transition duration-300 text-decoration-none text-white mt-2"
            href="/Home"
          >
            Home <FontAwesomeIcon icon={faHouse} className="ml-2"/>
          </a>
          <div className="relative">
            <button
              className="text-white text-lg hover:text-yellow-400 transition duration-300 text-decoration-none"
              onClick={toggleDropdown}
            >
              Discover Games <FontAwesomeIcon icon={faBinoculars} className="ml-2"/>
            </button>
            {dropdownOpen && (
              <div className="absolute text-white bg-gray-700 w-40 rounded-md top-8 left-0 p-2 space-y-2">
                <a
                  href="#"
                  className="block hover:bg-yellow-400 p-2 rounded-md text-decoration-none text-white"
                >
                  Action
                </a>
                <a
                  href="#"
                  className="block hover:bg-yellow-400 p-2 rounded-md text-decoration-none text-white"
                >
                  Simulation
                </a>
                <a
                  href="#"
                  className="block hover:bg-yellow-400 p-2 rounded-md text-decoration-none text-white"
                >
                  Others
                </a>
              </div>
            )}
          </div>
          <a
            className="text-white text-lg transition duration-300 text-decoration-none"
            href="/Cart"
          >
            Cart <FontAwesomeIcon icon={faCartPlus} className="ml-2"/>
          </a>
          <button className="bg-white rounded-lg text-black w-max pl-3 pr-2">
            <a
              className="text-black text-lg text-decoration-none transition duration-300"
              href="/SignUp"
            >
              Sign Up
              <FontAwesomeIcon icon={faForward} className="ml-3"/>
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
