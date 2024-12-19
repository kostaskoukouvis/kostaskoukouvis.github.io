<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)

const setRating = (value: number) => {
  rating.value = value
}
</script>

<template>
  <div class="rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ 'filled': star <= rating }"
      @click="setRating(star)"
    >
      ★
    </span>
  </div>
</template>

<style scoped>
.rating {
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
}

.star {
  font-size: 2rem;
  color: #ccc;
}

.star.filled {
  color: #f39c12;
}
</style>
