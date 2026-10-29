import type { Album } from '@/models'

// #1 is revealed on Dec 31st, every following position one day earlier
export function revealDate(album: Album): Date {
  const date = new Date(album.year, 11, 31)
  date.setDate(date.getDate() - (album.position - 1))
  return date
}

// Only albums of the current year can still be hidden
export function isRevealed(album: Album, now = new Date()): boolean {
  if (import.meta.env.DEV) return true
  if (album.year !== now.getFullYear()) return true
  return now >= revealDate(album)
}
