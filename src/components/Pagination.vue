<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emits = defineEmits<{
  (e: 'update:currentPage', value: number): void
}>()

const currentPage = ref(props.currentPage)

const pages = computed(() => {
  const pagesArray = []
  for (let i = 1; i <= props.totalPages; i++) {
    pagesArray.push(i)
  }
  return pagesArray
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page
    emits('update:currentPage', page)
  }
}
</script>

<template>
  <div class="flex justify-center mt-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <button
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="['px-4 py-2 mx-1 rounded', { 'bg-blue-500 text-white': page === currentPage, 'bg-gray-200': page !== currentPage }]"
    >
      {{ page }}
    </button>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === props.totalPages"
      class="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
