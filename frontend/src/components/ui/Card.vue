<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <h3>{{ title }}</h3>
      <slot name="actions" />
    </header>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ title: String });
</script>

<style scoped>
.card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 1rem; padding: 1.1rem; box-shadow: 0 15px 40px rgba(0,0,0,0.2); }
.card-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
.card-header h3 { margin: 0; font-size: 1.05rem; }
</style>
