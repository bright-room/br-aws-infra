export default /** @type {import('prettier').Config} */ {
  trailingComma: "es5",
  arrowParens: "avoid",
  printWidth: 120,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  plugins: ["prettier-plugin-organize-imports"],
}
