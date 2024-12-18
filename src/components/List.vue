<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Item from './Item.vue'

const tracks = [
  {
    position: 10,
    artist: 'As I Lay Dying',
    album: 'Through Storms Ahead',
    title: 'The Cave We Fear To Enter',
    country: '🇺🇸',
    url: 'https://www.youtube.com/embed/e-dByXld2oM?si=TkQGeBFcDBJjosga',
  },
  {
    position: 11,
    artist: 'Architects',
    album: 'For Those That Wish To Exist',
    title: 'Meteor',
    country: '🇬🇧',
    url: 'https://www.youtube.com/embed/1ZQeVX4vQj8?si=3J9Z9ZQvQ7mZ9ZQv',
  },
]
</script>

<template>
  <Card>
    <CardHeader> TOP 25 </CardHeader>
    <CardContent>
      <Item
        v-for="track in tracks"
        :position="track.position"
        :artist="track.artist"
        :album="track.album"
        :title="track.title"
        :country="track.country"
        :url="track.url" />
    </CardContent>
  </Card>
</template>
