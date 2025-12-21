import { useState } from "react";
import { updateVariant } from "../../api/variant.api";

export default function VariantEditModal({ variant, onClose, onUpdated }) {
  const [price, setPrice] = useState(variant.price);
  const [stock, setStock] = useState(variant.stock);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      await updateVariant(variant.id, {
        price: Number(price),
        stock: Number(stock),
      });
      onUpdated();
      onClose();
    } catch (e) {
      setError("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96">
        <h3 className="text-lg font-semibold mb-3">Edit Variant</h3>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          className="w-full border p-2 mb-3"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          className="w-full border p-2 mb-4"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-yellow-400 px-3 py-1 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
