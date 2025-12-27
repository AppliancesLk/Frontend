import { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../api/product.api";
import { useSearchParams } from "react-router-dom";

const DEFAULT_FILTERS = {
  q: "",
  category: "",
  brand: "",
  model: "",
  price_min: "",
  price_max: "",
};

export const useGetProducts = () => {
    const [searchParams] = useSearchParams();
const initialCategory = searchParams.get("category");
const initialBrand = searchParams.get("brand");
const initialSearchValue = searchParams.get("q")

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    q: initialSearchValue || "",
    category: initialCategory || "",
    brand: initialBrand || "",
    model: "",
    price_min: "",
    price_max: "",
  });

  
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- Fetch products ---------------- */
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchProducts({
        ...filters,
        page,
        limit,
      });

      console.log(res);

      setProducts(res || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [filters, page, limit]);

  /* ---------------- Auto reload on filter change ---------------- */
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ---------------- Filter helpers ---------------- */


  const resetFilters = () => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  };


  const updateFilter = (key, value) => {
  setPage(1);

  setFilters((prev) => {
    const next = { ...prev, [key]: value };

    // reset model when brand changes
    if (key === "brand") {
      next.model = "";
    }

    return next;
  });
};

const removeFilter = (key) => {
  setPage(1);
  setFilters((prev) => ({ ...prev, [key]: "" }));
};


  return {
    products,
    loading,
    error,

    // filters
    filters,
    updateFilter,
    resetFilters,
    updateFilter,
    removeFilter,

    // pagination
    page,
    setPage,

    reload: loadProducts,
  };
};
