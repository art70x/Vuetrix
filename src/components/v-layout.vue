<template>
  <div class="flex min-h-screen flex-col">
    <a
      class="sr-only hover:underline focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:bg-foreground focus-visible:px-4 focus-visible:py-3 focus-visible:text-background"
      href="#content"
    >
      Skip to main content
    </a>
    <VNav />
    <main id="content" tabindex="-1" class="flex-1">
      <slot />
    </main>
    <VFoot />
  </div>
</template>
