import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // Enables `test`, `describe`, etc., globally
    globals: true,
    // Simulates a browser environment for React tests
    environment: "jsdom",
    // Ensures Jest setup runs before tests
    setupFiles: "./src/setupTests.js",
  },
});
