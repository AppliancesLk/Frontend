import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../api/category.api";

export default function CategoryForm({ category, onSuccess, onClose }) {
  const isEdit = !!category;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description || "");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      const payload = { name, slug, description };

      if (isEdit) {
        await updateCategory(category.id, payload);
      } else {
        await createCategory(payload);
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-100"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Category" : "Add Category"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          className="w-full border p-2 mb-3"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          {onClose && (
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-yellow-400 px-4 py-2 rounded font-semibold"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
