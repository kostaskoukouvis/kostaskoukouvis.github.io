import { CountryCode } from 'vue3-flag-icons'

export interface Album {
  position: number
  artist: string
  title: string
  country: CountryCode
  cover: string
  video: string
  track: string
}
