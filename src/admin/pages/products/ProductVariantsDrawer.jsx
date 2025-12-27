import React, { useEffect, useState } from "react";
import {
  getProductVariants,
  deleteVariant,
} from "../../api/variant.api";
import VariantFormDrawer from "./VariantFormDrawer";

const ProductVariantsDrawer = ({ product, onClose }) => {
  const [variants, setVariants] = useState([]);
  const [editingVariant, setEditingVariant] = useState(null);

  const fetchVariants = async () => {
    const res = await getProductVariants(product.id);
    setVariants(res.data);
  };

  useEffect(() => {
    fetchVariants();
  }, [product.id]);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-125 bg-white z-60 p-6 shadow-xl">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">
            Variants · {product.title}
          </h3>
          <button onClick={onClose}>✕</button>
        </div>

        <button
          onClick={() => setEditingVariant({})}
          className="bg-yellow-400 px-3 py-2 rounded-md mb-4"
        >
          + Add Variant
        </button>

        <div className="space-y-3">
          {variants.map((v) => (
            <div
              key={v.id}
              className="border rounded-md p-3 flex justify-between"
            >
              <div>
                <div className="font-medium">{v.sku}</div>
                <div className="text-sm text-slate-500">
                  Price: {v.price} | Stock: {v.stock}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingVariant(v)}
                  className="text-yellow-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVariant(v.id).then(fetchVariants)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingVariant !== null && (
        <VariantFormDrawer
          product={product}
          variant={editingVariant}
          onClose={() => setEditingVariant(null)}
          onSaved={fetchVariants}
        />
      )}
    </>
  );
};

export default ProductVariantsDrawer;
