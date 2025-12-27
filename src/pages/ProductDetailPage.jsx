import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductGallery from "../components/product/ProductGallery";
import VariantSelector from "../components/product/VariantSelector";
import ProductPriceStock from "../components/product/ProductPriceStock";
import RelatedProductsByBrand from "../components/product/RelatedProductsByBrand";

import { useProductDetail } from "../hooks/useProductDetail";
import {
  buildAttributeMap,
  resolveVariant,
} from "../utils/variantUtils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(Number(id));
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const attributeMap = useMemo(() => {
    if (!product) return {};
    return buildAttributeMap(product.variants);
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return resolveVariant(product.variants, selectedAttributes);
  }, [product, selectedAttributes]);

  console.log("selectedVariant",selectedVariant)

  if (loading) return <div className="p-6 text-center">Loading…</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!product) return null;

  const attributeOrder = Object.keys(attributeMap).map(Number);

  const handleSelect = (attrId, valueId) => {
    setSelectedAttributes((prev) => {
      const index = attributeOrder.indexOf(attrId);
      const updated = {};

      attributeOrder.forEach((id, i) => {
        if (i < index) updated[id] = prev[id];
      });

      if (prev[attrId] !== valueId) {
        updated[attrId] = valueId;
      }

      return updated;
    });
  };

  return (
    <>
      <Navbar />

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto p-6 mt-24">
        <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
          {/* Left: Product Gallery */}
          <div className="flex justify-center md:justify-start">
            <ProductGallery images={product.images} className="rounded-xl" />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            <h1 className="text-3xl md:text-4xl font-extrabold">{product.title}</h1>
            <p className="text-gray-500 text-sm md:text-base">
              {product.brand_name} · {product.model_name}
            </p>

            <ProductPriceStock
              variant={selectedVariant}
              defaultPrice={product.default_price}
            />

            <VariantSelector
              attributeMap={attributeMap}
              variants={product.variants}
              selectedAttributes={selectedAttributes}
              onSelect={handleSelect}
            />

            <button
              disabled={!selectedVariant || selectedVariant.stock <= 0}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-white font-semibold disabled:opacity-50 transition"
            >
              Add to Cart
            </button>

            {/* Description */}
            {product.description && (
              <div className="mt-6 text-gray-700">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-sm md:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {product.brand_id && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <RelatedProductsByBrand
              brandId={product.brand_id}
              currentProductId={product.id}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
