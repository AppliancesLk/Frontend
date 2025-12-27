import { useState, useEffect } from "react";
import axios from "axios";
import api from "../lib/api";

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/api/product/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
};
