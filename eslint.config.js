import { importX } from "eslint-plugin-import-x";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { configs as reactHooksConfigs } from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { configs as sonarConfigs } from "eslint-plugin-sonarjs";
import pluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import { configs as tsConfigs } from "typescript-eslint";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    extends: ["js/recommended"],
    plugins: { js },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  pluginUnicorn.configs.recommended,
  reactHooksConfigs["recommended-latest"],
  reactRefresh.configs.vite,
  sonarConfigs.recommended,
  ...tsConfigs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
    },
  },
]);
