<script setup lang="ts">
// import type { CountryCode } from '@/types'

defineProps<{
  code: string
  size?: string | number
}>()
</script>

<template>
  <span
    class="fi"
    :class="['fis', `fi-${code.toLowerCase()}`, 'round']"
    :style="size ? `font-size:${size}px` : undefined" />
</template>

<style scoped>
@import 'flag-icons/css/flag-icons.min.css';

.round {
  border-radius: 50%;
}
</style>
