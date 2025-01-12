import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faBrush } from "@fortawesome/free-solid-svg-icons";
import { Satisfy, Patua_One } from "next/font/google";

const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const patuaOne = Patua_One({ subsets: ["latin"], weight: "400" });

export default function Intro() {
  return (
    <>
      <div className="bg-black py-8">
        <h2
          className={`${satisfy.className} p-2 lg:text-4xl text-2xl mt-4 tracking-wide text-white text-center`}
        >
          <FontAwesomeIcon
            icon={faPeopleGroup}
            className="text-green-500 mr-4 align-middle lg:text-4xl text-2xl"
          />
          Meet the Minds Behind the Code
        </h2>
        <h1
          className={`${patuaOne.className} lg:text-4xl mt-2 text-xl mb-4 tracking-wide drop-shadow-lg text-center text-yellow-50`}
        >
          TechTrio
        </h1>
        <div className="flex flex-wrap lg:justify-between justify-center gap-6">
          {/* Anish */}
          <div className="text-center">
            <img
              src="boy.jpg"
              alt="anish"
              className="rounded-full mt-6 w-32 h-32 mx-auto"
            />
            <h2
              className={`${satisfy.className} ml-4 text-xl lg:text-4xl mt-4 tracking-wide text-white`}
            >
              Anish Dharnidhar{" "}
              <FontAwesomeIcon
                icon={faWrench}
                className="text-blue-500 text-xl lg:text-3xl ml-2"
              />
            </h2>
            <div className="flex gap-4 justify-center mt-2">
              <Link href="https://www.instagram.com/anishdharnidhar_07/profilecard/?igsh=bmUzcmttbmltMTlp" target="_blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-pink-500 text-3xl"
                />
              </Link>
              <Link href="https://github.com/Anish9320" target="_blank">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-white text-3xl"
                />
              </Link>
              <Link href="https://www.linkedin.com/in/anish-dharnidhar/" target="_blank">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-blue-700 text-3xl"
                />
              </Link>
            </div>
          </div>

          {/* Monishka */}
          <div className="text-center mr-8">
            <img
              src="girl.jpg"
              alt="monishka"
              className="rounded-full mt-6 w-32 h-32 mx-auto"
            />
            <h2
              className={`${satisfy.className} text-xl lg:text-4xl mt-4 tracking-wide text-white`}
            >
              Monishka Jethani{" "}
              <FontAwesomeIcon
                icon={faBrush}
                className="text-yellow-500 text-xl lg:text-3xl ml-2"
              />
            </h2>
            <div className="flex gap-4 justify-center mt-2">
              <Link href="https://www.instagram.com/monishkajethani/profilecard/?igsh=MTliZXV4NG95dGhzMg==" target="_blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-pink-500 text-3xl"
                />
              </Link>
              <Link href="https://github.com/monishkajethanii" target="_blank">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-white text-3xl"
                />
              </Link>
              <Link href="https://www.linkedin.com/in/monishka-jethani-b47080271/" target="_blank">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-blue-700 text-3xl"
                />
              </Link>
            </div>
          </div>

          {/* Vaibhav */}
          <div className="text-center mr-4">
            <img
              src="boy.jpg"
              alt="vaibhav"
              className="rounded-full mt-6 w-32 h-32 mx-auto"
            />
            <h2
              className={`${satisfy.className} text-xl lg:text-4xl mt-4 tracking-wide text-white`}
            >
              Vaibhav Rajai{" "}
              <FontAwesomeIcon
                icon={faBrush}
                className="text-yellow-500 lg:text-3xl text-xl ml-2"
              />
            </h2>
            <div className="flex gap-4 justify-center mt-2">
              <Link href="https://www.instagram.com/rajai_vaibhav_11/profilecard/?igsh=MWp3cTJleWFyZWZldA==" target="_blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-pink-500 text-3xl"
                />
              </Link>
              <Link href="https://github.com/VaibhavRajai" target="_blank">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-white text-3xl"
                />
              </Link>
              <Link href="https://www.linkedin.com/in/vaibhav-rajai-b957a2283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-blue-700 text-3xl"
                />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h1 className="flex justify-center mt-6 font-semibold text-white text-justify text-lg lg:text-2xl mr-3 pt-7">
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              className="text-purple-500 mr-3 ml-4 lg:text-xl mt-2 text-lg  "
            />
            We turn your ideas into reality with innovative, high-quality
            solutions tailored to your needs! ~ TechTrio
          </h1>
        </div>
      {/* <span className="text-white">-----------------------------------------------------------------------------------------------------</span> */}
      </div>
    </>
  );
}
