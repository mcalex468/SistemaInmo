<template>
  <Card title="Notificaciones">
    <ul class="list">
      <li v-for="n in notifications" :key="n.descripcion" class="item">
        <Badge :label="n.tipo" />
        <div>
          <strong>{{ n.titulo }}</strong>
          <p class="muted">{{ n.descripcion }}</p>
        </div>
      </li>
      <li v-if="!notifications.length" class="muted">Sin notificaciones activas</li>
    </ul>
  </Card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Card from '../components/ui/Card.vue';
import Badge from '../components/ui/Badge.vue';
import { fetchNotifications } from '../services/metrics.service.js';

const notifications = ref([]);

const load = async () => {
  notifications.value = await fetchNotifications();
};

onMounted(load);
</script>

<style scoped>
.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.9rem; }
.item { display: flex; gap: 0.7rem; }
.muted { color: var(--muted); }
</style>
