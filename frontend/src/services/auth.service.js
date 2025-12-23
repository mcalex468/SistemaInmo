import api from './api.js';

export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.patch('/auth/me', payload);
  return data;
};
