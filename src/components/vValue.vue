<script setup>
// Props
const props = defineProps({
  label: String,
  value: String|Number,
  hideEmpty: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div v-if="!hideEmpty || value">
    <span class="font-bold">{{ label }}:</span>

    {{ value }}
  </div>
</template>
