<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <Toaster
    position="bottom-right"
    :closeButton="true"
    closeButtonPosition="top-right"
    :duration="5000"
    class="group"
    :toastOptions="{
      style: {
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--border-radius': 'var(--radius)',
      },
    }"
  >
    <template #loading-icon>
      <div>
        <IPhSpinnerGapBold class="size-4 animate-spin" />
      </div>
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
