import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAward, faGamepad, faPaperclip } from "@fortawesome/free-solid-svg-icons";
const AboutUs = () => {
  return (
    <>
      <div className="bg-black text-white">
        {/* icons */}
        <div className="pl-10">
          <h1 className="lg:text-xl text-lg font-bold pt-4">KEEP IN TOUCH ~ Affordable Games Tamil</h1>
          <Link
            href="http://t.me/Saikiruba9927"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTelegram}
              className="text-blue-500 text-4xl cursor-pointer mr-4"
              title="Telegram"
            />
          </Link>
          <Link
            href="https://www.instagram.com/affordable_games_tamil/profilecard/?igsh=aTBxZ2hibThsaWc3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-pink-500 text-4xl cursor-pointer"
              title="Instagram"
            />
          </Link>
        </div>
        {/* important links */}
        <h1 className="lg:text-xl text-lg mt-3 ml-10">
          Important Links <FontAwesomeIcon icon={faPaperclip} />
        </h1>
        <div>
          <div className="text-white flex space-x-4 ml-10">
            <Link
              href="/home"
              className="hover:underline text-decoration-none text-white"
            >
              Home
            </Link>
            <Link
              href="/discover"
              className="hover:underline text-decoration-none text-white"
            >
              Discover
            </Link>
            <Link
              href="/register"
              className="hover:underline text-decoration-none text-white"
            >
              Register
            </Link>
            <Link
              href="/cart"
              className="hover:underline text-decoration-none text-white"
            >
              Cart
            </Link>
          </div>
          <div className="flex mt-5">
          <FontAwesomeIcon icon={faAward} className="lg:text-xl text-lg mr-3 mt-1 ml-10 text-yellow-400" />
           <h1 className="text-xl">100% Authentic Gaming Products Guaranteed</h1>
          </div>
          <div className="flex mt-1">
          <FontAwesomeIcon icon={faGamepad} className="lg:text-xl text-lg mr-3 mt-2 ml-10 text-purple-400" />
           <h1 className="text-xl">Your Gaming Experience, Our Priority</h1>
          </div>
        </div>
        <div className="text-justify ml-10 mr-10 text-sm pb-5 lg:text-lg">
          <p>
            © 2024, Affordable Games Tamil. All rights reserved. Affordable
            Games Tamil, the Affordable Games Tamil logo, and other related
            marks are trademarks or registered trademarks of Affordable Games
            Tamil in India and elsewhere. Other brands or product names are the
            trademarks of their respective owners. Our website may contain links
            to other sites and resources provided by third parties. These links
            are provided for your convenience only. Affordable Games Tamil has
            no control over the contents of those sites or resources and accepts
            no responsibility for them or for any loss or damage that may arise
            from your use of them.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
