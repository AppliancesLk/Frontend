import { useEffect, useState } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import { getProducts } from "../../api/product.api";
import ProductForm from "./ProductForm";

export default function ProductList() {
  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductForm onSuccess={loadProducts} />
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.title}</td>
              <td className="p-3">{p.category?.name || "-"}</td>
              <td className="p-3">
                {p.active ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
