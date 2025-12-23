<template>
  <button class="btn" :class="variant" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
const variant = 'solid';
</script>

<style scoped>
.btn {
  border: none;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  font-weight: 600;
  background: var(--secondary);
  color: white;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.btn:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(99,102,241,0.3); }
.btn:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; transform: none; }
</style>
