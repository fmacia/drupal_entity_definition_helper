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
import vMarkdownExport from './vMarkdownExport.vue'
import vTableExport from './vTableExport.vue'
import vFieldForm from './vFieldForm.vue'

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
const adding = ref(false)

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
const yamlExport = computed(() => YAML.stringify(props.data))
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

  <Transition name="fade">
    <div v-if="edit">
      <vTitle class="mt-8" type="h4">Edit content type</vTitle>

      <vCard stacked class="mt-4 space-y-4">
        <vBundleForm :bundle-key="bundleKey" v-model="edit"/>
      </vCard>
    </div>
  </Transition>

  <!-- Fields -->
  <div class="mt-4 space-y-4">
    <vTitle type="h4" v-if="data.fields.length">Fields</vTitle>

    <vCard stacked v-for="(field, index) in data.fields" :key="index">
      <vField :data="field" :bundle-key="bundleKey" :field-key="index"/>
    </vCard>

    <div class="flex justify-center">
      <vButton @click.prevent="adding = true" v-if="adding !== true">Add field</vButton>
    </div>

    <Transition name="fade">
      <vCard stacked v-if="adding === true">
        <vTitle type="h5">Add field</vTitle>

        <vFieldForm v-model="adding" :bundle-key="bundleKey"/>
      </vCard>
    </Transition>
  </div>

  <!-- Export area -->
  <Transition name="fade">
    <div class="mt-4 space-y-4" v-if="showExport === true && edit === false">
      <vTitle type="h4">YAML export</vTitle>
      <highlightjs :autodetect="false" language="yaml" :code="yamlExport"/>

      <vTitle type="h4">Markdown export</vTitle>
      <vMarkdownExport :data="data"/>

      <vTitle type="h4">HTML Table export</vTitle>
      <vTableExport :data="data"/>
    </div>
  </Transition>

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
