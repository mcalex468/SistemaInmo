<template>
  <div class="tabs">
    <button v-for="tab in visibleTabs" :key="tab.key" :class="['tab', { active: currentTab === tab.key } ]" @click="switchTab(tab.key)">{{ tab.label }}</button>
  </div>

  <Card :title="tabTitle">
    <div class="actions">
      <input class="input" v-model="filters.search" placeholder="Buscar" v-if="showSearch" @input="loadData" />
      <Button @click="openForm()">Añadir</Button>
    </div>
    <TableSimple :columns="columns[currentTab]" :rows="data[currentTab]" :has-actions="true">
      <template #actions="{ row }">
        <button class="link" @click="openForm(row)">Editar</button>
      </template>
    </TableSimple>
  </Card>

  <Modal :open="modalOpen" :title="modalTitle" @close="modalOpen=false">
    <form class="form" @submit.prevent="save">
      <div class="form-row">
        <div v-for="field in formFields" :key="field.key">
          <label>{{ field.label }}</label>
          <input v-if="field.type !== 'textarea'" class="input" v-model="form[field.key]" :type="field.type || 'text'" />
          <textarea v-else class="input" rows="3" v-model="form[field.key]"></textarea>
        </div>
      </div>
      <div style="margin-top:1rem; display:flex; justify-content:flex-end; gap:0.5rem;">
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  </Modal>

  <div v-if="toast" class="toast">{{ toast }}</div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import Modal from '../components/ui/Modal.vue';
import TableSimple from '../components/ui/TableSimple.vue';
import { clientesApi, solicitudesApi, citasApi, inmueblesApi } from '../services/data.service.js';
import { useAuthStore } from '../stores/auth.store.js';

const auth = useAuthStore();
const currentTab = ref('clientes');
const modalOpen = ref(false);
const form = reactive({});
const editingId = ref(null);
const toast = ref('');
const filters = reactive({ search: '' });

const columns = {
  clientes: [
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'prioridad', label: 'Prioridad' }
  ],
  solicitudes: [
    { key: 'request_id', label: 'ID' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'zona', label: 'Zona' },
    { key: 'presupuesto_max', label: 'Presupuesto' }
  ],
  citas: [
    { key: 'appointment_id', label: 'ID' },
    { key: 'fecha_hora', label: 'Fecha' },
    { key: 'estado', label: 'Estado' },
    { key: 'agente', label: 'Agente' }
  ],
  inmuebles: [
    { key: 'ref', label: 'Ref' },
    { key: 'tipo_operacion', label: 'Operación' },
    { key: 'zona', label: 'Zona' },
    { key: 'precio', label: 'Precio' }
  ]
};

const formSchema = {
  clientes: [
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'prioridad', label: 'Prioridad' },
    { key: 'estado_lead', label: 'Estado lead' }
  ],
  solicitudes: [
    { key: 'request_id', label: 'ID solicitud' },
    { key: 'lead_id', label: 'Lead ID' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'zona', label: 'Zona' },
    { key: 'presupuesto_max', label: 'Presupuesto máximo', type: 'number' }
  ],
  citas: [
    { key: 'appointment_id', label: 'ID cita' },
    { key: 'lead_id', label: 'Lead ID' },
    { key: 'fecha_hora', label: 'Fecha', type: 'datetime-local' },
    { key: 'estado', label: 'Estado' },
    { key: 'agente', label: 'Agente' }
  ],
  inmuebles: [
    { key: 'ref', label: 'Referencia' },
    { key: 'tipo_operacion', label: 'Operación' },
    { key: 'tipo_inmueble', label: 'Tipo inmueble' },
    { key: 'zona', label: 'Zona' },
    { key: 'precio', label: 'Precio', type: 'number' }
  ]
};

const data = reactive({ clientes: [], solicitudes: [], citas: [], inmuebles: [] });

const tabTitle = computed(() => visibleTabs.find(t => t.key === currentTab.value)?.label || '');
const modalTitle = computed(() => `${editingId.value ? 'Editar' : 'Crear'} ${tabTitle.value}`);
const formFields = computed(() => formSchema[currentTab.value] || []);
const showSearch = computed(() => ['clientes', 'inmuebles'].includes(currentTab.value));

const visibleTabs = computed(() => {
  const base = [
    { key: 'clientes', label: 'Clientes' },
    { key: 'solicitudes', label: 'Solicitudes' },
    { key: 'citas', label: 'Citas' }
  ];
  if (auth.user?.role === 'admin') base.push({ key: 'inmuebles', label: 'Inmuebles' });
  return base;
});

const apiMap = {
  clientes: clientesApi,
  solicitudes: solicitudesApi,
  citas: citasApi,
  inmuebles: inmueblesApi
};

const loadData = async () => {
  const tab = currentTab.value;
  const api = apiMap[tab];
  data[tab] = await api.list(filters.search ? { search: filters.search } : {});
};

const switchTab = (key) => {
  currentTab.value = key;
  loadData();
};

const openForm = (row = null) => {
  editingId.value = row?.id || null;
  formFields.value.forEach(f => { form[f.key] = row?.[f.key] || ''; });
  modalOpen.value = true;
};

const save = async () => {
  const tab = currentTab.value;
  const api = apiMap[tab];
  if (editingId.value) {
    await api.update(editingId.value, { ...form });
  } else {
    await api.create({ ...form });
  }
  modalOpen.value = false;
  editingId.value = null;
  showToast('Guardado correctamente');
  loadData();
};

const showToast = (msg) => {
  toast.value = msg;
  setTimeout(() => toast.value = '', 2500);
};

onMounted(() => loadData());
</script>

<style scoped>
.tabs { display: flex; gap: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { border: 1px solid var(--border); background: var(--bg-card); color: var(--text); padding: 0.55rem 0.9rem; border-radius: 0.8rem; cursor: pointer; }
.tab.active { background: linear-gradient(90deg, rgba(34,211,238,0.25), rgba(99,102,241,0.35)); border-color: transparent; }
.actions { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap; }
.link { background: transparent; border: none; color: var(--primary); cursor: pointer; }
.form { display: grid; gap: 0.8rem; }
</style>
