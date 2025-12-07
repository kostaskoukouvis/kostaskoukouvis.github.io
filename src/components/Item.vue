<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Album } from '@/models'
import { computed, ref } from 'vue'
import Flag from './Flag.vue'

const props = defineProps<{
  album: Album
}>()

// the date the no.1 album will be revealed
const topRevealDate = computed(() => new Date(props.album.year, 11, 31))

// the date the current album will be revealed
// is the topRevealDate minus the position of the album
const revealDate = computed(() => {
  const date = new Date(topRevealDate.value)
  date.setDate(date.getDate() - (props.album.position - 1))
  return date
})

// Only hide albums for the current year that haven't been revealed yet
const hideAlbum = computed(() => {
  if (import.meta.env.DEV) {
    return false
  }
  const currentYear = new Date().getFullYear()
  if (props.album.year !== currentYear) {
    return false
  }
  return new Date() < revealDate.value
})

const showVideo = ref(false)
const toggleVideo = () => {
  showVideo.value = !showVideo.value
}
</script>

<template>
  <Card class="mb-2">
    <!-- Countdown -->
    <CardContent class="p-0" v-if="hideAlbum">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback class="text-lg">
              {{ album.position }}
            </AvatarFallback>
          </Avatar>
          <div class="flex items-center justify-center">
            <div>
              <div class="text-lg font-bold">Coming soon</div>
              <div class="text-sm text-muted-foreground">
                Available on
                {{
                  revealDate.toLocaleString('default', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>

    <CardContent class="group/item hover:bg-stone-900 p-0" v-else>
      <div class="flex items-start p-4 cursor-pointer touch-target" @click="toggleVideo">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback class="text-lg">
              {{ album.position }}
            </AvatarFallback>
          </Avatar>
          <div class="overflow-hidden rounded-md" v-if="album.cover">
            <img
              :src="album.cover"
              :alt="album.artist"
              width="80"
              height="80"
              class="object-cover transition-all hover:scale-105" />
            <!-- mobile devices -->
            <div class="grid gap-1 md:hidden">
              <div class="font-bold text-xl">
                {{ album.artist }}
              </div>
              <div class="line-clamp-1">
                {{ album.title }}
              </div>
            </div>
          </div>
          <!-- bigger screen -->
          <div class="md:grid gap-1 hidden">
            <div class="font-bold text-xl">
              {{ album.artist }}
            </div>
            <div class="line-clamp-1">
              {{ album.title }}
            </div>
          </div>
        </div>
        <div class="ml-auto text-xs text-muted-foreground">
          <Flag :code="album.country" :size="20" circle />
        </div>
      </div>
      <div class="flex md:h-[315px] overflow-auto p-4" v-if="showVideo">
        <iframe
          class="w-full responsive-iframe"
          :src="'https://www.youtube.com/embed/' + album.video + '?autoplay=1'"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
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

.responsive-image {
  width: 100%;
  max-width: 100%;
  height: auto;
}

.responsive-iframe {
  width: 100%;
  max-width: 100%;
  height: auto;
}

.touch-target {
  padding: 1rem;
}

.touch-target:hover,
.touch-target:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
