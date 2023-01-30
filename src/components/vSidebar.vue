<script setup>
import { ref, computed } from "vue"
import { useStore } from 'vuex'
import burgerIcon from "../assets/burger.svg?component"
import vExport from "./vExport.vue"
import vImportForm from "./vImportForm.vue"
import vModal from "./vModal.vue"
import vTitle from "./vTitle.vue"

const visible = ref(false)
const showImport = ref(false)
const showExport = ref(false)

const store = useStore()
const data = computed(() => store.state.node)
</script>

<template>
  <a
    href="#"
    class="rounded-full p-0.5 hover:bg-black hover:bg-opacity-20 transition-colors duration-300"
    title="Open menu"
    aria-label="Open menu"
    @click.prevent="visible = true"
  >
    <burgerIcon class="h-6 w-6" />
  </a>

  <div
    class="fixed w-screen bg-black opacity-0 z-20 top-0 right-0 h-screen opacity-50"
    @click="visible = false"
    v-if="visible"
  ></div>

  <aside
    class="w-8/12 lg:w-4/12 fixed top-0 right-0 z-40 h-screen p-10 text-black bg-white dark:bg-neutral-800 dark:text-white transition duration-500 flex flex-col shadow dark:shadow-black"
    :class="{ 'translate-x-full': !visible, 'translate-x-0': visible }"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <vTitle class="flex-grow" type="h2" :border="false"> Menu </vTitle>

      <a
        href="#"
        class="text-4xl hover:text-sky-700 transition-colors duration-300"
        @click.prevent="visible = false"
        title="Close menu"
        aria-label="Close menu"
      >
        &times;
      </a>
    </div>

    <nav>
      <ul class="text-lg">
        <li>
          <a href="#" class="hover:underline" @click.prevent="visible = false; showImport = true">Import data</a>
        </li>
        <li>
          <a href="#" class="hover:underline" @click.prevent="visible = false; showExport = true">Export all</a>
        </li>
      </ul>
    </nav>
  </aside>

  <vModal v-model="showImport">
    <vImportForm v-model="showImport" />
  </vModal>

  <vModal v-model="showExport">
    <vExport :data="data"/>
  </vModal>
</template>
