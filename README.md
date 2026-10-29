# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Album data

Lists live in `src/data` and are registered in `src/data/index.ts`.

- **Past years** are plain files: `YYYY.ts`.
- **The latest year** is edited in a plain, gitignored draft `YYYY.local.ts`. The `scramble-data` Vite plugin (`plugins/scramble-data.ts`) writes the obfuscated, committed `YYYY.scrambled.ts` from it on `npm run dev` (and on every save) and on `npm run build`. Never edit the `.scrambled.ts` file by hand. On a fresh clone (e.g. another machine), `npm run dev` recreates any missing draft from its scrambled file.

All data files share the same shape, and drafts must stick to it (they're loaded by Node directly, so only `import type` and `satisfies` are allowed):

```ts
import type { Album } from '@/models'

export default [
  // ...
] satisfies Album[]
```

### Starting a new year (e.g. 2026)

1. Publish the previous year as plain data: `mv src/data/2025.local.ts src/data/2025.ts && git rm src/data/2025.scrambled.ts`
2. Create `src/data/2026.local.ts` and run `npm run dev` to generate `src/data/2026.scrambled.ts`.
3. In `src/data/index.ts`, import `./2025` directly and `./2026.scrambled` wrapped in `unscramble(...)`.
4. Commit `2026.scrambled.ts`; the draft stays local and is restored from it on other machines.

## Stats page

`#/stats` ranks artists and countries by points (#1 = 25 points … #25 = 1) over all past years, or a single year picked from the dropdown. The current year is never counted, so the stats are purely historical and can't spoil the countdown.
