<script setup>
import { computed, ref } from 'vue'
import vCard from './vCard.vue'
import sunIcon from '../assets/sun.svg?component'
import moonIcon from '../assets/moon.svg?component'

  const theme = ref(localStorage.theme)

  const themeDark = computed(() => theme.value == 'dark')

  const toggle = () => {
    if (localStorage.theme == 'light') {
      localStorage.theme = 'dark'
      theme.value = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      theme.value = 'light'
      document.documentElement.classList.remove('dark')
    }
  }
</script>

<template>
  <div class="flex justify-end">
    <vCard
      class="cursor-pointer"
      tabindex="0"
      aria-label="Toggle theme"
      @click="toggle"
      @keyup.enter="toggle"
    >
      <div href="#" class="block w-6 h-6 text-white" v-if="themeDark">
        <sunIcon />
      </div>
      <div href="#" class="block w-6 h-6 text-black" v-else>
        <moonIcon />
      </div>
    </vCard>
  </div>
</template>
