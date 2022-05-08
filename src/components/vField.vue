<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import vTitle from './vTitle.vue'
import vButton from './vButton.vue'
import vFieldForm from './vFieldForm.vue'
import vCard from './vCard.vue'
import vValue from './vValue.vue'

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
const isTranslatable = computed(() => props.data.translatable === true ? 'Yes' : 'No')
const isRequired = computed(() => props.data.required === true ? 'Yes' : 'No')

// Methods
const cancelEdition = () => {
  values.value = { ...props.data }
  edit.value = false
}

const deleteField = () => {
  store.commit('deleteField', { bundleKey: props.bundleKey, fieldKey: props.fieldKey })
  dialogState.value = false
}
</script>

<template>
  <!-- Action buttons -->
  <div class="relative">
    <div class="text-right underline space-x-4 md:absolute md:right-0 md:top-0">
      <a href="#" @click.prevent="edit = true" v-if="edit === false">📝 Edit</a>
      <a href="#" @click.prevent="dialogState = true" v-if="edit === false">❌ Delete</a>
      <a href="#" @click.prevent="cancelEdition" v-if="edit === true">❌ Cancel edition</a>
    </div>
  </div>

  <!-- Values -->
  <vValue :label="'Label'" :value="data.label"/>
  <vValue :label="'Machine name'" :value="data.machineName"/>
  <vValue :label="'Description'" :value="data.description"/>
  <vValue :label="'Type'" :value="data.type"/>
  <vValue :label="'Required'" :value="isRequired"/>
  <vValue :label="'Default value'" :value="data.defaultValue"/>
  <vValue :label="'Translatable'" :value="isTranslatable"/>

  <!-- Edit form -->
  <Transition name="fade">
    <div v-if="edit">
      <vTitle class="mt-8" type="h5">Edit field</vTitle>

      <vCard stacked class="mt-4 space-y-4">
        <vFieldForm :bundle-key="bundleKey" :field-key="fieldKey" v-model="edit"/>
      </vCard>
    </div>
  </Transition>

  <!-- Confirm deletion dialog -->
  <GDialog max-width="500px" v-model="dialogState">
    <div class="text-black text-center">
      Are you sure?
    </div>

    <div class="py-4 flex justify-center gap-4">
      <vButton @click.prevent="deleteField">Delete</vButton>
      <vButton @click.prevent="dialogState = false">Cancel</vButton>
    </div>
  </GDialog>
</template>
