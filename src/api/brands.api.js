// api/category.api.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL; 


export const fetchBrands = async () => {
  const res = await axios.get(`${API_BASE}/api/product/brands`);
  return res.data;
};