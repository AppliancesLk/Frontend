import  Feather  from "feather-icons-react";
import { products } from "../../data/products";
import ProductCard from "./ProductCard";

export default function ProductListSection() {
  return (
    <div className="px-6 py-10">
       <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-black">
         Featured Products
        </h3>
        <button className="cursor-pointer flex items-center">
          View all
          <Feather icon="chevron-right" size={16} className="ml-2" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
