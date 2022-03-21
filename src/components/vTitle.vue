<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String
})

const classObject = computed(() => ({
  'font-bold text-3xl mb-8': props.type == 'h1',
  'inline text-2xl font-bold border-b-2 dark:border-b-yellow-300 border-sky-400': props.type == 'h2',
  'text-xl font-bold mb-4': props.type == 'h3',
  'text-lg font-bold': props.type == 'h4',
}))
</script>

<template>

  <component :is="props.type" :class="classObject">
    <slot></slot>
  </component>

</template>
