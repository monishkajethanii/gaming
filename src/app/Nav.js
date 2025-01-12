"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBinoculars,
  faCartPlus,
  faForward,
  faHouse,
  faBars,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from "next-auth/react";
const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const { data: session } = useSession();
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleSignOut = () => {
    signOut();
    localStorage.setItem("status", "0");
  };
  const status = localStorage.getItem("status");
  return (
    <>
      <nav className="bg-gradient-to-r shadow-lg p-4 relative bg-black">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="relative flex items-center">
            <img
              src="logo.jpg"
              alt="logo"
              className="rounded-full w-[80px] h-[80px] shadow-lg cursor-pointer transition-all duration-300 mb-2"
            />
          </div>

          <div className="flex flex-col space-y-2 lg:flex-row items-end justify-end">
            <button
              className="text-white text-2xl lg:hidden text-right flex justify-end items-end"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faBars} className="mb-4" />
            </button>
            <div
              className={`${
                menuOpen ? "flex" : "hidden"
              } lg:flex lg:flex-row flex-col lg:space-x-12 space-y-4 lg:space-y-0 lg:items-center lg:ml-auto`}
            >
              <a
                className="text-lg fjustify-end text-right items-end hover:text-yellow-400 transition duration-300 text-white text-decoration-none"
                href="/Home"
              >
                Home{" "}
                <FontAwesomeIcon
                  icon={faHouse}
                  className="ml-2 text-decoration-none"
                />
              </a>
              <div className="relative">
                <button
                  className="text-lg text-white hover:text-yellow-400 transition duration-300 text-right"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown();
                  }}
                >
                  Discover Games{" "}
                  <FontAwesomeIcon icon={faBinoculars} className="ml-2" />
                </button>
                {dropdownOpen && (
                  <div className="absolute text-white bg-gray-700 w-40 rounded-md top-10 left-0 p-2 space-y-2 shadow-lg z-10">
                    <a
                      href="/gamepage"
                      className="block hover:bg-yellow-400 p-2 rounded-md text-white text-decoration-none"
                    >
                      Action
                    </a>
                    <a
                      href="/gamepage"
                      className="block hover:bg-yellow-400 p-2 rounded-md text-white text-decoration-none"
                    >
                      Simulation
                    </a>
                    <a
                      href="/gamepage"
                      className="block hover:bg-yellow-400 p-2 rounded-md text-white text-decoration-none"
                    >
                      Others
                    </a>
                  </div>
                )}
              </div>

              <a
                className="text-lg text-white hover:text-yellow-400 transition duration-300 text-decoration-none text-right"
                href="/Cart"
              >
                Cart <FontAwesomeIcon icon={faCartPlus} className="ml-2" />
              </a>

              <a
                href="#"
                className="text-decoration-none text-white text-lg"
                onClick={() => setToggle(!toggle)}
              >
                Welcome, {status == 1 ? session?.user?.name : "Guest"}
                <FontAwesomeIcon icon={faUser} className="ml-3" />
                {toggle && (
                  <div
                    className="bg-white text-black p-2 rounded-md shadow-lg text-center"
                    onClick={handleSignOut}
                  >
                    <a
                      href="/"
                      className="block rounded-md text-decoration-none text-black"
                    >
                      Sign Out{" "}
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="ml-2"
                      />
                    </a>
                  </div>
                )}
              </a>
              <div className=" rounded-2xl text-black px-2 py-2 text-right">
                <a
                  className="text-lg text-right transition duration-300 text-decoration-none text-white"
                  href="/SignUp"
                >
                  Sign Up
                  <FontAwesomeIcon icon={faForward} className="ml-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* </div> */}
    </>
  );
};

export default Nav;
