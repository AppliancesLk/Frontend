import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image =
    product?.images?.[0] ||
    "https://via.placeholder.com/300x300?text=No+Image";

  const inStock = product.stock > 0;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div
        className="
          bg-white
          border border-gray-200
          rounded-2xl
          shadow-sm
          hover:shadow-lg
          transition
          duration-300
          flex
          flex-col
          h-full
        "
      >
        {/* Image */}
        <div className="relative w-full h-52 bg-gray-50 rounded-t-2xl flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={product.title}
            className="
              max-h-full
              max-w-full
              object-contain
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          {/* Stock badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full
              ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}
            `}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Brand */}
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand_name}
          </span>

          {/* Title */}
          <h4 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">
            {product.title}
          </h4>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              Rs {product.default_price}
            </span>

            <span className="text-xs text-gray-400">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
