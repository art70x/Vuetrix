<script lang="ts" setup>
useSeo({
  title: 'Homepage',
  description:
    'Vuetrix is a modern, developer-focused "Vue 3 + TypeScript web app starter". It provides a fast, scalable, and production-ready foundation for building sophisticated web applications.',
  url: 'https://vuetrix.vercel.app',
})
</script>

<template>
  <div class="container">
    <h1 class="title">Vuetrix</h1>
    <p>A Vue 3 starter with file routing, shadcn-vue, and static builds.</p>
  </div>

  <section class="container" id="features">
    <h2>What is included</h2>
    <ul>
      <li>File-based routing with unplugin-vue-router</li>
      <li>Auto-imports for Vue, Vue Router, and VueUse</li>
      <li>shadcn-vue components</li>
      <li>Phosphor icons as components</li>
      <li>Static site generation with a sitemap and robots.txt</li>
      <li>Font preloading through fontless</li>
      <li>Oxlint, Oxfmt, ESLint, and Vitest</li>
    </ul>
  </section>
</template>
