<script setup>
import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import YAML from 'yaml'
import vTitle from './vTitle.vue'
import vCard from './vCard.vue'
import vField from './vField.vue'
import vGrid from './vGrid.vue'
import vValue from './vValue.vue'
import vButton from './vButton.vue'
import vBundleForm from './vBundleForm.vue'

let dialogState = ref(false)

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

const deleteBundle = () => {
  store.commit('deleteBundle', props.bundleKey)
  dialogState.value = false
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
      <a href="#" @click.prevent="dialogState = true" v-if="edit === false">❌ Delete</a>
      <a href="#" @click.prevent="showExport = true" v-if="edit === false">⬇️ Export</a>
      <a href="#" @click.prevent="cancelEdition" v-if="edit === true">❌ Cancel edition</a>
    </div>
  </div>

  <!-- Bundle data -->
  <vGrid cols-md="2" cols-lg="3">
    <vValue :label="'Machine name'" :value="data.machineName"/>

    <vValue :label="'URL Pattern'" :value="data.urlPattern"/>

    <vValue :label="'Translatable'" :value="isTranslatable"/>

    <vValue :label="'Description'" :value="data.description"/>
  </vGrid>

  <vTitle class="mt-8" type="h4" v-if="edit">Edit content type</vTitle>

  <vCard stacked class="mt-4 space-y-4" v-if="edit">
    <vBundleForm :bundle-key="bundleKey" v-model="edit"/>
  </vCard>

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

  <!-- Confirm deletion dialog -->
  <GDialog max-width="500px" v-model="dialogState">
    <div class="text-black text-center">
      Are you sure?
    </div>

    <div class="py-4 flex justify-center gap-4">
      <vButton @click.prevent="deleteBundle">Delete</vButton>
      <vButton @click.prevent="dialogState = false">Cancel</vButton>
    </div>
  </GDialog>
</template>
