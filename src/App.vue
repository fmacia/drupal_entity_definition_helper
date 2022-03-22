<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import vCard from './components/vCard.vue'
import vTitle from './components/vTitle.vue'
import vGrid from './components/vGrid.vue'
import vNavbar from './components/vNavbar.vue'
import vButton from './components/vButton.vue'
import vBundle from './components/vBundle.vue'
import vBundleForm from './components/vBundleForm.vue'

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
  <vNavbar/>

  <vTitle type="h1" :border="false">Drupal Entity Definition Helper</vTitle>

  <div class="space-y-6" v-if="node.length">
    <vTitle type="h2">Content types</vTitle>

    <vCard v-for="(bundle, index) in node" :key="index">
      <vBundle :data="bundle" :bundle-key="index"/>
    </vCard>

    <vButton @click.prevent="adding = true" v-if="adding !== true">Add bundle</vButton>

    <vCard v-if="adding === true">
      <vTitle type="h3">Add content type</vTitle>

      <vBundleForm v-model="adding"/>
    </vCard>
  </div>

</template>
