<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import plusIcon from "./assets/plus.svg?component"
import vCard from './components/vCard.vue'
import vNavbar from './components/vNavbar.vue'
import vButton from './components/vButton.vue'
import vBundle from './components/vBundle.vue'
import vBundleForm from './components/vBundleForm.vue'
import vTitle from './components/vTitle.vue'

// Data
const store = useStore()
const values = ref({})
const adding = ref(false)

// Methods
const addBundle = () => {
  store.commit('addBundle', { bundle: values.value })
  values.value = ref({})
  adding.value = false
}

// Computed
const node = computed(() => store.state.node)
</script>

<template>
  <vNavbar />

  <main class="container mt-24 mb-8">
    <div class="space-y-6" v-if="node.length">
      <vTitle type="h2">Content types</vTitle>

      <vCard v-for="(bundle, index) in node" :key="index">
        <vBundle :data="bundle" :bundle-key="index" />
      </vCard>

      <Transition name="fade">
        <vCard v-if="adding === true">
          <vTitle type="h3">Add content type</vTitle>

          <vBundleForm v-model="adding" />
        </vCard>
      </Transition>

      <div class="flex justify-center">
        <vButton class="flex items-center gap-x-2 mx-auto" @click.prevent="adding = true" v-if="!adding">
          <plusIcon class="h-5 w-5" />
          <span>Add bundle</span>
        </vButton>
      </div>
    </div>
  </main>

</template>
