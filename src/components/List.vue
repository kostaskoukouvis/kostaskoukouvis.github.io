<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Item from './Item.vue'
import Search from './Search.vue'
import Pagination from './Pagination.vue'

const tracks = [
  {
    position: 10,
    artist: 'As I Lay Dying',
    album: 'Through Storms Ahead',
    title: 'The Cave We Fear To Enter',
    country: '🇺🇸',
    url: 'https://www.youtube.com/embed/e-dByXld2oM?si=TkQGeBFcDBJjosga',
    releaseDate: '2021-01-01',
    genre: 'Metalcore',
    duration: '4:30',
  },
  {
    position: 11,
    artist: 'Architects',
    album: 'For Those That Wish To Exist',
    title: 'Meteor',
    country: '🇬🇧',
    url: 'https://www.youtube.com/embed/1ZQeVX4vQj8?si=3J9Z9ZQvQ7mZ9ZQv',
    releaseDate: '2021-02-01',
    genre: 'Metalcore',
    duration: '3:45',
  },
]

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const sortBy = ref('position')

const filteredTracks = computed(() => {
  return tracks.filter(track => 
    track.artist.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    track.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sortedTracks = computed(() => {
  return filteredTracks.value.sort((a, b) => {
    if (sortBy.value === 'artist') {
      return a.artist.localeCompare(b.artist)
    } else if (sortBy.value === 'album') {
      return a.album.localeCompare(b.album)
    } else {
      return a.position - b.position
    }
  })
})

const paginatedTracks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedTracks.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(sortedTracks.value.length / itemsPerPage)
})
</script>

<template>
  <Card>
    <CardHeader> TOP 25 </CardHeader>
    <CardContent>
      <Search v-model="searchQuery" />
      <div class="flex justify-end mb-4">
        <label for="sort" class="mr-2">Sort by:</label>
        <select id="sort" v-model="sortBy">
          <option value="position">Position</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
      </div>
      <Item
        v-for="track in paginatedTracks"
        :key="track.position"
        :position="track.position"
        :artist="track.artist"
        :album="track.album"
        :title="track.title"
        :country="track.country"
        :url="track.url"
        :releaseDate="track.releaseDate"
        :genre="track.genre"
        :duration="track.duration" />
      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </CardContent>
  </Card>
</template>
