<template>
  <div class="login-page">
    <div class="panel">
      <h1>Panel inmobiliario</h1>
      <p>Accede con tu usuario corporativo.</p>
      <form @submit.prevent="onSubmit" class="form">
        <label>Email</label>
        <input v-model="form.email" class="input" type="email" required />
        <label>Contraseña</label>
        <input v-model="form.password" class="input" type="password" required />
        <Button type="submit" :disabled="auth.loading">{{ auth.loading ? 'Accediendo...' : 'Entrar' }}</Button>
        <p v-if="auth.error" class="error">{{ auth.error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store.js';
import Button from '../components/ui/Button.vue';

const router = useRouter();
const auth = useAuthStore();

const form = reactive({ email: 'admin@demo.com', password: 'admin123' });

const onSubmit = async () => {
  try {
    await auth.login(form);
    router.push('/');
  } catch (error) {
    // handled in store
  }
};
</script>

<style scoped>
.login-page { min-height: 100vh; display: grid; place-items: center; background: radial-gradient(circle at 10% 20%, rgba(34,211,238,0.08), transparent 25%), radial-gradient(circle at 90% 10%, rgba(99,102,241,0.12), transparent 25%), var(--bg); }
.panel { background: var(--bg-card); padding: 2rem; border-radius: 1.2rem; width: min(420px, 92vw); border: 1px solid var(--border); box-shadow: 0 25px 60px rgba(0,0,0,0.3); }
.form { display: grid; gap: 0.8rem; margin-top: 1rem; }
.error { color: #f87171; }
</style>
