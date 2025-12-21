import { useState } from "react";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";

export default function ProductSummary({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  return (
    <div className="w-full md:w-1/2 px-6">
      <h2 className="text-3xl font-bold">{product.title}</h2>

      <p className="text-xl text-blue-600 mt-3">
        ${selectedVariant.price}
      </p>

      <VariantSelector
        variants={product.variants}
        onSelect={setSelectedVariant}
      />

      <p className="mt-4 text-gray-600">
        Stock: {selectedVariant.stock > 0 ? selectedVariant.stock : "Out of stock"}
      </p>

      <AddToCartButton product={product} variant={selectedVariant} />
    </div>
  );
}
