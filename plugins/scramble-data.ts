import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Plugin } from 'vite'
import { scramble, unscramble } from '../src/lib/scramble.ts'

const DRAFT = /^(\d{4})\.local\.ts$/
const SCRAMBLED = /^(\d{4})\.scrambled\.ts$/

const literal = (value: unknown) =>
  typeof value === 'string' && value.includes("'") && !value.includes('"')
    ? JSON.stringify(value)
    : typeof value === 'string'
      ? `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
      : JSON.stringify(value)

function toDraft(albums: Record<string, unknown>[]): string {
  const items = albums.map(
    album =>
      '  {\n' +
      Object.entries(album)
        .map(([key, value]) => `    ${key}: ${literal(value)},\n`)
        .join('') +
      '  },\n'
  )
  return `import type { Album } from '@/models'\n\nexport default [\n${items.join('')}] satisfies Album[]\n`
}

/**
 * Keeps `src/data/YYYY.scrambled.ts` (committed) in sync with the plain
 * `src/data/YYYY.local.ts` draft (gitignored), on dev server start, on every
 * save of the draft, and on build. On a fresh clone the dev server first
 * restores missing drafts from the scrambled files.
 */
export function scrambleData(dataDir: string): Plugin {
  async function generate(file: string) {
    const year = basename(file).match(DRAFT)![1]
    // Loaded with Node's native TypeScript support, so the draft may only use
    // erasable syntax (`import type`, `satisfies`) and no path aliases at runtime.
    const { default: albums } = await import(`${pathToFileURL(file).href}?t=${Date.now()}`)
    if (!Array.isArray(albums)) {
      throw new Error(`${basename(file)} must default-export an array of albums`)
    }

    const target = join(dataDir, `${year}.scrambled.ts`)
    const output =
      `// Generated from ${year}.local.ts by plugins/scramble-data.ts. Do not edit.\n` +
      `export default '${scramble(albums)}'\n`
    if (existsSync(target) && readFileSync(target, 'utf8') === output) return

    writeFileSync(target, output)
  }

  function restoreMissingDrafts(log: (msg: string) => void) {
    for (const name of readdirSync(dataDir)) {
      const year = name.match(SCRAMBLED)?.[1]
      const draft = year && join(dataDir, `${year}.local.ts`)
      if (!draft || existsSync(draft)) continue

      const encoded = readFileSync(join(dataDir, name), 'utf8').match(/export default '(.*)'/s)
      if (!encoded) throw new Error(`Could not read ${name}`)
      writeFileSync(draft, toDraft(unscramble(encoded[1])))
      log(`[scramble-data] restored ${year}.local.ts from ${name}`)
    }
  }

  const drafts = () =>
    readdirSync(dataDir)
      .filter(name => DRAFT.test(name))
      .map(name => join(dataDir, name))

  return {
    name: 'scramble-data',
    async buildStart() {
      for (const file of drafts()) await generate(file)
    },
    configureServer(server) {
      restoreMissingDrafts(msg => server.config.logger.info(msg))

      const onChange = (file: string) => {
        if (!file.startsWith(dataDir) || !DRAFT.test(basename(file))) return
        generate(file).catch(err =>
          server.config.logger.error(`[scramble-data] ${basename(file)}: ${err.message}`)
        )
      }
      server.watcher.on('add', onChange)
      server.watcher.on('change', onChange)
    },
  }
}
