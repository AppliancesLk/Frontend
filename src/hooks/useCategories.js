// hooks/useCategories.js
import { useEffect, useState } from "react";
import { fetchCategories } from "../api/category.api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((res) => setCategories(res || []))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};
