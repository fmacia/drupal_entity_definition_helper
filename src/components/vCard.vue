<script setup>
const props = defineProps({
  stacked: Boolean,
})
</script>

<template>
  <div class="rounded p-6 shadow dark:shadow-black shadow-neutral-400" :class="{ 'dark:bg-neutral-700 bg-neutral-100': stacked, 'dark:bg-neutral-800 bg-neutral-200': !stacked }">
    <slot></slot>
  </div>
</template>
