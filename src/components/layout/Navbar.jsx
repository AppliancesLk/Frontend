import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Feather from "feather-icons-react";

export default function Navbar({ source = "" }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    navigate(`/products?q=${encodeURIComponent(searchValue.trim())}`);
    setSearchValue(""); // optional: clear input after search
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-2xl font-extrabold text-yellow-400 cursor-pointer hover:scale-105 transition transform"
            onClick={() => navigate("/")}
          >
            Appliance.lk
          </span>
        </div>

        {/* Center: Links + Search */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {/* Links */}
          <ul className="flex items-center gap-4 text-white font-medium">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Shop
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Deals
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              About
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Contact
            </li>
          </ul>

          {/* Search */}
          {source !== "productList" && (
            <div className="relative w-104 ml-6">
              <Feather
                icon="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-yellow-400"
                size={18}
                onClick={handleSearch}
              />

              <input
                type="text"
                placeholder="Search Product"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="w-full px-4 py-2 pl-10 bg-gray-900 text-white border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Right: Cart + SignUp */}
        <div className="hidden md:flex items-center gap-10 -mr-10">
          <button className="relative flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition transform hover:scale-105 shadow-sm">
            <Feather
              icon="shopping-cart"
              size={18}
              className="text-yellow-400"
            />
            Cart
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <button className="ml-auto flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition transform hover:scale-105 shadow-sm">
            <Feather icon="user-plus" size={18} />
            SignUp
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-yellow-400 transition"
          >
            <Feather icon={menuOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 border-t border-gray-700">
          <ul className="flex flex-col gap-3 text-white font-medium">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Shop
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Deals
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              About
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Contact
            </li>
            <li className="flex items-center gap-3 mt-2">
              <Feather
                icon="shopping-cart"
                size={18}
                className="text-yellow-400"
              />
              Cart (3)
            </li>
            <li className="flex items-center gap-3">
              <Feather icon="user-plus" size={18} />
              SignUp
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
