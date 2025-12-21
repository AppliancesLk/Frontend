import adminAxios from "./adminAxios";

export const getProducts = () =>
  adminAxios.get("/api/admin/products");

export const createProduct = (data) =>
  adminAxios.post("/api/admin/products", data);

export const updateProduct = (id, data) =>
  adminAxios.put(`/api/admin/products/${id}`, data);
