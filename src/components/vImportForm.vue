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

  if (!validate(parsedValues, store.state.schema.node)) {
    return
  }

  value.value = ""
  store.commit("import", hydrate(parsedValues, store.state.schema.node))
  emit("update:modelValue", false)
}

const validate = (parsedValues, schema, bundleKey = null) => {
  for (let [key, value] of Object.entries(parsedValues)) {
    for (let [requiredKey, requiredValue] of Object.entries(schema)) {
      if (requiredKey == 'fields') {
        validate(value[requiredKey], schema.fields, key)
        continue
      } else if (!requiredValue || value[requiredKey]) {
        continue
      }

      bundleKey
        ? errors.value.push(`${store.getters.translateLabel(requiredKey)} missing in bundle ${parseInt(bundleKey) + 1}, field ${parseInt(key) + 1}`)
        : errors.value.push(`${store.getters.translateLabel(requiredKey)} missing in bundle ${parseInt(key) + 1}`)
    }
  }

  return !errors.value.length
}

const hydrate = (parsedValues, schema, bundleKey = null) => {
  let newValues = []
  for (let [key, value] of Object.entries(parsedValues)) {
    newValues.push({})
    for (let [schemaKey, schemaValue] of Object.entries(schema)) {
      if (schemaKey == 'fields') {
        newValues[key][schemaKey] = hydrate(value[schemaKey], schema.fields, key)
        continue
      }

      newValues[key][schemaKey] = value[schemaKey]
    }
  }

  return newValues
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
        <li class="pl-4" v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ol>
    </label>

    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <vButton variant="submit">Import</vButton>
      <vButton variant="outline" @click.prevent="cancel">Cancel</vButton>
    </div>
  </form>
</template>
