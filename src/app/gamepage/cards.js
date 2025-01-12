"use client";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faGamepad,
  faUsers,
  faFilter,
  faSortAmountDown,
  faSortAmountUp,
  faRedo,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { sendTelegramMessage } from "../telegram";

const games = [
  {
    id: 1,
    title: "GTA 5",
    type: "Action Game",
    image: "/gta5.png",
    price: 20,
    desc: "Game full of missions",
    paid: true,
  },
  {
    id: 2,
    title: "GTA 4",
    type: "Action Game",
    image: "/gta4.webp",
    price: 30,
    desc: "Thode Kam missions",
    paid: true,
  },
  {
    id: 3,
    title: "GTA 3",
    type: "Action Game",
    image: "/gta3.jpg",
    price: 40,
    desc: "Bht kam Missions lorem*dfdh nfofjmnlo rhnviel rnvkiebvje b,kjvn lk,f nv,kref nlk,erfgl.k n,krn l,  bn,kmtrgnkjr, bnmk",
    paid: false,
  },
  {
    id: 4,
    title: "FC 25",
    type: "Simulation Game",
    image: "/fc25.jpg",
    price: 20,
    desc: "Jhethalal",
    paid: false,
  },
  {
    id: 5,
    title: "FC 24",
    type: "Simulation Game",
    image: "/fc24.png",
    price: 30,
    desc: "Popatlal",
    paid: true,
  },
  {
    id: 6,
    title: "FIFA 23",
    type: "Simulation Game",
    image: "/fifa23.jpg",
    price: 40,
    desc: "Kirmada",
    paid: true,
  },
  {
    id: 7,
    title: "GTA 2",
    type: "Action Game",
    image: "/gta2.webp",
    price: 50,
    desc: "Kam Missions",
    paid: false,
  },
];

export default function CardsGrid() {
  const gameTypes = [...new Set(games.map((game) => game.type))];
  const [filteredGames, setFilteredGames] = useState(games);
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterPaid, setFilterPaid] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClick = (gameId) => {
    const selectedGame = games.find((game) => game.id === gameId);
    setModalData(selectedGame);
    setOpen(true);
  };
  const saveData = () => {
    const status = localStorage.getItem("status");
    if (status == 0) {
      window.location.href = "/Login";
    } else {
      const gameDetails = { title: modalData.title, price: modalData.price };
      localStorage.setItem("Game Details", JSON.stringify(gameDetails));
      const chatId = "6021078557";
      const details = localStorage.getItem("Game Details");
      const message = `${details}`;
      const botToken = "7836668942:AAHTt8SPmPucNYC_G7qpm6uO3Gw96YKauTQ";

      sendTelegramMessage(chatId, message, botToken)
        .then((data) => {
          console.log("Message sent successfully:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const closeModal = () => {
    setOpen(false);
    setModalData(null);
  };
  const typeIcons = {
    "Action Game": faGamepad,
    "Simulation Game": faUsers,
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    const filtered = games.filter((game) =>
      type === "" ? true : game.type === type
    );
    setFilteredGames(filtered);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sorted = [...filteredGames].sort((a, b) =>
      newOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredGames(sorted);
  };

  const handlePaidFilter = (paidFilter) => {
    setFilterPaid(paidFilter);
    const filtered = games.filter((game) =>
      paidFilter === "all"
        ? true
        : paidFilter === "paid"
        ? game.paid
        : !game.paid
    );
    setFilteredGames(filtered);
  };

  const resetFilters = () => {
    setSelectedType("");
    setSortOrder("asc");
    setFilterPaid("all");
    setFilteredGames(games);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const handleViewMore = (gameId) => {
    alert(`Viewing more details for Game ID ${gameId}`);
  };

  const handleAddToCart = (gameId) => {
    const selectedGame = games.find((game) => game.id === gameId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingGame = cart.find((game) => game.id === gameId);

    if (existingGame) {
      existingGame.quantity += 1;
    } else {
      cart.push({ ...selectedGame, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // alert(`${selectedGame.title} added to cart`);
  };

  return (
    <div className="p-5">
      <div className="bg-white p-4 rounded-lg shadow-xl mb-6 flex items-center justify-between space-x-4 flex-wrap sm:flex-nowrap overflow-auto">
        <div className="flex items-center space-x-4 flex-wrap sm:flex-nowrap">
          <div className="relative w-full sm:w-auto">
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              className="absolute left-3 top-2 text-gray-500"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for a game"
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:outline-none text-gray-700 bg-gray-50 transition duration-200 hover:bg-gray-100"
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none text-gray-700 bg-gray-50 transition duration-200 hover:bg-gray-100"
            value={selectedType}
            onChange={(e) => handleTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {gameTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none text-gray-700 bg-gray-50 transition duration-200 hover:bg-gray-100"
            value={sortOrder}
            onChange={() => handleSort()}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none text-gray-700 bg-gray-50 transition duration-200 hover:bg-gray-100"
            value={filterPaid}
            onChange={(e) => handlePaidFilter(e.target.value)}
          >
            <option value="all">All Games</option>
            <option value="paid">Paid Games</option>
            <option value="unpaid">Unpaid Games</option>
          </select>
          <button
            onClick={resetFilters}
            className="flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-700 text-white py-2 px-4 rounded-full hover:scale-105 transform transition-all duration-200"
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            Reset Filters
          </button>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center text-red-500 text-xl mt-10">
          No results found.
        </div>
      ) : (
        gameTypes
          .filter((type) => selectedType === "" || type === selectedType)
          .map((type) => (
            <div key={type} className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center font-satisfy p-2">
                <FontAwesomeIcon
                  icon={typeIcons[type]}
                  size="lg"
                  className="mr-2 text-red-500"
                />
                {type}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames
                  .filter((game) => game.type === type)
                  .map((card) => (
                    <div
                      key={card.id}
                      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="w-full h-48 relative mb-4">
                        <Image
                          src={card.image}
                          alt={card.title}
                          onClick={() => handleClick(card.id)}
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          className="rounded-lg"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
                      <div className="mb-4">
                        <span className="text-xl font-bold text-red-500">
                          ${card.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center space-x-2">
                        <button
                          onClick={() => handleViewMore(card.id)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-xl hover:scale-105 transform transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faEye} className="mr-2" />
                          View More
                        </button>
                        <button
                          onClick={() => handleAddToCart(card.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white py-2 px-4 rounded-xl hover:scale-105 transform transition-all duration-200"
                        >
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            className="mr-2"
                          />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              {filteredGames.filter((game) => game.type === type).length >
                3 && (
                <button className="text-white bg-blue-500 py-2 px-4 rounded-md mt-6 mx-auto block">
                  See More
                </button>
              )}
            </div>
          ))
      )}
      {open && modalData && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full ml-10 mr-10">
            <img src={modalData.image}></img>
            <h2 className="text-2xl font-bold mb-4">{modalData.title}</h2>
            <p>{modalData.desc}</p>
            <div className="mt-4">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
              <button
                onClick={saveData}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 ml-5"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
