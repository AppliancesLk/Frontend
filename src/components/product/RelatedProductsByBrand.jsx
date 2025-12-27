import ProductCard from "../home/ProductCard";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useEffect } from "react";

export default function RelatedProductsByBrand({
  brandId,
  currentProductId,
}) {
  const {
    products,
    loading,
    error,
    reload,
    updateFilter,
  } = useGetProducts();

  /* ---------- Init brand filter ---------- */
  useEffect(() => {
    console.log("coming to this ",brandId)
  if (!brandId) return;
  updateFilter("brand", brandId);
  
}, [brandId]);

  console.log("products",products)

  // Exclude current product
  const filteredProducts = products.filter(
    (p) => p.id !== currentProductId
  );

  if (!brandId) return null;

  return (
    <section className="mt-16">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        More from this brand
      </h3>

      {loading && (
        <p className="text-sm text-gray-500">Loading related products…</p>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {!loading && filteredProducts.length === 0 && (
        <p className="text-sm text-gray-500">
          No other products from this brand.
        </p>
      )}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          gap-6
        "
      >
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
