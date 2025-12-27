import React, { useEffect, useState } from "react";
import { getModels } from "../../api/model.api";
import ProductImageUploader from "../../components/ProductImageUploader";

const ProductFormDrawer = ({
  mode,
  product,
  brands,
  categories,
  onClose,
  onSubmit,
}) => {
  const [models, setModels] = useState([]);
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category_id: "",
    brand_id: "",
    model_id: "",
    default_price: "",
    active: true,
  });

  /* -------------------- MAP PRODUCT → FORM -------------------- */
  useEffect(() => {
    if (!product) return;

    setForm({
      title: product.title || "",
      slug: product.slug || "",
      description: product.description || "",
      category_id: product.category_id
        ? String(product.category_id)
        : "",
      brand_id: product.brand_id
        ? String(product.brand_id)
        : "",
      model_id: product.model_id
        ? String(product.model_id)
        : "",
      default_price: product.default_price || "",
      active: Boolean(product.active),
    });

    setImages(product.images || []);
  }, [product]);

  /* -------------------- LOAD MODELS -------------------- */
  useEffect(() => {
    if (!form.brand_id) {
      setModels([]);
      return;
    }

    getModels(form.brand_id).then((res) => {
      setModels(res.data);
    });
  }, [form.brand_id]);

  /* -------------------- SUBMIT -------------------- */
  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      category_id: Number(form.category_id),
      brand_id: Number(form.brand_id),
      model_id: form.model_id ? Number(form.model_id) : null,
      active: form.active ? 1 : 0,
      images,
    });
  };

  if (!mode) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-115 bg-white z-50 p-6 shadow-xl overflow-y-auto">
        <h3 className="font-semibold mb-4">
          {mode === "add" ? "Add Product" : "Edit Product"}
        </h3>

        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          />

          <select
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.brand_id}
            onChange={(e) =>
              setForm({
                ...form,
                brand_id: e.target.value,
                model_id: "",
              })
            }
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={String(b.id)}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={form.model_id}
            onChange={(e) =>
              setForm({ ...form, model_id: e.target.value })
            }
            disabled={!form.brand_id}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Model</option>
            {models.map((m) => (
              <option key={m.id} value={String(m.id)}>
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Default Price"
            value={form.default_price}
            onChange={(e) =>
              setForm({ ...form, default_price: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm({ ...form, active: e.target.checked })
              }
            />
            Active
          </label>

          <ProductImageUploader images={images} setImages={setImages} />

          <div className="flex gap-3 pt-2">
            <button className="bg-yellow-400 px-4 py-2 rounded-md">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductFormDrawer;
