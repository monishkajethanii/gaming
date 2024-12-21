"use client";
import PropTypes from "prop-types";

const descriptions = [
  { title: "FC 25", desc: "FC 25 Game released by FC in JUNE 2023",price:"$10" },
  { title: "FC 24", desc: "FC 24 Game released by FC in JUNE 2023",price:"$20" },
  { title: "GTA 5", desc: "GTA Game released by STAR GAMES in JUNE 2023",price:"$30" },
];

export default function Description({ activeImage }) {
  const { title, price,desc } = descriptions[activeImage];

  return (
    <div className="text-center text-white">
      <h2 className="text-5xl text-white-600 underline font-bold mb-10 mt-5 ">{title}</h2>
      <h2 className="text-4xl text-white-400 font-bold">{price}</h2>
      <p className="text-lg italic   text-white-500 font-rocksalt  mt-4 mb-6">{desc}</p>
    </div>
  );
}

Description.propTypes = {
  activeImage: PropTypes.number.isRequired,
};
