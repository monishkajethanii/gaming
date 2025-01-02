"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Description from "./description";

const images = [
  { id: 1, src: "/fc25.jpg", title: "FC 25", desc: "FC 25 Game released by FC in JUNE 2023", alt: "Image of FC 25" },
  { id: 2, src: "/fc24.png", title: "FC 24", desc: "FC 24 Game released by FC in JUNE 2023", alt: "Image of FC 24" },
  { id: 3, src: "/gta5.png", title: "GTA 5", desc: "GTA Game released by STAR GAMES in JUNE 2023", alt: "Image of GTA 5" },
];

export default function Slideshow() {
  const [activeImage, setActiveImage] = useState(0);

  const nextSlide = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [activeImage]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center bg-black rounded-lg shadow-xl w-full top-0">
      <div className="relative w-full sm:w-2/3 h-[400px] sm:h-[500px] overflow-hidden rounded-lg flex justify-center items-center">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === activeImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              className="object-cover object-center rounded-lg " 
            />
          </div>
        ))}
      </div>
      <div className="w-full sm:w-1/3 flex flex-col justify-center text-center sm:text-left p-4 mt-4 sm:mt-0">
        <Description activeImage={activeImage} />
        <div className="flex justify-center sm:justify-between items-center mt-4 gap-4">
          <button
            onClick={prevSlide}
            className="focus:outline-none p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" className="text-white" />
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-400 transition-colors">
            View More
          </button>
          <button
            onClick={nextSlide}
            className="focus:outline-none p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition-all"
          >
            <FontAwesomeIcon icon={faArrowRight} size="2x" className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}