/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  plugins: [
    'prettier-plugin-organize-attributes',
    'prettier-plugin-css-order',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
  ],
  attributeGroups: [
    '^((v-bind)?:?|v-)is$',
    '^v-for$',
    '^v-(if|else-if|else|show|cloak)$',
    '^v-(once|pre|memo)$',
    '^(v-bind)?:?id$',
    '^(v-bind)?:?key$',
    '^(v-bind)?:?ref$',
    '^(v-)?slot$',
    '^#',
    '^v-model$',
    '^v-(?!bind(:|$)|on(:|$)|html$|text$)',
    '^class$',
    '^(v-bind)?:class$',
    '^((v-bind)?:)?(?!data-|v-|:|@|#)',
    '$DEFAULT',
    '^title$',
    '^aria-',
    '^((v-bind)?:)?data-',
    '^v-bind$',
    '^v-on:',
    '^@',
    '^v-html$',
    '^v-text$',
  ],
  cssDeclarationSorterOrder: 'frakto',
  cssDeclarationSorterKeepOverrides: false,
  tailwindStylesheet: './src/main.css',
  tailwindPreserveWhitespace: true,
  tailwindPreserveDuplicates: true,
}
