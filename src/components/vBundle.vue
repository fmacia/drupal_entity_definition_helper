<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import YAML from 'yaml'
import vTitle from './vTitle.vue'
import vCard from './vCard.vue'
import vField from './vField.vue'
import vGrid from './vGrid.vue'

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
const save = () => {
  store.commit('setBundle', { bundleKey: props.bundleKey, bundle: values.value });
  edit.value = false
}
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
      <a href="#" @click.prevent="save" v-if="edit === true">✅ Save</a>
      <a href="#" @click.prevent="cancelEdition" v-if="edit === true">❌ Cancel</a>
    </div>
  </div>

  <div class="space-y-2">
    <!-- Bundle data -->
    <div>
      <div v-show="edit">Name:</div>
      <input class="dark:bg-neutral-700" type="text" v-model="values.label" v-show="edit">
    </div>
    <div>
      Machine name: {{ data.name }}
      <div>
        <input class="dark:bg-neutral-700" type="text" v-model="values.name" v-show="edit">
      </div>
    </div>
    <div v-if="data.urlPattern">
      URL Pattern: {{ data.urlPattern }}
      <div>
        <input class="dark:bg-neutral-700" type="text" v-model="values.urlPattern" v-show="edit">
      </div>
    </div>
    <div v-if="data.translatable !== undefined">
      Translatable: {{ isTranslatable }}
      <div>
        <input class="dark:bg-neutral-700" type="checkbox" v-model="values.translatable" v-show="edit">
      </div>
    </div>
    <div>
      Description: {{ data.description }}
      <div>
        <textarea class="dark:bg-neutral-700" v-model="values.description" v-show="edit"></textarea>
      </div>
    </div>

    <!-- Fields -->
    <div class="space-y-4">
      <vTitle type="h4" v-if="data.fields.length">Fields</vTitle>

      <vCard stacked v-for="(field, index) in data.fields" :key="index">
        <vField :data="field" :field-key="index"/>
      </vCard>
    </div>

    <!-- Export area -->
    <div class="space-y-4" v-if="showExport === true && edit === false">
      <vTitle type="h4">YAML export</vTitle>

      <highlightjs
        language="yaml"
        :code="exportValues"
      />
    </div>
  </div>
</template>
