import { products } from "../../data/products";
import ProductCard from "./ProductCard";

export default function ProductListSection() {
  return (
    <div className="px-6 py-10">
      <h3 className="text-2xl font-bold mb-4">Featured Products</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
