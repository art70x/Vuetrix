<script setup lang="ts">
import type { Component } from "vue";

import {
  IconBolt,
  IconShieldCheck,
  IconLayoutGrid,
  IconPalette,
  IconMoon,
  IconTriangleSquareCircle,
  IconFolderOpen,
  IconSparkles,
  IconGauge,
  IconFileSearch,
  IconPackage,
  IconTypography,
} from "@tabler/icons-vue";

const props = defineProps<{ name: string }>();

const icons: Record<string, Component> = {
  IconBolt,
  IconShieldCheck,
  IconLayoutGrid,
  IconPalette,
  IconMoon,
  IconTriangleSquareCircle,
  IconFolderOpen,
  IconSparkles,
  IconGauge,
  IconFileSearch,
  IconPackage,
  IconTypography,
};

const fallbackIcon = IconSparkles;
</script>

<template>
  <component :is="icons[props.name] ?? fallbackIcon" class="size-4.5" aria-hidden="true" />
</template>
