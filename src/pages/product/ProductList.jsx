import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProductCard from "../../components/home/ProductCard";
import { useGetProducts } from "../../hooks/useGetProducts";
import ProductSearchBar from "../../components/product/ProductSearchBar";
import ProductFiltersSidebar from "../../components/layout/ProductFiltersSidebar";
import { useBrands } from "../../hooks/useBrands";
import { useCategories } from "../../hooks/useCategories";
import { useModels } from "../../hooks/useModels";
import noProductFoundImg from "../../assets/noProductFound.png";
const ProductList = () => {
  const {
    products,
    loading,
    error,
    filters,
    updateFilter,
    removeFilter,
    resetFilters,
  } = useGetProducts();

  const { brands } = useBrands();
  const { categories } = useCategories();
  const { models } = useModels(filters?.brand || "");

  const [filtersWithName, setFiltersWithName] = useState({
    q: "",
    category: "",
    brand: "",
    model: "",
    price_min: "",
    price_max: "",
  });

  return (
    <>
      <Navbar source="productList" />

      {/* PAGE CONTAINER */}
      <div className="mt-24 px-6 max-w-400 mx-auto">
        {/* 🔍 STICKY SEARCH BAR */}
        <div className="sticky top-20 z-30 bg-white pb-4">
          <div className="max-w-4xl mx-auto">
            <ProductSearchBar
              filters={filters}
              updateFilter={updateFilter}
              removeFilter={removeFilter}
              filtersWithName={filtersWithName}
              setFiltersWithName={setFiltersWithName}
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex gap-8 mt-6">
          <div className="hidden md:block w-72 shrink-0 sticky top-44 h-[calc(100vh-11rem)]">
            <div className="h-full overflow-y-auto pr-2">
              <ProductFiltersSidebar
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                brands={brands}
                categories={categories}
                models={models}
                setFiltersWithName={setFiltersWithName}
              />
            </div>
          </div>

          <div className="flex-1 h-[calc(100vh-11rem)] overflow-y-auto">
            {loading && (
              <p className="text-center py-20 text-gray-500">
                Loading products...
              </p>
            )}

            {error && <p className="text-center py-20 text-red-500">{error}</p>}

           {!loading && !error && (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-10 min-h-[60vh]">
    {products.length === 0 ? (
      <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
        <img src={noProductFoundImg} alt="No products found" className="w-20 h-20 mb-4"/>
        <p className="text-gray-500 text-lg font-medium">
          No products found
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your search or filters
        </p>
      </div>
    ) : (
      products.map((p) => <ProductCard key={p.id} product={p} />)
    )}
  </div>
)}

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
