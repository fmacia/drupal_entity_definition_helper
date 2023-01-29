<script setup>
import { computed } from "vue"

const props = defineProps({
  type: String,
  border: {
    type: Boolean,
    default: true,
  },
})

const classObject = computed(() => ({
  "font-bold text-xl md:text-3xl": props.type == "h1",
  "text-xl md:text-2xl font-bold": props.type == "h2",
  "text-lg md:text-xl font-bold md:mb-8": props.type == "h3",
  "text-lg font-bold": props.type == "h4",
  "font-bold mb-4": props.type == "h5",
  "w-fit border-b-2 border-sky-700": props.border == true,
}))
</script>

<template>
  <component :is="props.type" :class="classObject">
    <slot></slot>
  </component>
</template>
