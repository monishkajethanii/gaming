import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShoppingCart, faGamepad, faUsers, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import necessary icons

const games = [
  { id: 1, title: "GTA 5", type: "Action Game", image: "/gta5.png", price: "$20", desc: "Game full of missions" },
  { id: 2, title: "GTA 4", type: "Action Game", image: "/gta4.webp", price: "$30", desc: "Thode Kam missions" },
  { id: 3, title: "GTA 3", type: "Action Game", image: "/gta3.jpg", price: "$40", desc: "Bht kam Missions" },
  { id: 4, title: "FC 25", type: "Simulation Game", image: "/fc25.jpg", price: "$20", desc: "Jhethalal" },
  { id: 5, title: "FC 24", type: "Simulation Game", image: "/fc24.png", price: "$30", desc: "Popatlal" },
  { id: 6, title: "FIFA 23", type: "Simulation Game", image: "/fifa23.jpg", price: "$40", desc: "Kirmada" },
  { id: 7, title: "GTA 2", type: "Action Game", image: "/gta2.webp", price: "$50", desc: "Kam Missions" },
];

export default function CardsGrid() {
  const gameTypes = [...new Set(games.map((game) => game.type))];
  const typeIcons = {
    "Action Game": faGamepad,
    "Simulation Game": faUsers,
  };

  return (
    <div className="p-5">
      {gameTypes.map((type) => (
        <div key={type} className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center font-satisfy p-2">
            <FontAwesomeIcon icon={typeIcons[type]} size="lg" className="mr-2 text-red-500" />
            {type}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {games
              .filter((game) => game.type === type)
              .map((card) => (
                <div
                  key={card.id}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 cursor-pointer custom-cursor"
                >
                  <div className="w-full h-48 relative">
                    <Image
                      src={card.image}
                      alt={card.title}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                      className="rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-bold text-gray-800">{card.title}</h2>
                    <p className="text-gray-600">{card.desc}</p>
                    <p className="text-gray-800 font-semibold mt-2">{card.price}</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="bg-red-500 text-white py-2 px-3 rounded hover:bg-green-600 transition">
                        View More
                      </button>
                      <button className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        <FontAwesomeIcon icon={faPlus} size="1x" className="text-white" />
                      </button>
                      <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition">
                        <FontAwesomeIcon icon={faShoppingCart} size="1x" className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            <div className="col-span-full flex justify-end mt-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-red-500">
                <span className="text-lg">See More</span>
                <FontAwesomeIcon icon={faArrowRight} size="2x" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
