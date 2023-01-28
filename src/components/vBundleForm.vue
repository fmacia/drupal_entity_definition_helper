<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import vGrid from "./vGrid.vue"
import vButton from "./vButton.vue"

// Props
const props = defineProps({
  bundleKey: Number,
  modelValue: Boolean,
})

const emit = defineEmits(["update:modelValue"])

// Data
const store = useStore()

let emptyBundle = {
  machineName: "",
  label: "",
  description: "",
  urlPattern: "",
  translatable: "",
  fields: [],
}

const bundle =
  props.bundleKey !== undefined
    ? { ...store.state.node[props.bundleKey] }
    : emptyBundle

// Methods
const save = () => {
  props.bundleKey !== undefined
    ? store.commit("setBundle", { bundleKey: props.bundleKey, bundle })
    : store.commit("addBundle", bundle)

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
          v-model="bundle.label"
          required
        />
      </label>

      <label>
        <div>Machine name *</div>
        <input
          class="w-full dark:bg-transparent"
          type="text"
          v-model="bundle.machineName"
          required
        />
      </label>

      <label>
        <div>URL Pattern</div>
        <input
          class="w-full dark:bg-transparent"
          type="text"
          v-model="bundle.urlPattern"
        />
      </label>

      <label class="flex items-center gap-x-4">
        <input type="checkbox" v-model="bundle.translatable" />
        <span>Translatable</span>
      </label>
    </vGrid>

    <label class="block mt-8">
      <div>Description</div>
      <textarea
        class="w-full dark:bg-transparent"
        v-model="bundle.description"
      ></textarea>
    </label>

    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <vButton variant="submit">Save</vButton>
      <vButton variant="outline" @click.prevent="cancel">Cancel</vButton>
    </div>
  </form>
</template>
