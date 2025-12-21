import { useEffect, useState } from "react";
import { getProductVariants, deleteVariant } from "../../api/variant.api";
import VariantEditModal from "./VariantEditModal";

export default function VariantList({ productId }) {
  const [variants, setVariants] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadVariants = async () => {
    const res = await getProductVariants(productId);
    setVariants(res.data);
  };

  useEffect(() => {
    loadVariants();
  }, [productId]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this variant? This cannot be undone.")) return;
    await deleteVariant(id);
    loadVariants();
  };

  return (
    <div className="bg-white rounded p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Product Variants</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Attributes</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {variants.map((v) => (
            <tr key={v.id}>
              <td className="border p-2">
                {v.attributes.map((a) => (
                  <span key={a.attribute} className="block">
                    {a.attribute}: {a.value}
                  </span>
                ))}
              </td>

              <td className="border p-2">Rs {v.price}</td>
              <td className="border p-2">{v.stock}</td>

              <td className="border p-2 flex gap-2">
                <button
                  className="text-blue-600"
                  onClick={() => setEditing(v)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(v.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {variants.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No variants found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editing && (
        <VariantEditModal
          variant={editing}
          onClose={() => setEditing(null)}
          onUpdated={loadVariants}
        />
      )}
    </div>
  );
}
