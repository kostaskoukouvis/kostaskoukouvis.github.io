<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { topAlbums } from '@/data'
import Item from './Item.vue'

const albums = topAlbums[2024].sort((a, b) => b.position - a.position)
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
