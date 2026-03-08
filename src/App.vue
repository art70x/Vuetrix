<script lang="ts" setup>
const { appname } = useMetadata()

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1',
  author: 'art70x',
  creator: 'art70x',
  robots: 'index, follow',
  ogType: 'website',
  ogSiteName: appname,
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterCreator: 'art70x',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appname}` : appname
  },
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  ],
})
</script>

<template>
  <div>
    <VToaster />
    <VLayout>
      <RouterView />
    </VLayout>
  </div>
</template>
