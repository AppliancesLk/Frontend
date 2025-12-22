import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/category.api"; // existing category api

const AttributeFormDrawer = ({ mode, attribute, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    dataType: "string",
    scope: "global",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (attribute) {
      setForm(attribute);
    }
  }, [attribute]);

  useEffect(() => {
    if (form.scope === "category") {
      getCategories().then((res) => setCategories(res.data));
    }
  }, [form.scope]);

  const submit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (payload.scope === "global") delete payload.categoryId;
    onSubmit(payload);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white z-50 p-5 shadow-xl">
        <h3 className="font-semibold mb-4">
          {mode === "add" ? "Add Attribute" : "Edit Attribute"}
        </h3>

        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />

          <select
            value={form.dataType}
            onChange={(e) =>
              setForm({ ...form, dataType: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="enum">Enum</option>
          </select>

          <select
            value={form.scope}
            onChange={(e) =>
              setForm({ ...form, scope: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="global">Global</option>
            <option value="category">Category</option>
          </select>

          {form.scope === "category" && (
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          <div className="flex gap-3">
            <button className="bg-yellow-400 px-4 py-2 rounded-md">
              Save
            </button>
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AttributeFormDrawer;
