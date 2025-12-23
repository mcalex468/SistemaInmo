<template>
  <div :class="['app-shell', { 'is-auth': isAuthenticated }]">
    <Sidebar v-if="isAuthenticated" />
    <div class="main-area">
      <Topbar v-if="isAuthenticated" />
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/layout/Sidebar.vue';
import Topbar from './components/layout/Topbar.vue';
import { useAuthStore } from './stores/auth.store.js';

const auth = useAuthStore();
const isAuthenticated = computed(() => auth.isAuthenticated);
</script>
