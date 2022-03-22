<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import vGrid from './vGrid.vue'
import vButton from './vButton.vue'

// Props
const props = defineProps({
  bundleKey: Number,
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

// Data
const store = useStore()

let emptyBundle = {
  name: '',
  label: '',
  description: '',
  urlPattern: '',
  translatable: '',
  fields: []
}

const bundle = props.bundleKey !== undefined
  ? { ...store.state.node[props.bundleKey] }
  : emptyBundle

// Methods
const save = () => {
  props.bundleKey !== undefined
    ? store.commit('setBundle', { bundleKey: props.bundleKey, bundle })
    : store.commit('addBundle', bundle)

  emit('update:modelValue', false)
}
</script>

<template>
  <div class="space-y-8">
    <vGrid cols-md="2" cols-lg="2">
      <label>
        <div>Label:</div>
        <input class="dark:bg-transparent" type="text" v-model="bundle.label" >
      </label>

      <label>
        <div>Machine name:</div>
        <input class="dark:bg-transparent" type="text" v-model="bundle.name">
      </label>

      <label>
        <div>URL Pattern:</div>
        <input class="dark:bg-transparent" type="text" v-model="bundle.urlPattern">
      </label>

      <label class="space-x-4">
        <span>Translatable:</span>
        <input class="dark:bg-transparent" type="checkbox" v-model="bundle.translatable">
      </label>

      <label>
        <div>Description:</div>
        <textarea class="dark:bg-transparent" v-model="bundle.description"></textarea>
      </label>
    </vGrid>

    <div class="flex justify-center">
      <vButton @click.prevent="save">Save</vButton>
    </div>
  </div>
</template>
