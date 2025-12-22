import Feather from "feather-icons-react";
import { categories } from "../../data/categories";

export default function CategoryGrid() {
  return (
    <section className=" px-6 py-10">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-black">
          Categories
        </h3>
        <button className="cursor-pointer flex items-center">
          View all
          <Feather icon="chevron-right" size={16} className="ml-2" />
        </button>
      </div>

      <div className="flex gap-10 overflow-x-auto scrollbar-hide pb-4 justify-center">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center">
            <div className="my-5 mx-2 w-30 h-30 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg hover:scale-110 transition duration-300 cursor-pointer">
              <img
                src={cat.image}
                alt={"#"}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-center font-semibold text-gray-900 text-sm">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
