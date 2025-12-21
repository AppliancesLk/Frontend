import { useEffect, useState } from "react";
import { createProduct } from "../../api/product.api";
import { getCategories } from "../../api/category.api";

export default function ProductForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !categoryId) {
      setError("Title and category are required");
      return;
    }

    try {
      await createProduct({
        title,
        category_id: Number(categoryId),
        default_price: Number(price || 0),
        description,
      });

      setTitle("");
      setCategoryId("");
      setPrice("");
      setDescription("");
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded border w-100"
    >
      <h2 className="text-lg font-semibold mb-3">Add Product</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        className="w-full border p-2 mb-3"
        placeholder="Product title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="w-full border p-2 mb-3"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="w-full border p-2 mb-3"
        placeholder="Base price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
        Create Product
      </button>
    </form>
  );
}
