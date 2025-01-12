"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  faIndianRupee
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSession } from "next-auth/react";

const config = {
  method: 'get',
  url: 'https://tamil-games-api.vercel.app/api/get-games',
  headers: {
    'Content-Type': 'application/json',
    auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
  }
};

const GameSkeleton = () => (
  <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 animate-pulse">
    <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"/>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"/>
    <div className="h-4 bg-gray-300 rounded w-full mb-4"/>
    <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"/>
    <div className="flex justify-between items-center space-x-2">
      <div className="h-10 bg-gray-300 rounded flex-1"/>
      <div className="h-10 bg-gray-300 rounded flex-1"/>
    </div>
  </div>
);

const Notification = ({ message, onClose }) => (
  <div className="fixed top-5 right-5 bg-gradient-to-r from-purple-700 to-blue-900 text-white p-4 rounded-lg shadow-lg z-50 transition-transform transform scale-100 hover:scale-105">
    <div className="flex items-center space-x-4">
      <span className="text-lg font-bold"><a href="/Cart">{message}</a></span>
      <button
        onClick={onClose}
        className="text-white bg-red-500 hover:bg-red-700 rounded-full px-3 py-1"
      >
        ✕
      </button>
    </div>
  </div>
);

export default function CardsGrid() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [gameTypes, setGameTypes] = useState([]);
  const [resGames, setResGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [notification, setNotification] = useState(null);

  // Disable right click
  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

  const getGames = async () => {
    try {
      setLoading(true);
      const response = await axios(config);
      const result = response.data.result;
      setResGames(result);
      const types = [...new Set(result.map((game) => game.game_type))];
      setGameTypes(types);
      setFilteredGames(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    filterGames(selectedType, searchTerm);
  }, [sortOrder]);

  const filterGames = (type, search) => {
    let filtered = [...resGames];
    
    if (search) {
      filtered = filtered.filter(game => 
        game.game_title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (type) {
      filtered = filtered.filter(game => game.game_type === type);
    }

    filtered.sort((a, b) => {
      const priceA = parseFloat(a.game_price) || 0;
      const priceB = parseFloat(b.game_price) || 0;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });
    
    setFilteredGames(filtered);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    filterGames(type, searchTerm);
  };

  const handleSort = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterGames(selectedType, term);
  };

  const resetFilters = () => {
    setSelectedType("");
    setSortOrder("asc");
    setSearchTerm("");
    setFilteredGames(resGames);
  };

  const handleClick = (gameId) => {
    const selectedGame = resGames.find((game) => game.game_id === gameId);
    setModalData(selectedGame);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setModalData(null);
  };

  // const sendTelegramMessage = async (chatId, message, botToken) => {
  //   const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       chat_id: chatId,
  //       text: message,
  //     }),
  //   });
  //   return await response.json();
  // };

  const saveData = () => {
    const status = localStorage.getItem("status");
    if (status == 0) {
      window.location.href = "/Login";
    } else {
      setShowModal(true);
      const gameDetails = { 
        title: modalData.game_title, 
        price: modalData.game_price 
      };
      localStorage.setItem("Game Details", JSON.stringify(gameDetails));
      const chatId = "6021078557";
      const details = localStorage.getItem("Game Details");
      const message = `🎮 Hello, I'm interested in purchasing the game '${modalData.game_title}' listed at ${modalData.game_price}.🤝 Please let me know the next steps for completing the purchase. Thank you! 🙏`;
      
      setTimeout(()=>{window.open(`https://t.me/anish9320?text=${encodeURIComponent(message)}`,'_blank')},5000)
    }
  };

  const handleAddToCart = (gameId) => {
    if(localStorage.getItem("name") || session){

      const selectedGame = resGames.find((game) => game.game_id === gameId);
      if (!selectedGame) return;
      
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingGame = cart.find((game) => game.game_id === gameId);
      
      if (existingGame) {
        existingGame.quantity += 1;
      } else {
        cart.push({
        game_id: selectedGame.game_id,
        game_title: selectedGame.game_title,
        game_desc: selectedGame.game_desc,
        game_price: selectedGame.game_price,
        game_img: selectedGame.game_img,
        quantity: 1
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setNotification(`"${selectedGame.game_title}" added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  }
  else{
    window.location.href = "/Login"
  }
  };

  const visibleGameTypes = selectedType ? [selectedType] : gameTypes;

  if (loading) {
    return (
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <GameSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

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
            onChange={handleSort}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
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
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
      {filteredGames.length === 0 ? (
        <div className="text-center text-red-500 text-xl mt-10">
          No results found.
        </div>
      ) : (
        visibleGameTypes.map((type) => {
          const gamesOfType = filteredGames.filter(game => game.game_type === type);
          if (gamesOfType.length === 0) return null;
          
          return (
            <div key={type} className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center font-satisfy p-2">
                {type}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gamesOfType.map((card) => (
                  <div
                    key={card.game_id}
                    className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-full h-48 relative mb-4">
                      <Image
                        src={card.game_img}
                        alt={card.game_title}
                        onClick={() => handleClick(card.game_id)}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        className="rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {card.game_desc}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
                    <div className="mb-4">
                      <span className="text-xl font-bold text-red-500">
                      ₹{card.game_price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center space-x-2">
                      <button
                        onClick={() => handleClick(card.game_id)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-xl hover:scale-105 transform transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        View More
                      </button>
                      <button
                        onClick={() => handleAddToCart(card.game_id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white py-2 px-4 rounded-xl hover:scale-105 transform transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {open && modalData && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full ml-10 mr-10">
            <div className="w-full h-64 relative mb-4">
              <Image
                src={modalData.game_img}
                alt={modalData.game_title}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-black">{modalData.game_title}</h2>
            <p className="text-black">{modalData.game_desc}</p>
            <p className="text-red-600 font-bold mt-2 text-xl">₹{modalData.game_price}</p>

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
      {/* Custom Modal */}
      {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  🎉 Thank You for Your Purchase! 🎉
                </h2>
                
                <p className="text-lg text-gray-600">
                  🕒 Our seller will connect with you within 24 hours.
                </p>
                
                <p className="text-lg text-gray-600">
                  Please wait for their response.
                </p>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    ⚡ You will be redirected to Telegram in a few seconds...
                  </p>
                  <p className="text-blue-600 mt-2">
                    📱 Please click the "Send" button after being redirected!
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                  <p className="text-yellow-800 font-bold mb-2">
                    ⚠️ Important Note:
                  </p>
                  <p className="text-yellow-700">
                    If Telegram doesn't open automatically:
                  </p>
                  <ul className="text-yellow-600 text-sm mt-2 space-y-1">
                    <li>✅ Make sure Telegram is installed on your device</li>
                    <li>🔓 Allow pop-ups in Google Chrome</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
