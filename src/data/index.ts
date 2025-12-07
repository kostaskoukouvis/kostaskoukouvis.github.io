import { Album } from '@/models'
import { topAlbums2024 } from './2024'
import { topAlbums2025 } from './2025'

export const topAlbums: Record<number, Album[]> = {
  // 2023: topAlbums2023,
  2024: topAlbums2024,
  2025: topAlbums2025,
}
