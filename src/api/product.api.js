import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async (params) => {
  const res = await axios.get(`${API_BASE}/api/product/products`, {
    params,
  });
  return res.data;
};
