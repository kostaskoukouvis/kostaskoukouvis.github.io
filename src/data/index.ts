import { unscramble } from '@/lib/scramble'
import type { Album } from '@/models'
import topAlbums2020 from './2020'
import topAlbums2021 from './2021'
import topAlbums2022 from './2022'
import topAlbums2023 from './2023'
import topAlbums2024 from './2024'
import topAlbums2025 from './2025.scrambled'

export const topAlbums: Record<number, Album[]> = {
  2020: topAlbums2020,
  2021: topAlbums2021,
  2022: topAlbums2022,
  2023: topAlbums2023,
  2024: topAlbums2024,
  2025: unscramble(topAlbums2025),
}
