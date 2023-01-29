<script setup>
const props = defineProps({
  show: Boolean,
})
</script>

<template>
  <GDialog max-width="700px" v-model="show">
    <div
      class="p-4 dark:bg-neutral-800 bg-neutral-200 border-2 border-black rounded"
    >
      <slot></slot>
    </div>
  </GDialog>
</template>
