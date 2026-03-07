import tailwindcss from '@tailwindcss/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import vue from '@vitejs/plugin-vue'
import { fontless } from 'fontless'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import generateSitemap from 'vite-ssg-sitemap'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        VueRouterAutoImports,
        unheadVueComposablesImports,
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/lib'],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      resolvers: [IconsResolver({ prefix: 'I' })],
    }),

    // https://github.com/unplugin/unplugin-icons
    Icons({ autoInstall: true }),

    // https://github.com/vuejs/router
    VueRouter({
      dts: 'src/route-map.d.ts',
      routesFolder: 'src/pages',
    }),

    // https://github.com/unjs/fontaine
    fontless({
      defaults: {
        preload: true,
        weights: [400, 500, 600, 700, 800],
        fallbacks: {
          'sans-serif': ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial'],
          monospace: ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Menlo', 'Consolas'],
        },
      },
    }),

    tailwindcss(),
    vue(),
    vueDevTools(),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap()
    },
  },

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
})
