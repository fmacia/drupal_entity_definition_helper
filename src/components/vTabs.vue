<script setup>
import { ref } from "vue"

const props = defineProps({
  tabList: {
    type: Array,
    required: true,
  },

  variant: {
    type: String,
    required: false,
    default: () => "horizontal",
    validator: (value) => ["horizontal", "vertical"].includes(value),
  },
})

const activeTab = ref(0)
</script>

<template>
  <div :class="{ 'flex': variant === 'vertical' }">
    <div class="text-center overflow-auto whitespace-nowrap">
      <a href="#" class="inline-block text-center px-6 py-2 mb-6" v-for="(tab, index) in tabList" :key="index" :class="{ 'border-sky-700 border-b-2': index === activeTab }" @click.prevent="activeTab = index">
        {{ tab }}
      </a>
    </div>

    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index === activeTab">
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>
