<script setup lang="ts">
import { Accordion } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Item from './Item.vue'

const tracks = [
  {
    position: 2,
    artist: 'Gaerea',
    album: 'Coma',
    title: 'World Ablaze',
    country: 'pt',
    cover: 'https://www.metal-archives.com/images/1/2/5/6/1256052.jpg?5217',
    url: 'https://www.youtube.com/embed/DPnAdk6JO78?si=K0g7ThmQ9NM4PEou',
    date: '2024-12-31T00:00:00.000Z',
  },
  {
    position: 9,
    artist: 'Future Palace',
    album: 'Distortion',
    title: 'Malphas',
    country: 'de',
    cover: 'https://arising-empire.shop/media/image/f3/38/dc/futurepalace_distortion.jpg',
    url: 'https://www.youtube.com/embed/qfgEGrxysUc?si=Cj1AS4tVQJ31URYI',
    date: '2024-11-31T00:00:00.000Z',
  },
  {
    position: 10,
    artist: 'As I Lay Dying',
    album: 'Through Storms Ahead',
    title: 'The Cave We Fear To Enter',
    country: 'us',
    cover: 'https://www.metal-archives.com/images/1/2/7/2/1272713.jpg?3942',
    url: 'https://www.youtube.com/embed/e-dByXld2oM?si=TkQGeBFcDBJjosga',
    date: '2024-11-31T00:00:00.000Z',
  },
]
</script>

<template>
  <Card>
    <CardHeader> TOP 25 </CardHeader>
    <CardContent>
      <template v-for="track in tracks">
        <Accordion type="single" collapsible>
          <Item
            :date="track.date"
            :position="track.position"
            :artist="track.artist"
            :album="track.album"
            :title="track.title"
            :country="track.country"
            :cover="track.cover"
            :url="track.url" />
        </Accordion>
      </template>
    </CardContent>
  </Card>
</template>
