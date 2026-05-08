import { defineConfig, devices } from '@playwright/test'

const localBrowserChannel = process.env.CI ? {} : { channel: 'chrome' as const }

export default defineConfig({
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:5173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...localBrowserChannel },
    },
  ],
})
