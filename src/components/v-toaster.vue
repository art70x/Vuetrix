<script setup lang="ts">
import { Toaster, type ToasterProps } from "vue-sonner";

import {
  IconLoader2,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
  IconAlertTriangle,
  IconX,
} from "@tabler/icons-vue";

import { cn } from "@/lib/utils";
import { resolvedTheme } from "@/composables/use-appearance";

import "vue-sonner/style.css";

const props = defineProps<ToasterProps>();
</script>

<template>
  <Toaster
    v-bind="props"
    position="bottom-right"
    :close-button="true"
    close-button-position="top-right"
    :duration="5000"
    :class="cn('toaster group', props.class)"
    :theme="resolvedTheme"
  >
    <template #loading-icon>
      <IconLoader2 class="size-4 animate-spin" />
    </template>

    <template #success-icon>
      <IconCircleCheck class="size-4" />
    </template>

    <template #error-icon>
      <IconCircleX class="size-4" />
    </template>

    <template #info-icon>
      <IconInfoCircle class="size-4" />
    </template>

    <template #warning-icon>
      <IconAlertTriangle class="size-4" />
    </template>

    <template #close-icon>
      <IconX class="size-4" />
    </template>
  </Toaster>
</template>
