<template>
  <div class="grid cols-2">
    <Card title="Resumen rápido">
      <div class="metrics">
        <div v-for="item in metricList" :key="item.key" class="metric">
          <p class="label">{{ item.label }}</p>
          <h2>{{ metrics[item.key] ?? '—' }}</h2>
        </div>
      </div>
    </Card>
    <Card title="Ahorro estimado">
      <div class="metrics">
        <div class="metric">
          <p class="label">Minutos ahorrados</p>
          <h2>{{ metrics.minutos_ahorrados ?? '—' }}</h2>
        </div>
        <div class="metric">
          <p class="label">Euros ahorrados</p>
          <h2>{{ metrics.euros_ahorrados ?? '—' }}€</h2>
        </div>
      </div>
    </Card>
  </div>

  <div class="grid cols-2" style="margin-top: 1rem;">
    <Card title="Notificaciones recientes">
      <ul class="list">
        <li v-for="n in notifications" :key="n.descripcion">
          <Badge :label="n.tipo" />
          <div>
            <strong>{{ n.titulo }}</strong>
            <p class="muted">{{ n.descripcion }}</p>
          </div>
        </li>
        <li v-if="!notifications.length" class="muted">Sin notificaciones</li>
      </ul>
    </Card>
    <Card title="Rango temporal">
      <div class="filters">
        <button v-for="r in ranges" :key="r" :class="['chip', { active: range === r } ]" @click="range = r; load();">{{ r }}</button>
      </div>
      <p class="muted">Actualizado con datos de Airtable.</p>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Card from '../components/ui/Card.vue';
import Badge from '../components/ui/Badge.vue';
import { fetchMetrics, fetchNotifications } from '../services/metrics.service.js';

const metrics = reactive({});
const notifications = ref([]);
const range = ref('today');
const ranges = ['today', 'week', 'month'];

const metricList = [
  { key: 'leads_nuevos', label: 'Leads nuevos' },
  { key: 'leads_cualificados', label: 'Leads cualificados' },
  { key: 'solicitudes_nuevas', label: 'Solicitudes nuevas' },
  { key: 'citas_creadas', label: 'Citas creadas' },
  { key: 'citas_confirmadas', label: 'Citas confirmadas' },
  { key: 'pendientes_accion', label: 'Pendientes acción' }
];

const load = async () => {
  Object.assign(metrics, await fetchMetrics(range.value));
  notifications.value = await fetchNotifications();
};

onMounted(load);
</script>

<style scoped>
.metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; }
.metric { background: var(--bg-elevated); padding: 0.9rem; border-radius: 0.8rem; border: 1px solid var(--border); }
.label { color: var(--muted); margin: 0 0 0.2rem 0; }
.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.8rem; }
.list li { display: flex; gap: 0.7rem; align-items: flex-start; }
.muted { color: var(--muted); margin: 0; }
.filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.chip { background: var(--bg-elevated); color: var(--text); border: 1px solid var(--border); border-radius: 999px; padding: 0.4rem 0.9rem; cursor: pointer; }
.chip.active { background: linear-gradient(90deg, rgba(34,211,238,0.25), rgba(99,102,241,0.35)); border-color: transparent; }
</style>
