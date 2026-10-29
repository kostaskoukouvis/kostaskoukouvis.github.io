<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { topAlbums } from '@/data'
import { countryName, LIST_SIZE, rankArtists, rankCountries, type RankedEntry } from '@/lib/stats'
import { computed, onMounted, ref } from 'vue'
import Flag from './Flag.vue'

const TOP_ARTISTS = 15

// Stats are historical: the current year's list is never counted
const pastAlbums = Object.values(topAlbums)
  .flat()
  .filter(album => album.year < new Date().getFullYear())
const years = [...new Set(pastAlbums.map(album => album.year))].sort((a, b) => b - a)
const yearRange =
  years.length > 1 ? `${years[years.length - 1]}–${years[0]}` : String(years[0] ?? '')

const selectedYear = ref<number | 'all'>('all')

const albums = computed(() =>
  pastAlbums.filter(album => selectedYear.value === 'all' || album.year === selectedYear.value)
)

const artists = computed(() => rankArtists(albums.value))
const countries = computed(() => rankCountries(albums.value))
const repeatArtists = computed(() => artists.value.filter(artist => artist.years.length > 1))

const summary = computed(() => [
  { label: 'Albums', value: albums.value.length },
  { label: 'Artists', value: artists.value.length },
  { label: 'Countries', value: countries.value.length },
  { label: 'Returning artists', value: repeatArtists.value.length },
])

const barWidth = (entry: RankedEntry, list: RankedEntry[]) =>
  `${(entry.points / (list[0]?.points || 1)) * 100}%`

onMounted(() => {
  document.title = 'Top 25 Stats'
})
</script>

<template>
  <Card>
    <CardHeader class="flex flex-col items-center gap-4 p-8">
      <div class="text-4xl">Statistics</div>
      <div class="text-sm text-muted-foreground text-center">
        Points per album: #1 gets {{ LIST_SIZE }}, #{{ LIST_SIZE }} gets 1
      </div>
      <select
        v-model="selectedYear"
        aria-label="Year"
        class="cursor-pointer rounded-md border bg-background px-3 py-1.5 text-sm">
        <option value="all">All years ({{ yearRange }})</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </CardHeader>

    <CardContent class="grid gap-8">
      <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
        <div v-for="item in summary" :key="item.label" class="rounded-lg border p-4 text-center">
          <div class="text-3xl font-bold">{{ item.value }}</div>
          <div class="text-sm text-muted-foreground">{{ item.label }}</div>
        </div>
      </div>

      <section>
        <h2 class="mb-3 text-2xl">Top artists</h2>
        <ol class="grid gap-1">
          <li
            v-for="(artist, index) in artists.slice(0, TOP_ARTISTS)"
            :key="artist.key"
            class="relative overflow-hidden rounded-md px-3 py-2">
            <div
              class="absolute inset-y-0 left-0 bg-secondary"
              :style="{ width: barWidth(artist, artists) }" />
            <div class="relative flex items-center gap-3">
              <span class="w-6 text-right text-muted-foreground">{{ index + 1 }}</span>
              <Flag :code="artist.albums[0].country" :size="18" />
              <div class="min-w-0">
                <div class="truncate font-bold">{{ artist.label }}</div>
                <div class="truncate text-xs text-muted-foreground">
                  {{
                    artist.albums
                      .map(album => `#${album.position} in ${album.year}`)
                      .join(' · ')
                  }}
                </div>
              </div>
              <span class="ml-auto font-bold tabular-nums">{{ artist.points }}</span>
            </div>
          </li>
        </ol>
      </section>

      <section>
        <h2 class="mb-3 text-2xl">Countries</h2>
        <ol class="grid gap-1">
          <li
            v-for="(country, index) in countries"
            :key="country.key"
            class="relative overflow-hidden rounded-md px-3 py-2">
            <div
              class="absolute inset-y-0 left-0 bg-secondary"
              :style="{ width: barWidth(country, countries) }" />
            <div class="relative flex items-center gap-3">
              <span class="w-6 text-right text-muted-foreground">{{ index + 1 }}</span>
              <Flag :code="country.key" :size="18" />
              <div class="min-w-0">
                <div class="truncate font-bold">{{ countryName(country.key) }}</div>
                <div class="text-xs text-muted-foreground">
                  {{ country.albums.length }}
                  {{ country.albums.length === 1 ? 'album' : 'albums' }} · best #{{
                    country.bestPosition
                  }}
                </div>
              </div>
              <span class="ml-auto font-bold tabular-nums">{{ country.points }}</span>
            </div>
          </li>
        </ol>
      </section>
    </CardContent>
  </Card>
</template>
