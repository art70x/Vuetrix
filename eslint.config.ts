import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from 'eslint-config-prettier/flat'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  globalIgnores(['**/dist/**', '**/coverage/**', '**/node_modules/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  pluginUnicorn.configs.recommended,

  // Disabled rules
  {
    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/prevent-abbreviations': 'warn',
    },
  },

  // Vue component rules
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': ['warn', { ignores: ['App'] }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/no-unused-properties': ['error', { groups: ['props', 'data', 'computed', 'methods'] }],
      'vue/no-unused-refs': 'error',
      'vue/define-props-destructuring': 'warn',
      'vue/prefer-use-template-ref': 'error',
      'vue/max-template-depth': ['error', { maxDepth: 8 }],
    },
  },

  // TypeScript style guide
  {
    files: ['src/**/*.{ts,vue}'],
    rules: {
      complexity: ['warn', { max: 10 }],
      'no-nested-ternary': 'error',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      'no-restricted-syntax': [
        'error',
        { selector: 'TSEnumDeclaration', message: 'Use literal unions instead of enums.' },
        {
          selector: 'IfStatement > :not(IfStatement).alternate',
          message: 'Avoid else. Use early returns.',
        },
        { selector: 'TryStatement', message: 'Use tryCatch() instead of try/catch.' },
      ],
    },
  },

  // Disable rules handled by Oxlint
  ...pluginOxlint.buildFromOxlintConfigFile('./oxlint.config.ts'),

  skipFormatting,
)
