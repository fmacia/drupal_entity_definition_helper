<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import YAML from 'yaml'
import vTitle from './vTitle.vue'
import vCard from './vCard.vue'
import vField from './vField.vue'
import vGrid from './vGrid.vue'
import vValue from './vValue.vue'
import vBundleForm from './vBundleForm.vue'

// Props
const props = defineProps({
  data: Object,
  bundleKey: Number,
})

// Data
const store = useStore()
let edit = ref(false)
let showExport = ref(false)
let values = ref({ ...props.data })

// Methods
const cancelEdition = () => {
  values.value = { ...props.data }
  edit.value = false
}

// Computed
const isTranslatable = computed(() => props.data.translatable === true ? 'Yes' : 'No')
const exportValues = computed(() => YAML.stringify({ ...values.value }))
</script>

<template>
  <div class="relative">
    <vTitle type="h3">{{ data.label }}</vTitle>

    <!-- Action buttons -->
    <div class="text-right underline space-x-4 md:absolute md:right-0 md:top-0">
      <a href="#" @click.prevent="edit = true" v-if="edit === false">📝 Edit</a>
      <a href="#" @click.prevent="showExport = true" v-if="edit === false">⬇️ Export</a>
      <a href="#" @click.prevent="cancelEdition" v-if="edit === true">❌ Cancel edition</a>
    </div>
  </div>

  <vGrid cols-md="2" cols-lg="3">
    <!-- Bundle data -->
    <vValue :label="'Machine name'" :value="data.name"/>

    <vValue :label="'URL Pattern'" :value="data.urlPattern"/>

    <vValue :label="'Translatable'" :value="isTranslatable"/>

    <vValue :label="'Description'" :value="data.description"/>
  </vGrid>

  <div class="mt-4">
    <vBundleForm :bundle-key="bundleKey" v-if="edit" v-model="edit"/>
  </div>

  <!-- Fields -->
  <div class="mt-4 space-y-4">
    <vTitle type="h4" v-if="data.fields.length">Fields</vTitle>

    <vCard stacked v-for="(field, index) in data.fields" :key="index">
      <vField :data="field" :field-key="index"/>
    </vCard>
  </div>

  <!-- Export area -->
  <div class="mt-4 space-y-4" v-if="showExport === true && edit === false">
    <vTitle type="h4">YAML export</vTitle>

    <highlightjs language="yaml" :code="exportValues"/>
  </div>
</template>
