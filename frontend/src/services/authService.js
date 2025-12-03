import api from './api';

// Register user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);

  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Login user
export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);

  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Get user profile
export const getProfile = async (token) => {
  const response = await api.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// Update profile
export const updateProfile = async (userData, token) => {
  const response = await api.put('/auth/profile', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('user');
};
