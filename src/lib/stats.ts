import type { Album } from '@/models'

export const LIST_SIZE = 25

// #1 gets 25 points, #25 gets 1
export const points = (position: number) => LIST_SIZE + 1 - position

export interface RankedEntry {
  key: string
  label: string
  points: number
  albums: Album[]
  years: number[]
  bestPosition: number
}

export function rank(
  albums: Album[],
  keyOf: (album: Album) => string,
  labelOf: (album: Album) => string = keyOf
): RankedEntry[] {
  const entries = new Map<string, RankedEntry>()

  for (const album of albums) {
    const key = keyOf(album)
    if (!key) continue

    let entry = entries.get(key)
    if (!entry) {
      entry = { key, label: labelOf(album), points: 0, albums: [], years: [], bestPosition: Infinity }
      entries.set(key, entry)
    }
    entry.points += points(album.position)
    entry.albums.push(album)
    if (!entry.years.includes(album.year)) entry.years.push(album.year)
    entry.bestPosition = Math.min(entry.bestPosition, album.position)
  }

  return [...entries.values()]
    .map(entry => ({ ...entry, years: entry.years.sort((a, b) => a - b) }))
    .sort(
      (a, b) =>
        b.points - a.points || b.albums.length - a.albums.length || a.bestPosition - b.bestPosition
    )
}

export const rankArtists = (albums: Album[]) =>
  rank(
    albums,
    album => album.artist.trim().toLowerCase(),
    album => album.artist.trim()
  )

export const rankCountries = (albums: Album[]) =>
  rank(albums, album => album.country.trim().toLowerCase())

const SUBDIVISIONS: Record<string, string> = {
  'gb-eng': 'England',
  'gb-sct': 'Scotland',
  'gb-wls': 'Wales',
  'gb-nir': 'Northern Ireland',
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

export function countryName(code: string): string {
  if (SUBDIVISIONS[code]) return SUBDIVISIONS[code]
  try {
    return regionNames.of(code.toUpperCase()) ?? code.toUpperCase()
  } catch {
    return code.toUpperCase()
  }
}
