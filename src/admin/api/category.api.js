import adminAxios from "./adminAxios";

export const getCategories = () =>
  adminAxios.get("/api/admin/categories");

export const createCategory = (data) =>
  adminAxios.post("/api/admin/categories", data);

export const updateCategory = (id, data) =>
  adminAxios.put(`/api/admin/categories/${id}`, data);

export const deleteCategory = (id) =>
  adminAxios.delete(`/api/admin/categories/${id}`);
