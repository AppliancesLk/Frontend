import adminAxios from "./adminAxios";

export const createVariant = (productId, data) =>
  adminAxios.post(`/api/admin/variants`, data);

export const getProductVariants = (productId) =>
  adminAxios.get(`/api/admin/product/${productId}/variants`);
export const deleteVariant = (variantId) =>
  adminAxios.delete(`/api/admin/variants/${variantId}`);

export const getVariantById = (id) =>
  adminAxios.get(`/api/admin/variants/${id}`);