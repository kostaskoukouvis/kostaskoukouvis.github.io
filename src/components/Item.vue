<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { ref } from 'vue'

import FlagIcon, { CountryCode } from 'vue3-flag-icons'

const props = defineProps<{
  position: number
  artist: string
  album: string
  cover: string
  title: string
  country: string
  url: string
  date: string
}>()

const date = new Date(props.date)
const show = ref(true)
const showVideo = ref(false)

const toggleVideo = () => {
  showVideo.value = !showVideo.value
}
// the item should not be visible before this date
console.log(date)
if (date > new Date()) {
  show.value = false
  console.error('The item is not available yet')
}
</script>

<template>
  <Card class="mb-2">
    <CardContent class="group/item hover:bg-stone-900 p-0" v-if="show">
      <!-- <AccordionItem value="item-1"> -->
      <!-- <AccordionTrigger> -->
      <div class="flex items-start p-4 cursor-pointer" @click="toggleVideo">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback class="text-lg">
              {{ position }}
            </AvatarFallback>
          </Avatar>
          <div class="overflow-hidden rounded-md" v-if="cover">
            <img
              :src="cover"
              :alt="artist"
              width="80"
              height="80"
              class="object-cover transition-all hover:scale-105" />
          </div>
          <div class="grid gap-1">
            <div class="font-bold text-xl">
              {{ artist }}
            </div>
            <div class="line-clamp-1">
              {{ album }}
            </div>
          </div>
        </div>
        <div class="ml-auto text-xs text-muted-foreground">
          <FlagIcon
            :code="(country as CountryCode)"
            :size="20"
            circle
            :title="country => `Country: ${country}`" />
        </div>
      </div>
      <!-- </AccordionTrigger> -->
      <!-- <AccordionContent> -->
      <div class="flex overflow-auto p-4" v-if="showVideo">
        <iframe
          class="w-full"
          height="315"
          :src="url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>
      <!-- </AccordionContent> -->
      <!-- </AccordionItem> -->
    </CardContent>
    <CardContent class="p-0" v-else>
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback class="text-lg">
              {{ position }}
            </AvatarFallback>
          </Avatar>
          <div class="flex items-center justify-center">
            <div>
              <div class="text-lg font-bold">Coming soon</div>
              <div class="text-sm text-muted-foreground">
                Available on {{ date.toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style>
