// @ts-check
import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

export default tseslint.config(eslintConfigPrettier, eslint.configs.recommended, ...tseslint.configs.recommended, {
  ignores: ["node_modules/", "**/cdk.out/"],
  plugins: {
    "simple-import-sort": eslintPluginSimpleImportSort,
  },
})
