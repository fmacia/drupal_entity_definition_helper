<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import vGrid from "./vGrid.vue"
import vButton from "./vButton.vue"

// Props
const props = defineProps({
  bundleKey: Number,
  fieldKey: Number,
  modelValue: Boolean,
})

const emit = defineEmits(["update:modelValue"])

// Data
const store = useStore()

let emptyField = {
  machineName: "",
  label: "",
  description: "",
  required: false,
  defaultValue: "",
  translatable: false,
  type: "",
  cardinality: 1,
}

const field =
  props.bundleKey !== undefined && props.fieldKey !== undefined
    ? { ...store.state.node[props.bundleKey].fields[props.fieldKey] }
    : emptyField

// Methods
const save = () => {
  props.bundleKey !== undefined && props.fieldKey !== undefined
    ? store.commit("setField", {
        bundleKey: props.bundleKey,
        fieldKey: props.fieldKey,
        field,
      })
    : store.commit("addField", { bundleKey: props.bundleKey, field })

  emit("update:modelValue", false)
}

const cancel = () => {
  emit("update:modelValue", false)
}
</script>

<template>
  <form @submit.prevent="save">
    <vGrid cols-md="2" cols-lg="2">
      <label>
        <div>Label *</div>
        <input
          class="w-full dark:bg-transparent"
          type="text"
          v-model="field.label"
          required
        />
      </label>

      <label>
        <div>Machine name *</div>
        <input
          class="w-full dark:bg-transparent"
          type="text"
          v-model="field.machineName"
          required
        />
      </label>

      <label>
        <div>Type *</div>
        <input
          class="w-full dark:bg-transparent"
          type="text"
          v-model="field.type"
          required
        />
      </label>

      <label>
        <div>Number of values *</div>
        <input
          class="w-full dark:bg-transparent"
          type="number"
          v-model="field.cardinality"
          required
          min="-1"
        />
      </label>

      <label class="flex items-center gap-x-4">
        <input type="checkbox" v-model="field.required" />
        <span>Required</span>
      </label>

      <label>
        <div>Default value</div>
        <input
          class="w-full dark:bg-transparent"
          type="text"
          v-model="field.defaultValue"
        />
      </label>

      <label class="flex items-center gap-x-4">
        <input type="checkbox" v-model="field.translatable" />
        <span>Translatable</span>
      </label>
    </vGrid>

    <label class="block mt-8">
      <div>Description</div>
      <textarea
        class="w-full dark:bg-transparent"
        v-model="field.description"
      ></textarea>
    </label>

    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <vButton variant="submit">Save</vButton>
      <vButton variant="outline" @click.prevent="cancel">Cancel</vButton>
    </div>
  </form>
</template>
