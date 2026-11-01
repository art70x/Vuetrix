<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-2 focus-visible:top-2 focus-visible:z-50 focus-visible:bg-foreground focus-visible:px-4 focus-visible:py-3 focus-visible:text-background focus-visible:underline"
    >
      Skip to main content
    </a>

    <VNav />

    <main id="main" tabindex="-1" class="flex-1 outline-none">
      <slot />
    </main>

    <VFooter />
  </div>
</template>
