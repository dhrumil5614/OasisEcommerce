import api from './api';

// Get wishlist
export const getWishlist = async (token) => {
  const response = await api.get('/wishlist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add to wishlist
export const addToWishlist = async (productId, token) => {
  const response = await api.post('/wishlist', { productId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Remove from wishlist
export const removeFromWishlist = async (productId, token) => {
  const response = await api.delete(`/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
