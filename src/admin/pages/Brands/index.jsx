import React, { useEffect, useState, useMemo } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import { getBrands, createBrand, updateBrand } from "../../api/brands.api";
import BrandList from "./BrandList";
import { AddBrand } from "./AddBrand";
import SearchInput from "../../components/SearchInput";
import ModelListDrawer from "../../components/models/ModelListDrawer";
import ModelFormDrawer from "../../components/models/ModelFormDrawer";

export const Brands = () => {
  useAdminGuard();

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // brand drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingBrand, setEditingBrand] = useState(null);

  // model drawers
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [modelListOpen, setModelListOpen] = useState(false);
  const [modelFormOpen, setModelFormOpen] = useState(false);

  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const filteredBrands = useMemo(() => {
    if (!search) return brands;
    const term = search.toLowerCase();
    return brands.filter((b) =>
      [b.name, b.slug, b.description]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(term))
    );
  }, [brands, search]);

  /* -------- Brand handlers (UNCHANGED) -------- */
  const openAddBrand = () => {
    setMode("add");
    setEditingBrand(null);
    setDrawerOpen(true);
  };

  const openEditBrand = (brand) => {
    setMode("edit");
    setEditingBrand(brand);
    setDrawerOpen(true);
  };

  const handleBrandSubmit = async (data) => {
    if (mode === "add") {
      await createBrand(data);
    } else {
      await updateBrand(editingBrand.id, data);
    }
    setDrawerOpen(false);
    fetchBrands();
  };

  /* -------- Model handlers (NEW) -------- */
  const openViewModels = (brand) => {
    setSelectedBrand(brand);
    setModelListOpen(true);
  };

  const openAddModel = (brand) => {
    setSelectedBrand(brand);
    setModelFormOpen(true);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Manage Product Brands
        </h2>

        <div className="flex gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search brands..."
          />
          <button
            onClick={openAddBrand}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md shadow font-medium"
          >
            + Add Brand
          </button>
        </div>
      </div>

      <BrandList
        brands={filteredBrands}
        onEdit={openEditBrand}
        onViewModels={openViewModels}
        onAddModel={openAddModel}
      />

      {isDrawerOpen && (
        <AddBrand
          mode={mode}
          brand={editingBrand}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleBrandSubmit}
        />
      )}

      {modelListOpen && selectedBrand && (
        <ModelListDrawer
          brand={selectedBrand}
          onClose={() => setModelListOpen(false)}
        />
      )}

      {modelFormOpen && selectedBrand && (
        <ModelFormDrawer
          mode="add"
          brandId={selectedBrand.id}
          onClose={() => setModelFormOpen(false)}
        />
      )}
    </div>
  );
};
