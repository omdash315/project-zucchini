import { config as baseConfig } from "./packages/eslint-config/base.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/.turbo/**",
      "**/next-env.d.ts",
    ],
  },
];
