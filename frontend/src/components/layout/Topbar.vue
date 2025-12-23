<template>
  <header class="topbar">
    <div class="search">
      <span>🔍</span>
      <input type="text" placeholder="Buscar en el panel" v-model="search" />
    </div>
    <div class="user" @click="toggleMenu">
      <img class="avatar" src="https://i.pravatar.cc/40" alt="avatar" />
      <div>
        <div class="name">{{ auth.user?.name }}</div>
        <small class="role">{{ auth.user?.role }}</small>
      </div>
      <span>▾</span>
      <div v-if="open" class="dropdown" @click.stop>
        <RouterLink to="/perfil" class="dropdown-item">Mi perfil</RouterLink>
        <button class="dropdown-item" @click="logout">Cerrar sesión</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth.store.js';

const auth = useAuthStore();
const router = useRouter();
const open = ref(false);
const search = ref('');

const toggleMenu = () => {
  open.value = !open.value;
};

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<style scoped>
.topbar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; position: sticky; top: 0; background: rgba(15,23,42,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); z-index: 20; }
.search { flex: 1; display: flex; align-items: center; gap: 0.6rem; background: var(--bg-card); padding: 0.65rem 0.9rem; border-radius: 0.8rem; border: 1px solid var(--border); max-width: 460px; }
.search input { background: transparent; border: none; outline: none; color: var(--text); width: 100%; }
.user { display: flex; align-items: center; gap: 0.65rem; position: relative; cursor: pointer; padding: 0.4rem 0.7rem; border-radius: 0.8rem; }
.user:hover { background: rgba(255,255,255,0.04); }
.avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--secondary); }
.name { font-weight: 700; }
.role { color: var(--muted); text-transform: capitalize; }
.dropdown { position: absolute; top: 110%; right: 0; background: var(--bg-card); border: 1px solid var(--border); border-radius: 0.75rem; min-width: 160px; box-shadow: 0 15px 35px rgba(0,0,0,0.25); }
.dropdown-item { display: block; width: 100%; text-align: left; padding: 0.7rem 0.9rem; color: var(--text); background: transparent; border: none; cursor: pointer; }
.dropdown-item:hover { background: rgba(255,255,255,0.05); }
</style>
