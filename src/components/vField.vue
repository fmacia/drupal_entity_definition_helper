<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import vTitle from "./vTitle.vue"
import vButton from "./vButton.vue"
import vFieldForm from "./vFieldForm.vue"
import vGrid from "./vGrid.vue"
import vModal from "./vModal.vue"
import vValue from "./vValue.vue"

const props = defineProps({
  data: Object,
  bundleKey: Number,
  fieldKey: Number,
})

// Data
const store = useStore()
let showEdit = ref(false)
let values = ref({ ...props.data })
let showDelete = ref(false)

// Computed
const isTranslatable = computed(() =>
  props.data.translatable === true ? "Yes" : "No"
)
const isRequired = computed(() => (props.data.required === true ? "Yes" : "No"))

// Methods
const deleteField = () => {
  store.commit("deleteField", {
    bundleKey: props.bundleKey,
    fieldKey: props.fieldKey,
  })
  showDelete.value = false
}
</script>

<template>
  <!-- Action buttons -->
  <div class="relative">
    <div
      class="text-right space-x-4 md:absolute md:right-0 md:top-0"
    >
      <a href="#" class="group" @click.prevent="showEdit = true">
        📝 <span class="group-hover:underline">Edit</span>
      </a>
      <a href="#" class="group" @click.prevent="showDelete = true">
        ❌ <span class="group-hover:underline">Delete</span>
      </a>
    </div>
  </div>

  <!-- Values -->
  <vGrid cols-md="2" cols-lg="3">
    <vValue :label="'Label'" :value="data.label" />
    <vValue :label="'Machine name'" :value="data.machineName" />
    <vValue :label="'Type'" :value="data.type" />
    <vValue :label="'Required'" :value="isRequired" />
    <vValue :label="'Default value'" :value="data.defaultValue" />
    <vValue :label="'Translatable'" :value="isTranslatable" />
    <vValue :label="'Number of values'" :value="data.cardinality" />
  </vGrid>

  <vValue class="mt-8" :label="'Description'" :value="data.description" />

  <!-- Edit form -->
  <vModal v-model="showEdit">
    <vTitle type="h5">Edit field</vTitle>

    <vFieldForm
      :bundle-key="bundleKey"
      :field-key="fieldKey"
      v-model="showEdit"
    />
  </vModal>

  <!-- Confirm deletion dialog -->
  <vModal v-model="showDelete">
    <div class="text-center">
      Please confirm you want to delete {{ data.label }}.
    </div>

    <div class="pt-4 flex justify-center gap-4">
      <vButton variant="danger" @click.prevent="deleteField">Delete</vButton>
      <vButton variant="outline" @click.prevent="showDelete = false">
        Cancel
      </vButton>
    </div>
  </vModal>
</template>
