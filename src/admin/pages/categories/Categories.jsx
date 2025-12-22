import React, { useEffect, useMemo, useState } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import {
  getCategories,
  createCategory,
  updateCategory,
} from "../../api/category.api";
import SearchInput from "../../components/SearchInput";
import CategoryList from "./CategoryList";
import CategoryFormDrawer from "./CategoryFormDrawer";

export const Categories = () => {
  useAdminGuard();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    const term = search.toLowerCase();
    return categories.filter((c) =>
      [c.name, c.slug, c.description]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(term))
    );
  }, [categories, search]);

  const openAdd = () => {
    setMode("add");
    setEditingCategory(null);
    setDrawerOpen(true);
  };

  const openEdit = (category) => {
    setMode("edit");
    setEditingCategory(category);
    setDrawerOpen(true);
  };

  const handleSubmit = async (data) => {
    if (mode === "add") {
      await createCategory(data);
    } else {
      await updateCategory(editingCategory.id, data);
    }
    setDrawerOpen(false);
    fetchCategories();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Categories
        </h2>

        <div className="flex gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search categories..."
          />
          <button
            onClick={openAdd}
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-4 py-2 rounded-md font-medium shadow"
          >
            + Add Category
          </button>
        </div>
      </div>

      <CategoryList categories={filteredCategories} onEdit={openEdit} />

      {drawerOpen && (
        <CategoryFormDrawer
          mode={mode}
          category={editingCategory}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
