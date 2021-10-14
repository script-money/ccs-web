import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // process: 'process/browser',
      // stream: 'stream-browserify',
      stream: 'vite-compatible-readable-stream',
      zlib: 'browserify-zlib',
      util: 'util',
      // http: 'http-browserify',
      http: 'stream-http',
      https: 'https-browserify'
      // grpc: '@improbable-eng/grpc-web',
      // 'node-fetch': 'isomorphic-fetch',
      // 'process.env': 'import.meta.env'
    }
  },
  plugins: [
    reactRefresh({
      // Exclude storybook stories and node_modules
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      // Only .tsx files
      include: '**/*.tsx'
    })
  ]
})
