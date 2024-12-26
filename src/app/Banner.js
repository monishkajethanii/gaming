"use client"
import React, { useState } from "react";

const BirthdayBanner = () => {
  const [birthday, setBirthday] = useState("");

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Birthday ${birthday} added! Get ready for exciting offers!`);
  };

  return (
    <div className="bg-black mt-10 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">🎉 Celebrate Your Special Day with Us! 🎉</h2>
      <p className="mb-4 text-2xl">Add Your Birthday and Unlock Exclusive Offers!</p>
      <input
        type="date"
        value={birthday}
        onChange={handleBirthdayChange}
        className="p-2 mb-4 text-black rounded-md"
      />
      <button
        onClick={handleSubmit}
        className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-lg"
      >
        Add Birthday & Get Offers
      </button>
      <p className="mt-4 text-lg">🎁 Exciting Birthday Surprises Await! 🎁</p>
    </div>
  );
};

export default BirthdayBanner;
