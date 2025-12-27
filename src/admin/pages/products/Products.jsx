import React, { useEffect, useMemo, useState } from "react";
import useAdminGuard from "../../hooks/useAdminGuard";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/product.api";
import { getBrands } from "../../api/brands.api";
import { getCategories } from "../../api/category.api";
import SearchInput from "../../components/SearchInput";
import ProductList from "./ProductList";
import ProductFormDrawer from "./ProductFormDrawer";
import ProductVariantsDrawer from "./ProductVariantsDrawer";

export const Products = () => {
  useAdminGuard();

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [variantsDrawerOpen, setVariantsDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const fetchData = async () => {
  
    const [p, b, c] = await Promise.all([
      getProducts(),
      getBrands(),
      getCategories(),
    ]);
    setProducts(p.data);
    setBrands(b.data);
    setCategories(c.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    const term = search.toLowerCase();
    return products.filter((p) =>
      [p.title, p.slug].filter(Boolean).some((v) =>
        v.toLowerCase().includes(term)
      )
    );
  }, [products, search]);


  const handleDeleteConfirm = async () => {
  if (!productToDelete) return;

  try {
    await deleteProduct(productToDelete.id);

    setDeleteConfirmationOpen(false);
    setProductToDelete(null);

    await fetchData(); // refresh list
  } catch (error) {
    console.error("Failed to delete product", error);
  }
};

const handleDeleteCancel = () => {
  setDeleteConfirmationOpen(false);
  setProductToDelete(null);
};

  const openAdd = () => {
    setMode("add");
    setEditingProduct(null);
    setDrawerOpen(true);
  };

  const openEdit = (product) => {
    setMode("edit");
    setEditingProduct(product);
    setDrawerOpen(true);
  };

  const onDelete = (product) => {
  setProductToDelete(product);
  setDeleteConfirmationOpen(true);
};


  const openVariants = (product) => {
    setEditingProduct(product);
    setVariantsDrawerOpen(true);
  };

  const handleSubmit = async (data) => {
    if (mode === "add") {
      await createProduct(data);
    } else {
      await updateProduct(editingProduct.id, data);
    }
    setDrawerOpen(false);
    fetchData();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Products</h2>

        <div className="flex gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
          />
          <button
            onClick={openAdd}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md font-medium"
          >
            + Add Product
          </button>
        </div>
      </div>

      <ProductList
        products={filteredProducts}
        onEdit={openEdit}
        onViewVariants={openVariants}
        onDelete={onDelete}
      />

      {drawerOpen && (
        <ProductFormDrawer
          mode={mode}
          product={editingProduct}
          brands={brands}
          categories={categories}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
     

      {variantsDrawerOpen && editingProduct && (
        <ProductVariantsDrawer
          product={editingProduct}
          onClose={() => setVariantsDrawerOpen(false)}
        />
      )}

      {deleteConfirmationOpen && productToDelete && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">
        Delete Product
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete{" "}
        <span className="font-medium">
          {productToDelete.title}
        </span>
        ? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleDeleteCancel}
          className="px-4 py-2 rounded-md border"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteConfirm}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};
