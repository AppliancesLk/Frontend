// hooks/useBrands.ts
import { useEffect, useState } from "react";
import { fetchBrands } from "../api/brands.api";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands()
      .then((res) => setBrands(res))
      .finally(() => setLoading(false));
  }, []);

  return { brands, loading };
};
