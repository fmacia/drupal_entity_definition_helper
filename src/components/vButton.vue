<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
})
</script>

<template>
  <a
    href="#"
    class="block w-fit rounded py-4 px-6 font-bold"
    :class="{
      'bg-red-700': variant === 'danger',
      'bg-sky-700': variant === 'default',
      'border-2 border-sky-700 text-black dark:text-white': variant === 'outline',
      'text-white': variant !== 'outline',
    }"
  >
    <slot></slot>
  </a>
</template>
