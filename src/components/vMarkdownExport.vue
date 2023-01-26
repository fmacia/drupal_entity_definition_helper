<script setup>
import { useStore } from "vuex"

// Props
const props = defineProps({
  data: Object,
})

// Data
const store = useStore()

// Methods
const printData = (data, indent = "") => {
  data = JSON.parse(JSON.stringify(data))

  return processData(data).join("\n")
}

const processData = (data) => {
  const fields = data.fields
  const label = data.label
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([key, val]) => key != "fields" && key != "label"
    )
  )

  let exportData = ["## " + label, ""]
  // Normal data
  exportData = exportData.concat(
    Object.keys(filteredData).map(
      (key) =>
        "- **" + store.getters.translateLabel(key) + ":** " + filteredData[key]
    )
  )
  // Fields
  exportData.push("")
  exportData.push("### Fields:")
  exportData.push("")
  exportData = exportData.concat(
    fields.map((value) => processField(value).join("\n"))
  )
  return exportData
}

const processField = (field) => {
  const label = field.label
  const filteredField = Object.fromEntries(
    Object.entries(field).filter(([key, val]) => key != "label")
  )
  let processedField = ["- **" + label + ":**"]
  const fieldData = Object.keys(filteredField).map(
    (key) =>
      "    - **" +
      store.getters.translateLabel(key) +
      ":** " +
      filteredField[key]
  )
  return processedField.concat(fieldData)
}
</script>

<template>
  <highlightjs
    :autodetect="false"
    language="markdown"
    :code="printData(data)"
  />
</template>
