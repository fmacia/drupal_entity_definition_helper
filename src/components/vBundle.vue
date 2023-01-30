<script setup>
import { ref, computed, defineComponent } from "vue"
import { useStore } from "vuex"
import YAML from "yaml"
import plusIcon from "../assets/plus.svg?component"
import copyClipboard from '../helpers/copyClipboard'
import vBundleForm from "./vBundleForm.vue"
import vButton from "./vButton.vue"
import vCard from "./vCard.vue"
import vField from "./vField.vue"
import vFieldForm from "./vFieldForm.vue"
import vGrid from "./vGrid.vue"
import vMarkdownExport from "./vMarkdownExport.vue"
import vModal from "./vModal.vue"
import vTabs from "./vTabs.vue"
import vTableExport from "./vTableExport.vue"
import vTitle from "./vTitle.vue"
import vValue from "./vValue.vue"

let deleteModal = ref(false)

// Props
const props = defineProps({
  data: Object,
  bundleKey: Number,
})

// Data
const store = useStore()
let showEdit = ref(false)
let showExport = ref(false)
const showAddField = ref(false)

// Methods
const deleteBundle = () => {
  store.commit("deleteBundle", props.bundleKey)
  deleteModal.value = false
}

// Computed
const isTranslatable = computed(() => (props.data.translatable === true ? "Yes" : "No"))
const yamlExport = computed(() => YAML.stringify(props.data))
</script>

<template>
  <div class="relative">
    <vTitle type="h3">{{ data.label }}</vTitle>

    <!-- Action buttons -->
    <div class="text-right space-x-4 md:absolute md:right-0 md:top-0 mb-4 md:mb-0">
      <a href="#" class="group" @click.prevent="showEdit = true">
        📝 <span class="group-hover:underline">Edit</span>
      </a>
      <a href="#" class="group" @click.prevent="deleteModal = true">
        ❌ <span class="group-hover:underline">Delete</span>
      </a>
      <a href="#" class="group" @click.prevent="showExport = true">
        ⬇️ <span class="group-hover:underline">Export</span>
      </a>
    </div>
  </div>

  <!-- Bundle data -->
  <vGrid cols-md="2" cols-lg="3">
    <vValue :label="'Machine name'" :value="data.machineName" />

    <vValue :label="'URL Pattern'" :value="data.urlPattern" />

    <vValue :label="'Translatable'" :value="isTranslatable" />
  </vGrid>

  <vValue class="my-8" :label="'Description'" :value="data.description" />

  <vModal v-model="showEdit">
    <vTitle class="mb-4" type="h4">Edit content type</vTitle>

    <vBundleForm :bundle-key="bundleKey" v-model="showEdit" />
  </vModal>

  <!-- Fields -->
  <div class="mt-4 space-y-4">
    <vTitle type="h4" v-if="data.fields.length">Fields</vTitle>

    <vCard stacked v-for="(field, index) in data.fields" :key="index">
      <vField :data="field" :bundle-key="bundleKey" :field-key="index" />
    </vCard>

    <vButton class="flex items-center gap-x-2 mx-auto" @click.prevent="showAddField = true">
      <plusIcon class="h-5 w-5" />
      <span>Add field</span>
    </vButton>

    <vModal v-model="showAddField">
      <vTitle type="h5">Add field</vTitle>

      <vFieldForm v-model="showAddField" :bundle-key="bundleKey" />
    </vModal>
  </div>

  <!-- Export area -->
  <vModal v-model="showExport">
    <vTabs :tabList="['YAML', 'Markdown', 'HTML Table']">
      <template v-slot:tabPanel-1>
        <highlightjs @click="copyClipboard(yamlExport)" :autodetect="false" language="yaml" :code="yamlExport" />

        <div class="flex justify-center mt-4">
          <vButton @click="copyClipboard(yamlExport)">
            Copy code
          </vButton>
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
  </vModal>

  <!-- Confirm deletion dialog -->
  <vModal v-model="deleteModal">
    <div class="text-center">Please confirm you want to delete {{ data.label }}.</div>

    <div class="pt-4 flex justify-center gap-4">
      <vButton variant="danger" @click.prevent="deleteBundle">Delete</vButton>
      <vButton variant="outline" @click.prevent="deleteModal = false">Cancel</vButton>
    </div>
  </vModal>
</template>
