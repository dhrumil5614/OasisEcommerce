import api from './api';

// Get cart
export const getCart = async (token) => {
  const response = await api.get('/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add to cart
export const addToCart = async (data, token) => {
  const response = await api.post('/cart', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update cart item
export const updateCartItem = async (productId, quantity, token) => {
  const response = await api.put(`/cart/${productId}`, { quantity }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Remove from cart
export const removeFromCart = async (productId, token) => {
  const response = await api.delete(`/cart/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Clear cart
export const clearCart = async (token) => {
  const response = await api.delete('/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
