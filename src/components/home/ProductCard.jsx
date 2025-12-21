import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const minPrice = Math.min(...product.variants.map(v => v.price));

  return (
    <Link to={`/product/${product.id}`}>
      <div className="p-4 border rounded-md shadow hover:scale-105 transition cursor-pointer">
        <img src={product.image} className="w-full h-40 object-cover" />
        <h4 className="text-lg font-semibold mt-3">{product.title}</h4>
        <p className="text-gray-600">Starting at ${minPrice}</p>
      </div>
    </Link>
  );
}
