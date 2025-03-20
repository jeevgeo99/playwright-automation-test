
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000, // Set default timeout for all tests
  use: {
    headless: true, // Run tests in headless mode by default
    viewport: { width: 1280, height: 720 }, // Set viewport size
    actionTimeout: 5000, // Action timeout
  },
});