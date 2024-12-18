<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

defineProps<{
  position: number
  artist: string
  album: string
  title: string
  country: string
  url: string
}>()
</script>

<template>
  <Card>
    <CardContent class="p-0">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {{ position }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ artist }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ album }}
            </div>
          </div>
        </div>
        <div class="ml-auto text-xs text-muted-foreground">
          {{ country }}
        </div>
      </div>
      <div class="p-4">
        <iframe
          width="560"
          height="315"
          :src="url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>
    </CardContent>
  </Card>
</template>
