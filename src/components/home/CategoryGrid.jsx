import { categories } from "../../data/categories";

export default function CategoryGrid() {
  return (
    <div className="px-6 py-10">
      <h3 className="text-2xl font-bold mb-4">Categories</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="rounded-md overflow-hidden shadow hover:scale-105 transition">
            <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover" />
            <p className="text-center p-3 font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
