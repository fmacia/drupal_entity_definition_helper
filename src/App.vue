<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed } from 'vue'
import { useStore } from 'vuex'
import vCard from './components/vCard.vue'
import vTitle from './components/vTitle.vue'
import vGrid from './components/vGrid.vue'
import vNavbar from './components/vNavbar.vue'

import vBundle from './components/vBundle.vue'

const store = useStore();
const node = computed(() => store.state.node)

</script>

<template>
  <vNavbar/>

  <vTitle type="h1">Drupal Entity Definition Helper</vTitle>

  <div class="space-y-6">
    <vTitle type="h2" v-if="node.length">Content types</vTitle>

    <vCard v-for="(bundle, index) in node" :key="index">
      <vBundle :data="bundle" :bundle-key="index"/>
    </vCard>
  </div>

</template>
