<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { topAlbums } from '@/data'
import { computed, ref, watch } from 'vue'
import Item from './Item.vue'

const availableYears = Object.keys(topAlbums)
  .map(Number)
  .sort((a, b) => b - a)
const selectedYear = ref(new Date().getFullYear())
const albums = computed(
  () => topAlbums[selectedYear.value]?.sort((a, b) => a.position - b.position) || []
)

// Update page title when year changes
watch(
  selectedYear,
  year => {
    document.title = `Top 25 Of ${year}`
  },
  { immediate: true }
)

const canGoPrevious = computed(() => {
  const currentIndex = availableYears.indexOf(selectedYear.value)
  return currentIndex < availableYears.length - 1
})

const canGoNext = computed(() => {
  const currentIndex = availableYears.indexOf(selectedYear.value)
  return currentIndex > 0
})

const goToPreviousYear = () => {
  const currentIndex = availableYears.indexOf(selectedYear.value)
  if (currentIndex < availableYears.length - 1) {
    selectedYear.value = availableYears[currentIndex + 1]
  }
}

const goToNextYear = () => {
  const currentIndex = availableYears.indexOf(selectedYear.value)
  if (currentIndex > 0) {
    selectedYear.value = availableYears[currentIndex - 1]
  }
}
</script>

<template>
  <Card>
    <CardHeader class="flex items-center p-8">
      <div class="flex items-center justify-between w-full gap-4">
        <button
          @click="goToPreviousYear"
          :disabled="!canGoPrevious"
          :class="
            canGoPrevious
              ? 'cursor-pointer hover:opacity-70'
              : 'opacity-30 cursor-not-allowed'
          "
          class="text-4xl transition-opacity"
          aria-label="Previous year">
          ‹
        </button>
        <div class="text-4xl">Top 25 Albums Of {{ selectedYear }}</div>
        <button
          @click="goToNextYear"
          :disabled="!canGoNext"
          :class="
            canGoNext
              ? 'cursor-pointer hover:opacity-70'
              : 'opacity-30 cursor-not-allowed'
          "
          class="text-4xl transition-opacity"
          aria-label="Next year">
          ›
        </button>
      </div>
    </CardHeader>
    <CardContent>
      <template v-for="album in albums">
        <Item :album="album" />
      </template>
    </CardContent>
  </Card>
</template>
