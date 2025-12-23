<template>
  <span class="badge" :class="type">{{ label }}</span>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: { type: String, default: 'info' }
});
</script>

<style scoped>
.badge { padding: 0.35rem 0.65rem; border-radius: 999px; font-size: 0.8rem; }
.badge.info { background: rgba(34,211,238,0.18); color: #67e8f9; }
.badge.success { background: rgba(16,185,129,0.18); color: #34d399; }
.badge.warning { background: rgba(245,158,11,0.18); color: #fbbf24; }
.badge.danger { background: rgba(239,68,68,0.18); color: #fca5a5; }
</style>
