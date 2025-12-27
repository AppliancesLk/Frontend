import Feather from "feather-icons-react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

import { useGetProducts } from "../../hooks/useGetProducts";

export default function ProductListSection() {
  const {
    products,
    loading,
    error,
  } = useGetProducts();
  const navigate = useNavigate();

  console.log("products in section" , products)

  return (
    <div className="px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-black">
          Featured Products
        </h3>

        <button
          onClick={() => navigate("/products")}
          className="cursor-pointer flex items-center"
        >
          View all
          <Feather icon="chevron-right" size={16} className="ml-2" />
        </button>
      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading products...
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-red-500">
          {error}
        </div>
      )}

      {/* Product grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
