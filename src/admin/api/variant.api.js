import adminAxios from "./adminAxios";

export const createVariant = (productId, data) =>
  adminAxios.post(`/api/admin/products/${productId}/variants`, data);

export const getProductVariants = (productId) =>
  adminAxios.get(`/api/admin/products/${productId}/variants`);
export const deleteVariant = (variantId) =>
  adminAxios.delete(`/api/admin/variants/${variantId}`);