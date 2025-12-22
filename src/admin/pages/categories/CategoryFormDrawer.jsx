import React, { useEffect, useState } from "react";

const CategoryFormDrawer = ({ mode, category, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
      });
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white z-50 shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-6 text-slate-800">
          {mode === "add" ? "Add Category" : "Edit Category"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Slug (optional)"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={3}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
          />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-4 py-2 rounded-md font-medium"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-md text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryFormDrawer;
