import Feather from "feather-icons-react";


export default function Navbar() {
  return (
    <nav className="bg-gray-800 px-6 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-extrabold text-yellow-400 tracking-wide">
          Appliance.lk
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm cursor-pointer">
            <Feather
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Product"
              className="
                w-full px-4 py-1 pl-8
                bg-gray-900 text-white
                border border-gray-700
                rounded-lg
                placeholder-gray-400
                focus:outline-none
                focus:border-yellow-400
                focus:ring-1 focus:ring-yellow-400
                transition
              "
            />
          </div>

          <button className="cursor-pointer flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
            <Feather icon="shopping-cart" size={18} className="text-yellow-400" />
            Cart
          </button>

          <button className="cursor-pointer flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300">
            <Feather icon="user-plus" size={18} />
            SignUp
          </button>

        </div>
      </div>
    </nav>
  );
}
