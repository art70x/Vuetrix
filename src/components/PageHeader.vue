<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    description: string;
  }>(),
  {},
);
</script>

<template>
  <section class="border-b bg-muted/20">
    <div class="container-app flex flex-col gap-4 py-14 sm:py-20">
      <span class="eyebrow">{{ eyebrow }}</span>

      <h1
        class="max-w-4xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        {{ title }}
      </h1>

      <p class="max-w-2xl leading-relaxed text-muted-foreground">
        {{ description }}
      </p>
    </div>
  </section>
</template>
