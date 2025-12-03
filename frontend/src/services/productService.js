import api from './api';

// Get all products
export const getProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/products${queryString ? `?${queryString}` : ''}`);
  return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Create product
export const createProduct = async (productData, token) => {
  const response = await api.post('/products', productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update product
export const updateProduct = async (id, productData, token) => {
  const response = await api.put(`/products/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete product
export const deleteProduct = async (id, token) => {
  const response = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Upload product image
export const uploadProductImage = async (formData, token) => {
  const response = await api.post('/products/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get categories
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
