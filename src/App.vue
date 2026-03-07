<script lang="ts" setup>
const {appname, description} = useMetadata()

useSeoMeta({
  title: appname,
  description,
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
