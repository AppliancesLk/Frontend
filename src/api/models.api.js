// api/category.api.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL; 


export const fetchModels = async (brandId) => {
  const res = await axios.get(`${API_BASE}/api/product/models/${brandId}`);
  return res.data;
};

