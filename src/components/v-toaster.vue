<script lang="ts" setup>
import { Toaster, type ToasterProps } from 'vue-sonner'

import { cn } from '@/lib/utils'

import 'vue-sonner/style.css'

const properties = defineProps<ToasterProps>()

const currentTheme = computed(() => (isDark.value ? 'dark' : 'light'))
</script>

<template>
  <Toaster
    v-bind="properties"
    position="bottom-right"
    :close-button="true"
    close-button-position="top-right"
    :duration="5000"
    :class="cn('toaster group', properties.class)"
    :theme="currentTheme"
  >
    <template #loading-icon>
      <IPhSpinnerGapBold class="size-4 animate-spin" />
    </template>

    <template #success-icon>
      <IPhCheckCircleFill class="size-4" />
    </template>

    <template #error-icon>
      <IPhWarningCircleFill class="size-4" />
    </template>

    <template #info-icon>
      <IPhInfoFill class="size-4" />
    </template>

    <template #warning-icon>
      <IPhWarningFill class="size-4" />
    </template>

    <template #close-icon>
      <IPhX class="size-4" />
    </template>
  </Toaster>
</template>
