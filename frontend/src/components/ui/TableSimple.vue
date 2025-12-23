<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th v-if="hasActions">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="col in columns" :key="col.key">
            <slot :name="`cell-${col.key}`" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
          <td v-if="hasActions">
            <slot name="actions" :row="row" />
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length + (hasActions ? 1 : 0)" style="text-align:center; color: var(--muted); padding: 1rem;">Sin registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  hasActions: { type: Boolean, default: false }
});
</script>

<style scoped>
.table-wrapper { overflow-x: auto; }
</style>
