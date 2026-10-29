<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import List from './components/List.vue'
import Stats from './components/Stats.vue'

// Hash-based routing keeps GitHub Pages happy without a 404 fallback
const hash = ref(window.location.hash)
const onHashChange = () => (hash.value = window.location.hash)
window.addEventListener('hashchange', onHashChange)
onBeforeUnmount(() => window.removeEventListener('hashchange', onHashChange))

const page = computed(() => (hash.value === '#/stats' ? 'stats' : 'list'))
const links = [
  { page: 'list', href: '#/', label: 'Lists' },
  { page: 'stats', href: '#/stats', label: 'Stats' },
] as const
</script>

<template>
  <main class="container w-full max-w-(--breakpoint-md) my-10">
    <nav class="mb-4 flex justify-end gap-4 text-sm">
      <a
        v-for="link in links"
        :key="link.page"
        :href="link.href"
        :aria-current="page === link.page ? 'page' : undefined"
        :class="page === link.page ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'">
        {{ link.label }}
      </a>
    </nav>
    <Stats v-if="page === 'stats'" />
    <List v-else />
  </main>
</template>
