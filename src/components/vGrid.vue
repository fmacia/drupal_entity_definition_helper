<script setup>
import { computed } from 'vue'

const props = defineProps({
  colsMd: String,
  colsLg: String,
})

const gridCols = computed(() => {
  let classes = []

  props.colsMd && classes.push('md:grid-cols-' + props.colsMd)
  props.colsLg && classes.push('lg:grid-cols-' + props.colsLg)

  return classes.join(' ')
})
</script>

<template>
  <div class="grid grid-cols-1 gap-8" :class="gridCols">
    <slot></slot>
  </div>

</template>
