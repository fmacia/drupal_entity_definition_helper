<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import vTitle from "./vTitle.vue"
import vButton from "./vButton.vue"
import vCard from "./vCard.vue"
import vFieldForm from "./vFieldForm.vue"
import vGrid from "./vGrid.vue"
import vValue from "./vValue.vue"

const props = defineProps({
  data: Object,
  bundleKey: Number,
  fieldKey: Number,
})

// Data
const store = useStore()
let edit = ref(false)
let values = ref({ ...props.data })
let dialogState = ref(false)

// Computed
const isTranslatable = computed(() =>
  props.data.translatable === true ? "Yes" : "No"
)
const isRequired = computed(() => (props.data.required === true ? "Yes" : "No"))

// Methods
const cancelEdition = () => {
  values.value = { ...props.data }
  edit.value = false
}

const deleteField = () => {
  store.commit("deleteField", {
    bundleKey: props.bundleKey,
    fieldKey: props.fieldKey,
  })
  dialogState.value = false
}
</script>

<template>
  <!-- Action buttons -->
  <div class="relative">
    <div
      class="text-right space-x-4 md:absolute md:right-0 md:top-0"
      v-if="edit === false"
    >
      <a href="#" class="group" @click.prevent="edit = true">
        📝 <span class="group-hover:underline">Edit</span>
      </a>
      <a href="#" class="group" @click.prevent="dialogState = true">
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
  </vGrid>

  <vValue class="mt-8" :label="'Description'" :value="data.description" />

  <!-- Edit form -->
  <Transition name="fade">
    <div v-if="edit">
      <vTitle class="mt-8" type="h5">Edit field</vTitle>

      <vCard stacked class="mt-4 space-y-4">
        <vFieldForm
          :bundle-key="bundleKey"
          :field-key="fieldKey"
          v-model="edit"
        />
      </vCard>
    </div>
  </Transition>

  <!-- Confirm deletion dialog -->
  <GDialog max-width="500px" v-model="dialogState">
    <div
      class="dark:bg-neutral-800 bg-neutral-200 border-2 border-black rounded"
    >
      <div class="py-4 text-center">
        Please confirm you want to delete {{ data.label }}.
      </div>

      <div class="py-4 flex justify-center gap-4">
        <vButton variant="danger" @click.prevent="deleteField">Delete</vButton>
        <vButton variant="outline" @click.prevent="dialogState = false">
          Cancel
        </vButton>
      </div>
    </div>
  </GDialog>
</template>
