<script setup>
import { computed, ref } from "vue"
import moonIcon from "../assets/moon.svg?component"
import sunIcon from "../assets/sun.svg?component"
import vSidebar from "./vSidebar.vue"
import vTitle from "./vTitle.vue"

const theme = ref(localStorage.theme)

const themeDark = computed(() => theme.value == "dark")

const toggle = () => {
  if (localStorage.theme == "light") {
    localStorage.theme = "dark"
    theme.value = "dark"
    document.documentElement.classList.add("dark")
  } else {
    localStorage.theme = "light"
    theme.value = "light"
    document.documentElement.classList.remove("dark")
  }
}
</script>

<template>
  <header
    class="z-30 flex items-center justify-between fixed top-0 w-full shadow dark:shadow-black shadow-neutral-400 bg-sky-700 text-white p-4"
  >
    <vTitle class="flex-grow" type="h1" :border="false">
      Drupal Entity Definition Helper
    </vTitle>

    <a
      href="#"
      class="rounded-full p-0.5 hover:bg-black hover:bg-opacity-20 transition-colors duration-300 mr-4"
      title="Toggle theme"
      aria-label="Toggle theme"
      @click.prevent="toggle"
      @keyup.enter="toggle"
    >
      <moonIcon class="h-6 w-6" v-if="themeDark" />
      <sunIcon class="h-6 w-6" v-else />
    </a>

    <vSidebar />
  </header>
</template>
