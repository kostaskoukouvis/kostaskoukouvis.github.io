<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

defineProps<{
  modelValue: string
}>()

const updateSearchQuery = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  emit('update:modelValue', searchQuery.value)
}
</script>

<template>
  <div class="mb-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="updateSearchQuery"
      placeholder="Search tracks..."
      class="w-full p-2 border rounded"
    />
  </div>
</template>
