import { defineConfig } from 'oxlint'

export default defineConfig({
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vue'],
  env: {
    browser: true,
  },
  categories: {
    correctness: 'error',
    perf: 'warn',
  },
  options: { typeCheck: true },
})
