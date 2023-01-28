<script setup>
import { computed } from "vue"

const props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
})

const classes = computed(() => ({
  "block w-fit rounded py-4 px-6 font-bold": true,
  "bg-red-700": props.variant === "danger",
  "bg-sky-700": props.variant === "default" || props.variant === "submit",
  "border-2 border-sky-700 text-black dark:text-white": props.variant === "outline",
  "text-white": props.variant !== "outline",
}))
</script>

<template>
  <a href="#" :class="classes" v-if="variant != 'submit'">
    <slot></slot>
  </a>

  <button :class="classes" v-else>
    <slot></slot>
  </button>
</template>
