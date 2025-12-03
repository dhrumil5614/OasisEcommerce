import api from './api';

// Create order
export const createOrder = async (orderData, token) => {
  const response = await api.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get my orders
export const getMyOrders = async (token) => {
  const response = await api.get('/orders/myorders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get order by ID
export const getOrderById = async (id, token) => {
  const response = await api.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update order to paid
export const updateOrderToPaid = async (id, paymentResult, token) => {
  const response = await api.put(`/orders/${id}/pay`, paymentResult, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
