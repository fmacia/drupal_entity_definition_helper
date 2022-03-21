<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: Object,
  fieldKey: Number,
})
</script>

<template>
  <div>
    Name: {{ data.label }}
  </div>
  <div>
    Machine name: {{ data.name }}
  </div>
  <div>
    Description: {{ data.description }}
  </div>
  <div>
    Type: {{ data.type }}
  </div>
</template>
