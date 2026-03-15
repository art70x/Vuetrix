<script setup lang="ts">
import { toast } from 'vue-sonner'

import { toggleDark } from '@/lib/utils'

const { appname } = useMetadata()
const currentTheme = isDark ? 'dark' : 'light'

const toggleTheme = () => {
  toggleDark()
  toast('Theme', { description: `Theme changed to ${currentTheme} mode` })
}
</script>

<template>
  <nav class="sticky border border-muted bg-background shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <!-- Left -->
        <div class="flex items-center space-x-8">
          <h2 class="text-xl font-bold text-foreground">{{ appname }}</h2>

          <div class="hidden items-center space-x-8 md:flex">
            <RouterLink to="/" class="lnk"> Home </RouterLink>
            <RouterLink to="/about" class="lnk"> About </RouterLink>
            <a href="#features" class="lnk"> Features </a>
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-4">
          <Button @click="toggleTheme()" variant="outline" size="icon-sm">
            <IPhMoon
              class="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            />
            <IPhSun
              class="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@reference "@/main.css";

.lnk {
  @apply text-sm font-medium text-muted-foreground transition-colors hover:text-foreground/80;
}
</style>
