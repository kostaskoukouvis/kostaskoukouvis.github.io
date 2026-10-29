import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import { scrambleData } from './plugins/scramble-data.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    scrambleData(fileURLToPath(new URL('./src/data', import.meta.url))),
    vue(),
    tailwindcss(),
    Icons({ autoInstall: true, compiler: 'vue3' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
