<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { topAlbums2024 } from '@/data'
import Item from './Item.vue'

const albums = topAlbums2024.sort((a, b) => a.position - b.position)
</script>

<template>
  <Card>
    <CardHeader class="flex items-center p-8">
      <div class="text-4xl">Top 25 Albums Of 2024</div>
    </CardHeader>
    <CardContent>
      <template v-for="album in albums">
        <Item :album="album" />
      </template>
    </CardContent>
  </Card>
</template>
