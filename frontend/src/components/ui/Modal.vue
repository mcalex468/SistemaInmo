<template>
  <Teleport to="body" v-if="open">
    <div class="modal-backdrop" @click="emit('close')">
      <div class="modal-body" @click.stop>
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close" @click="emit('close')">×</button>
        </header>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { Teleport } from 'vue';

const props = defineProps({
  open: Boolean,
  title: String
});
const emit = defineEmits(['close']);
</script>

<style scoped>
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.modal-header h3 { margin: 0; }
.close { background: transparent; border: none; color: var(--text); font-size: 1.3rem; cursor: pointer; }
</style>
