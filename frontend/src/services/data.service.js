import api from './api.js';

const buildCrud = (base) => ({
  list: async (params = {}) => (await api.get(`/${base}`, { params })).data,
  create: async (payload) => (await api.post(`/${base}`, payload)).data,
  update: async (id, payload) => (await api.patch(`/${base}/${id}`, payload)).data
});

export const clientesApi = buildCrud('clientes');
export const solicitudesApi = buildCrud('solicitudes');
export const citasApi = buildCrud('citas');
export const inmueblesApi = buildCrud('inmuebles');
