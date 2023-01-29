<script setup>
import { ref } from "vue"
import { useStore } from "vuex"
import YAML from "yaml"
import vButton from "./vButton.vue"

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(["update:modelValue"])

const store = useStore()
const value = ref("")
const errors = ref([])

// Methods
const save = () => {
  let parsedValues = null
  errors.value = []

  try {
    parsedValues = YAML.parse(value.value)
  } catch (err) {
    errors.value.push("Error parsing the content. Please check it is correct.")
    return
  }

  if (!Array.isArray(parsedValues)) {
    errors.value.push("Wrong structure. Cannot import data.")
    return
  }

  if (!validateBundles(parsedValues)) {
    return
  }

  value.value = ""
  store.commit("import", newBundles(parsedValues))
  emit("update:modelValue", false)
}

const validateBundles = (parsedValues) => {
  Object.keys(parsedValues).forEach((key) => {
    if (!parsedValues[key]["label"] || null) {
      errors.value.push(`Label missing in bundle ${key}`)
    }
    if (!parsedValues[key]["machineName"] || null) {
      errors.value.push(`Machine name missing in bundle ${key}`)
    }

    Object.keys(parsedValues[key]["fields"]).forEach((fieldKey) => {
      if (!parsedValues[key]["fields"][fieldKey]["label"] || null) {
        errors.value.push(`Label missing in bundle ${key}, field ${fieldKey}`)
      }
      if (!parsedValues[key]["fields"][fieldKey]["machineName"] || null) {
        errors.value.push(`Machine name missing in bundle ${key}, field ${fieldKey}`)
      }
      if (!parsedValues[key]["fields"][fieldKey]["type"] || null) {
        errors.value.push(`Type missing in bundle ${key}, field ${fieldKey}`)
      }
      if (!parsedValues[key]["fields"][fieldKey]["cardinality"] || null) {
        errors.value.push(`Number of values name missing in bundle ${key}, field ${fieldKey}`)
      }
    })
  })

  return !errors.value.length
}

const newBundles = (parsedValues) => {
  let bundles = []
  Object.keys(parsedValues).forEach((key) => {
    let fields = []
    Object.keys(parsedValues[key]["fields"]).forEach((fieldKey) => {
      fields.push({
        machineName: parsedValues[key]["fields"][fieldKey]["machineName"],
        label: parsedValues[key]["fields"][fieldKey]["label"],
        type: parsedValues[key]["fields"][fieldKey]["type"],
        required: parsedValues[key]["fields"][fieldKey]["required"] || false,
        defaultValue: parsedValues[key]["fields"][fieldKey]["defaultValue"] | "",
        translatable: parsedValues[key]["fields"][fieldKey]["translatable"] || false,
        cardinality: parsedValues[key]["fields"][fieldKey]["cardinality"] || 1,
        description: parsedValues[key]["fields"][fieldKey]["description"] || "",
      })
    })

    bundles.push({
      machineName: parsedValues[key]["machineName"],
      label: parsedValues[key]["label"],
      urlPattern: parsedValues[key]["urlPattern"] || "",
      translatable: parsedValues[key]["translatable"] || false,
      description: parsedValues[key]["description"] || "",
      fields: fields,
    })
  })

  return bundles
}

const cancel = () => {
  emit("update:modelValue", false)
}
</script>

<template>
  <form @submit.prevent="save">
    <label>
      <div class="mb-4">
        Paste the structure into the text area below and press save to import it.
      </div>
      <div class="mb-4">The format can be YAML or JSON.</div>
      <div class="mb-4">Please be aware that the current structure will be overwritten!</div>
      <textarea
        class="mt-6 w-full dark:bg-transparent"
        v-model="value"
        required
        rows="6"
      ></textarea>

      <div class="mt-8" v-if="errors.length">⚠️ <span class="underline">Errors:</span></div>
      <ol class="list-decimal list-inside">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ol>
    </label>

    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <vButton variant="submit">Import</vButton>
      <vButton variant="outline" @click.prevent="cancel">Cancel</vButton>
    </div>
  </form>
</template>
