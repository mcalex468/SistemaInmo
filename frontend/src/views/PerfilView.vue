<template>
  <Card title="Mi perfil">
    <form class="form" @submit.prevent="save">
      <label>Nombre</label>
      <input class="input" v-model="form.name" />
      <label>Nueva contraseña (opcional)</label>
      <input class="input" v-model="form.password" type="password" />
      <div style="display:flex; gap:0.6rem; margin-top:0.6rem;">
        <Button type="submit">Guardar cambios</Button>
        <span v-if="message" class="muted">{{ message }}</span>
      </div>
    </form>
  </Card>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import { useAuthStore } from '../stores/auth.store.js';

const auth = useAuthStore();
const form = reactive({ name: auth.user?.name || '', password: '' });
const message = ref('');

const save = async () => {
  await auth.updateMe({ ...form });
  message.value = 'Perfil actualizado';
  form.password = '';
  setTimeout(() => message.value = '', 2000);
};
</script>

<style scoped>
.muted { color: var(--muted); }
</style>
