"use client";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "../Nav";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.game_price),
      0
    );
    setTotal(totalPrice);
  };

  const handleDelete = (gameId) => {
    const updatedCart = cart.filter((game) => game.game_id !== gameId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const checkLoggedIn = async () => {
    const status = localStorage.getItem("status");
    
    if (status === "1") {
      setShowModal(true);
      
      const cartDetails = cart.map(item => ({
        title: item.game_title,
        price: item.game_price,
      }));

      const message = cartDetails.map(item =>
        `- '${item.title}' for ${item.price}`
      ).join('\n');
    
      const fullMessage = `🎮 Hello! I'm interested in purchasing these awesome games:\n\n${message}\n\n💰 Total: ₹${total.toFixed(2)}\n\n🤝 Please guide me through the purchase process. Thank you! 🙏`;

      setTimeout(() => {
        window.open(`https://t.me/anish9320?text=${encodeURIComponent(fullMessage)}`, '_blank');
      }, 5000);
    } else {
      window.location.href = "/Login";
    }
  };

  return (
    <>
      <Nav />
      <div className="p-4 bg-black h-screen">
        <h1 className="text-3xl font-bold mb-6 text-yellow-100">
          Your Bag <FontAwesomeIcon icon={faBagShopping} className="pl-2" />
        </h1>
        {cart.length === 0 ? (
          <p className="text-white">Your bag is empty.</p>
        ) : (
          <div>
            {cart.map((game) => (
              <div
                key={game.game_id}
                className="flex items-center mb-4 p-4 bg-white shadow rounded-lg"
              >
                <div className="w-24 h-24 relative mr-4">
                  <Image
                    src={game.game_img}
                    alt={game.game_title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-600">{game.game_title}</h3>
                  <p className="text-gray-600">Price: ₹{game.game_price}</p>
                </div>
                <button
                  onClick={() => handleDelete(game.game_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="mt-6 flex justify-between items-center">
              <button
                className="bg-white text-black rounded-lg font-bold px-6 py-2 hover:bg-gray-100"
                onClick={checkLoggedIn}
              >
                Proceed
              </button>
              <div>
                <div className="text-white">----------------------------------</div>
                <h2 className="text-2xl font-bold text-white">
                  Total: ₹{total.toFixed(2)}
                </h2>
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
    </>
  );
}