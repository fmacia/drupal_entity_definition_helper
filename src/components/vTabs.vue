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
    <ul :class="{'flex flex-wrap sm:flex-nowrap gap-y-2 mb-6': variant === 'horizontal' }">
      <li class="w-full text-center" v-for="(tab, index) in tabList" :key="index">
        <a href="#" class="block w-full" :class="{ 'border-sky-700 border-b-2': index === activeTab }" @click.prevent="activeTab = index">
          {{ tab }}
        </a>
      </li>
    </ul>

    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index === activeTab">
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>
