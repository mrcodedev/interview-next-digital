import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: [
        "e2e/**",
        "**/node_modules/**",
        "**/dist/**",
        "**/coverage/**",
        "src/**/__tests__/integration/**/*.test.ts",
        "src/**/__tests__/integration/**/*.test.tsx",
      ],
    },
  })
);
