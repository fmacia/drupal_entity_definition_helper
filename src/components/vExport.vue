<script setup>
import { computed } from 'vue'
import YAML from "yaml"
import copyClipboard from '../helpers/copyClipboard'
import vButton from "./vButton.vue"
import vMarkdownExport from "./vMarkdownExport.vue"
import vTabs from "./vTabs.vue"
import vTableExport from "./vTableExport.vue"

const props = defineProps({
  data: {
    type: Object,
    modelValue: Boolean,
  },
})

const yamlExport = computed(() => YAML.stringify(props.data))
</script>

<template>
  <vTabs :tabList="['YAML', 'Markdown', 'HTML Table']">
    <template v-slot:tabPanel-1>
      <highlightjs
        @click="copyClipboard(yamlExport)"
        :autodetect="false"
        language="yaml"
        :code="yamlExport"
      />

      <div class="flex justify-center mt-4">
        <vButton @click="copyClipboard(yamlExport)"> Copy code </vButton>
      </div>
    </template>
    <template v-slot:tabPanel-2>
      <vMarkdownExport :data="data" />
    </template>
    <template v-slot:tabPanel-3>
      <vTableExport :data="data" />
    </template>
  </vTabs>

  <div class="mt-4 flex justify-center">
    <vButton variant="outline" @click.prevent="showExport = false">Cancel</vButton>
  </div>
</template>
