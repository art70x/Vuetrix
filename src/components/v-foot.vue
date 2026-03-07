<script setup lang="ts">
const { appname } = useMetadata()
</script>

<template>
  <footer class="w-full border-t border-muted bg-background">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <!-- Brand -->
        <div class="text-center md:text-left">
          <h3 class="text-xl font-bold text-foreground">{{ appname }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">Building the future, one step at a time.</p>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-wrap justify-center gap-6">
          <a href="/about" class="lnk"> About </a>
          <a href="#features" class="lnk"> Features </a>
        </nav>
      </div>

      <!-- Bottom -->
      <div class="mt-4 border-t border-muted pt-8 text-center">
        <p class="text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} <span class="font-bold">{{ appname }}</span
          >. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "@/main.css";

.lnk {
  @apply text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/80;
}
</style>
