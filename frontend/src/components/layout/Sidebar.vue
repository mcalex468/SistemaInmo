<template>
  <aside class="sidebar" :class="{ open: open }">
    <div class="brand">InmoPanel</div>
    <nav>
      <RouterLink to="/" class="item" active-class="active">Dashboard</RouterLink>
      <RouterLink to="/datos" class="item" active-class="active">Datos</RouterLink>
      <RouterLink to="/notificaciones" class="item" active-class="active">Notificaciones</RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const open = ref(true);

onMounted(() => {
  if (window.innerWidth < 900) open.value = false;
});
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  padding: 1.25rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.brand { font-weight: 800; letter-spacing: 0.04em; }
nav { display: grid; gap: 0.35rem; }
.item { padding: 0.65rem 0.8rem; border-radius: 0.65rem; color: var(--muted); }
.item:hover { background: rgba(255,255,255,0.04); color: var(--text); }
.active { background: linear-gradient(90deg, rgba(34,211,238,0.2), rgba(99,102,241,0.2)); color: #fff; }

@media (max-width: 900px) {
  .sidebar { position: fixed; z-index: 25; transform: translateX(-100%); transition: transform 0.2s ease; }
  .sidebar.open { transform: translateX(0); }
}
</style>
