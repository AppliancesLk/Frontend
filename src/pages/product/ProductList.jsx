import React from "react";
import Navbar from "../../components/layout/Navbar";
import ProductCard from "../../components/home/ProductCard";
import { useGetProducts } from "../../hooks/useGetProducts";

const ProductList = () => {
  const {
    products,
    loading,
    error,
    filters,
    updateFilter,
  } = useGetProducts();

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto mt-20">
        {/* Search */}
        <div className="mb-6">
          <input
            placeholder="Search products..."
            value={filters.q}
            onChange={(e) => updateFilter("q", e.target.value)}
            className="
              w-full
              border
              px-4
              py-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
            "
          />
        </div>

        {/* States */}
        {loading && (
          <div className="text-center py-12 text-gray-500">
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
