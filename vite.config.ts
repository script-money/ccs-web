import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      stream: 'vite-compatible-readable-stream',
      zlib: 'browserify-zlib',
      util: 'util',
      http: 'stream-http',
      https: 'https-browserify'
    }
  },
  plugins: [
    reactRefresh({
      // Exclude storybook stories and node_modules
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      // Only .tsx files
      include: '**/*.tsx'
    })
  ],
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1024 * 1024
  }
})
