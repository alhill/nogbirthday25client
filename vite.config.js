import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    vanillaExtractPlugin()
  ],
})
