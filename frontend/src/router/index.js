import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import DatosView from '../views/DatosView.vue';
import NotificacionesView from '../views/NotificacionesView.vue';
import PerfilView from '../views/PerfilView.vue';
import { useAuthStore } from '../stores/auth.store.js';

const routes = [
  { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/datos', name: 'datos', component: DatosView },
  { path: '/notificaciones', name: 'notificaciones', component: NotificacionesView },
  { path: '/perfil', name: 'perfil', component: PerfilView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (!to.meta.public && !auth.isAuthenticated) {
    return next('/login');
  }
  if (to.path === '/login' && auth.isAuthenticated) {
    return next('/');
  }
  return next();
});

export default router;
