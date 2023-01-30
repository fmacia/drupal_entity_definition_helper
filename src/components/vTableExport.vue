<script setup>
import { computed } from 'vue'
import { useStore } from "vuex"
import prettify from "html-prettify"
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
  data = JSON.parse(JSON.stringify(data))
  const keys = Object.keys(data)
  const keysWithoutFields = keys.filter((key) => key !== "fields")
  let content = "<table>\n<thead>\n<tr>\n"

  // head
  const header = keysWithoutFields.map((key) => {
    return "<th>" + store.getters.translateLabel(key) + "</th>"
  })
  content += header.join("\n")

  content += "\n</tr>\n</thead>\n<tbody>\n<tr>\n"

  // body
  const body = keysWithoutFields.map((key) => {
    return "<td>" + data[key] + "</td>"
  })
  content += body.join("\n") + "\n    </tr>\n"

  // fields
  content +=
    "<tr>\n<th scope='rowgroup' colspan='" +
    keysWithoutFields.length +
    "'>Fields</th>\n</tr>\n"
  const fields = data["fields"].map((value, index) => {
    let row = "<tr>\n"

    if (index === 0) {
      const header = Object.keys(value).map(
        (key) =>
          `<th scope='rowgroup'>${store.getters.translateLabel(key)}</th>`
      )
      row += header.join("\n")
      row += "\n</tr>\n<tr>\n"
    }

    const body = Object.values(value).map((val) => {
      return "<td>" + val + "</td>"
    })
    row += body.join("\n")
    row += "\n</tr>\n<tr>\n"

    row += "\n</tr>"
    return row
  })
  content += fields.join("\n") + "\n"

  content += "</tbody>\n</table>"
  return prettify(content)
}

const processedData = computed(() => processData(props.data))
</script>

<template>
  <highlightjs :autodetect="false" language="html" :code="processData(data)" />

  <div class="flex justify-center mt-4">
    <vButton @click="copyClipboard(processedData)">
      Copy code
    </vButton>
  </div>
</template>
