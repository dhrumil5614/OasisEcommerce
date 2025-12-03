import api from './api';

// Create payment intent
export const createPaymentIntent = async (amount, token) => {
  const response = await api.post('/payment/create-payment-intent', { amount }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get Stripe config
export const getStripeConfig = async () => {
  const response = await api.get('/payment/config');
  return response.data;
};
