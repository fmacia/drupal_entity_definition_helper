<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import vGrid from './vGrid.vue'
import vButton from './vButton.vue'

// Props
const props = defineProps({
  bundleKey: Number,
  fieldKey: Number,
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

// Data
const store = useStore()

let emptyField = {
  machineName: '',
  label: '',
  description: '',
  required: false,
  defaultValue: '',
  translatable: false,
  type: '',
}

const field = props.bundleKey !== undefined && props.fieldKey !== undefined
  ? { ...store.state.node[props.bundleKey].fields[props.fieldKey] }
  : emptyField

// Methods
const save = () => {
  props.bundleKey !== undefined && props.fieldKey !== undefined
    ? store.commit('setField', { bundleKey: props.bundleKey, fieldKey: props.fieldKey, field })
    : store.commit('addField', { bundleKey: props.bundleKey, field })

  emit('update:modelValue', false)
}
</script>

<template>
  <div class="space-y-8">
    <vGrid cols-md="2" cols-lg="2">
      <label>
        <div>Label:</div>
        <input class="dark:bg-transparent" type="text" v-model="field.label" >
      </label>

      <label>
        <div>Machine name:</div>
        <input class="dark:bg-transparent" type="text" v-model="field.machineName">
      </label>

      <label>
        <div>Type:</div>
        <input class="dark:bg-transparent" type="text" v-model="field.type">
      </label>

      <label class="space-x-4">
        <span>Required:</span>
        <input class="dark:bg-transparent" type="checkbox" v-model="field.required">
      </label>

      <label class="space-x-4">
        <span>Translatable:</span>
        <input class="dark:bg-transparent" type="checkbox" v-model="field.translatable">
      </label>

      <label>
        <div>Default value:</div>
        <input class="dark:bg-transparent" type="text" v-model="field.defaultValue">
      </label>

      <label>
        <div>Description:</div>
        <textarea class="dark:bg-transparent" v-model="field.description"></textarea>
      </label>
    </vGrid>

    <div class="flex justify-center">
      <vButton @click.prevent="save">Save</vButton>
    </div>
  </div>
</template>
