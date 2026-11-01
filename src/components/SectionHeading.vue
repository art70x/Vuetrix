<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex max-w-2xl flex-col gap-3">
    <span class="eyebrow">{{ eyebrow }}</span>

    <h2 class="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
      {{ title }}
    </h2>

    <p v-if="description" class="leading-relaxed text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
