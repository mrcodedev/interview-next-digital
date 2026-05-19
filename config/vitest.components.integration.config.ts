import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: [
        "src/components/**/__tests__/integration/**/*.test.ts",
        "src/components/**/__tests__/integration/**/*.test.tsx",
      ],
    },
  })
);
