<script setup lang="ts">
import { buttonVariants } from "@/components/ui/button";
</script>

<template>
  <main
    class="container-app flex min-h-[60dvh] flex-col items-center justify-center gap-5 py-20 text-center"
  >
    <!-- ERROR CODE -->
    <span class="font-mono text-sm font-medium text-brand" aria-label="Error 404"> 404 </span>

    <!-- ERROR MESSAGE -->
    <h1 class="font-display text-4xl font-semibold">This route hasn’t been generated</h1>

    <p class="max-w-md text-muted-foreground">
      The page you’re looking for doesn’t exist. Head home or browse the documentation.
    </p>

    <!-- NAVIGATION ACTIONS -->
    <div class="flex flex-wrap justify-center gap-3">
      <RouterLink to="/" :class="buttonVariants()"> Back home </RouterLink>

      <RouterLink to="/docs" :class="buttonVariants({ variant: 'outline' })">
        Read the docs
      </RouterLink>
    </div>
  </main>
</template>
