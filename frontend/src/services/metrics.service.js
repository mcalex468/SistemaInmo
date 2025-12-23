import api from './api.js';

export const fetchMetrics = async (range = 'today') => {
  const { data } = await api.get('/metrics', { params: { range } });
  return data;
};

export const fetchNotifications = async () => {
  const { data } = await api.get('/notificaciones');
  return data;
};
