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

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    category: initialCategory || "",
    brand: "",
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
  const updateFilter = (key, value) => {
    setPage(1); // reset page on filter change
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  };

  return {
    products,
    loading,
    error,

    // filters
    filters,
    updateFilter,
    resetFilters,

    // pagination
    page,
    setPage,

    reload: loadProducts,
  };
};
