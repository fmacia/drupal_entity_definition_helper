<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
  border: {
    type: Boolean,
    default: true,
  },
})

const classObject = computed(() => ({
  'font-bold text-3xl mb-8': props.type == 'h1',
  'text-2xl font-bold': props.type == 'h2',
  'text-xl font-bold mb-8': props.type == 'h3',
  'text-lg font-bold': props.type == 'h4',
  'font-bold mb-4': props.type == 'h5',
  'w-fit border-b-2 dark:border-b-yellow-300 border-sky-400': props.border == true,
}))
</script>

<template>

  <component :is="props.type" :class="classObject">
    <slot></slot>
  </component>

</template>
