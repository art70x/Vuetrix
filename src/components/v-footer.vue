<script setup lang="ts">
import { IconBrandGithub } from "@tabler/icons-vue";

import { MAIN_NAV, SITE } from "@/lib/site";
</script>

<template>
  <footer class="border-t">
    <div class="container-app grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
      <!-- Brand -->
      <div class="flex flex-col gap-3">
        <Logo />

        <p class="max-w-sm text-sm leading-relaxed text-muted-foreground">
          The opinionated Vue 3 starter for developers who want to build features, not
          configuration.
        </p>

        <p class="text-xs text-muted-foreground">
          MIT licensed · Built with Vue, Vite and shadcn-vue.
        </p>
      </div>

      <!-- Navigation -->
      <div>
        <h2 class="mb-3 text-sm font-semibold">Explore</h2>

        <nav aria-label="Footer navigation" class="flex flex-col items-start gap-2">
          <RouterLink
            v-for="item in MAIN_NAV"
            :key="item.to"
            :to="item.to"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>

      <!-- Project links -->
      <div>
        <h2 class="mb-3 text-sm font-semibold">Project</h2>

        <div class="flex flex-col items-start gap-2">
          <a
            :href="SITE.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBrandGithub class="size-4" aria-hidden="true" />
            GitHub repository
          </a>

          <a
            :href="SITE.license"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            MIT license
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
