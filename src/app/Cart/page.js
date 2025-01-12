"use client";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "../Nav";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.game_price) * item.quantity,
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
      try {
        const cartDetails = cart.map(item => ({
          title: item.game_title,
          price: item.game_price,
          quantity: item.quantity
        }));

        const message = JSON.stringify(cartDetails, null, 2);

        const response = await fetch('/api/sendTelegramMessage', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: "5032156050",
            message: message,
            botToken: "7836668942:AAHTt8SPmPucNYC_G7qpm6uO3Gw96YKauTQ",
          }),
        });

        const result = await response.json();
        console.log("Message sent:", result);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    } else {
      window.location.href = "/Login";
    }
  };

  return (
    <>
      <Nav />
      <div className="p-4 bg-black">
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
                  <p className="text-gray-600">Quantity: {game.quantity}</p>
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
      </div>
    </>
  );
}