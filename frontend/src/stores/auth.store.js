import { defineStore } from 'pinia';
import { loginUser, fetchCurrentUser, updateProfile } from '../services/auth.service.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    loading: false,
    error: ''
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = '';
      try {
        const { token, user } = await loginUser(credentials);
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    async loadSession() {
      if (!this.token) return;
      try {
        this.user = await fetchCurrentUser();
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        this.logout();
      }
    },
    async updateMe(payload) {
      const updated = await updateProfile(payload);
      this.user = updated;
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    }
  }
});
