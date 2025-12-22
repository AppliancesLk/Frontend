import adminAxios from "./adminAxios";

export const getBrands = () =>
  adminAxios.get("/api/admin/brands");

export const createBrand = (data) =>
  adminAxios.post("/api/admin/brands", data);

export const updateBrand = (id, data) =>
  adminAxios.put(`/api/admin/brands/${id}`, data);

export const getBrandById = (id) => {
    adminAxios.get(`/api/admin/brands/${id}`);
}
