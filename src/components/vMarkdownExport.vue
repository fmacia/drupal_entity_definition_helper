<script setup>
import { computed } from 'vue'
import { useStore } from "vuex"
import copyClipboard from '../helpers/copyClipboard'
import vButton from "./vButton.vue"

// Props
const props = defineProps({
  data: Object,
})

// Data
const store = useStore()

// Methods
const processData = (data) => {
  return data.map((item) => {
    const fields = item.fields
    const label = item.label
    const filteredData = Object.fromEntries(
      Object.entries(item).filter(
        ([key, val]) => key != "fields" && key != "label"
      )
    )

    let exportData = [`## ${label}`, ""]
    // Normal data
    exportData = exportData.concat(
      Object.keys(filteredData).map(
        (key) =>
          `- **${store.getters.translateLabel(key)}:** ${filteredData[key]}`
      )
    )
    // Fields
    exportData.push("")
    exportData.push("### Fields")
    exportData.push("")
    exportData = exportData.concat(
      fields.map((value) => processField(value).join("\n"))
    )
    exportData.push("")
    return exportData.join("\n")
  }).join("\n")
}

const processField = (field) => {
  const label = field.label
  const filteredField = Object.fromEntries(
    Object.entries(field).filter(([key, val]) => key != "label")
  )
  let processedField = [`- **${label}:**`]
  const fieldData = Object.keys(filteredField).map(
    (key) => `    - **${store.getters.translateLabel(key)}:** ${filteredField[key]}`
  )
  return processedField.concat(fieldData)
}

const processedData = computed(() => processData(props.data))
</script>

<template>
  <highlightjs
    :autodetect="false"
    language="markdown"
    :code="processedData"
  />

  <div class="flex justify-center mt-4">
    <vButton @click="copyClipboard(processedData)">
      Copy code
    </vButton>
  </div>
</template>
