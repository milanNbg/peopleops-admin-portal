import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    coverage: {
      exclude: [
        'coverage/**',
        'dist/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.types.ts',
        'src/**/index.ts',
        'src/data/**',
        'src/main.tsx',
        'src/test/**',
        'src/**/*.scss',
      ],
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/context/**/*.{ts,tsx}',
        'src/features/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/routes/**/*.{ts,tsx}',
      ],
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'clover'],
    },
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: './src/test/setup.ts',
  },
})
