import { defineConfig } from 'oxlint'

export default defineConfig({
  ignorePatterns: ['dev-dist'],
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vue'],
  env: {
    browser: true,
  },
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
  jsPlugins: [{ name: 'unicorn-js', specifier: 'eslint-plugin-unicorn' }],
  rules: {
    'typescript/no-explicit-any': 'error',
    'eslint/no-console': ['error', { allow: ['warn', 'error'] }],

    'unicorn/no-null': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-useless-undefined': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.{ts,vue}'],
      rules: {
        'eslint/complexity': ['warn', { max: 10 }],
        'eslint/no-nested-ternary': 'error',
        'typescript/consistent-type-assertions': ['error', { assertionStyle: 'never' }],

        'unicorn-js/better-regex': 'warn',
        'unicorn-js/custom-error-definition': 'error',
        'unicorn-js/no-unused-properties': 'warn',
        'unicorn-js/consistent-destructuring': 'warn',
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'vue/define-props-destructuring': 'warn',
        'vue/max-props': ['warn', { maxProps: 6 }],
      },
    },
  ],
})
