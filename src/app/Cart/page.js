"use client";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Nav from "../Nav";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const checkLoggedIn = async () => {
    const status = localStorage.getItem("status");
    
    if (status == "1") {
      try {
        // Sending a message using your Telegram API (or custom API endpoint)
        const response = await fetch('/api/sendTelegramMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatId: "5032156050", // Replace with your target chat ID
            message: "Hello, this is a test message from the cart!", // Your message
            botToken: "7836668942:AAHTt8SPmPucNYC_G7qpm6uO3Gw96YKauTQ", // Replace with your bot token
          }),
        });
        
        const result = await response.json();
        console.log("Message sent:", result);

        // Redirect to Telegram with message after API success
        // const message = encodeURIComponent("Hello");
        // window.location.href = `http://t.me/Saikiruba9927?start=${message}`;
      } catch (error) {
        console.error("Error calling API:", error);
      }
    } else {
      window.location.href = "/Login";
    }
  };

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const handleDelete = (gameId) => {
    const updatedCart = cart.filter((game) => game.id !== gameId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <>
      <Nav />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6 text-yellow-100">
          Your Bag <FontAwesomeIcon icon={faBagShopping} className="pl-2" />
        </h1>
        {cart.length === 0 ? (
          <p className=" text-white">Your bag is empty.</p>
        ) : (
          <div>
            {cart.map((game) => (
              <div
                key={game.id}
                className="flex items-center mb-4 p-4 bg-white shadow rounded-lg"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-24 h-24 rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{game.title}</h3>
                  <p className="text-gray-600">Price: ${game.price}</p>
                  {/* <p className="text-gray-600">Quantity: {game.quantity}</p> */}
                </div>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="text-right mt-6">
              <span className="text-white">----------------------------------</span>
              <h2 className="text-2xl font-bold text-white">Total: ${total}</h2>
            </div>
            <button
              className="bg-white text-black flex items-end rounded-lg font-bold p-2 flex justify-end"
              onClick={checkLoggedIn}
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </>
  );
}
