<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { IconBrandGithub, IconMenu2, IconMoon, IconSearch, IconSun } from "@tabler/icons-vue";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { commandOpen } from "@/composables/use-command";
import { theme } from "@/composables/use-appearance";
import { MAIN_NAV, SITE } from "@/lib/site";

const mobileOpen = ref(false);
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false;
  },
);

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
}

function openSearch() {
  commandOpen.value = true;
  mobileOpen.value = false;
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
    <div class="container-app flex h-16 items-center justify-between gap-4">
      <!-- Logo -->
      <RouterLink to="/" aria-label="Vuetrix home">
        <VLogo />
      </RouterLink>

      <!-- Desktop navigation -->
      <nav aria-label="Primary navigation" class="hidden items-center gap-1 lg:flex">
        <RouterLink
          v-for="item in MAIN_NAV"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          active-class="bg-accent text-accent-foreground"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Search -->
        <Button
          variant="outline"
          class="hidden h-9 w-56 justify-start gap-2 px-3 font-normal text-muted-foreground sm:inline-flex"
          aria-keyshortcuts="Control+K Meta+K"
          @click="openSearch"
        >
          <IconSearch class="size-4" aria-hidden="true" />
          Search documentation

          <kbd class="ml-auto rounded border px-1.5 py-0.5 font-mono text-[10px]"> Ctrl K </kbd>
        </Button>

        <!-- GitHub -->
        <a
          :href="SITE.repo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vuetrix on GitHub"
          :class="buttonVariants({ variant: 'outline', size: 'icon' })"
          class="size-9 min-h-9"
        >
          <IconBrandGithub class="size-4" aria-hidden="true" />
        </a>

        <!-- Theme -->
        <Button
          variant="outline"
          size="icon"
          class="size-9 min-h-9"
          aria-label="Toggle color theme"
          @click="toggleTheme"
        >
          <IconSun class="size-4 dark:hidden" aria-hidden="true" />
          <IconMoon class="hidden size-4 dark:block" aria-hidden="true" />
        </Button>

        <!-- Mobile navigation -->
        <Sheet v-model:open="mobileOpen">
          <SheetTrigger as-child>
            <Button
              variant="outline"
              size="icon"
              class="size-9 min-h-9 lg:hidden"
              aria-label="Open navigation menu"
            >
              <IconMenu2 class="size-4" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" class="flex w-72 flex-col">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription> Explore the Vuetrix starter. </SheetDescription>
            </SheetHeader>

            <nav aria-label="Mobile navigation" class="flex flex-col gap-1 px-4">
              <RouterLink
                v-for="item in MAIN_NAV"
                :key="item.to"
                :to="item.to"
                class="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted"
                active-class="bg-accent text-accent-foreground"
              >
                {{ item.label }}
              </RouterLink>

              <Button
                variant="ghost"
                class="mt-3 h-auto justify-start gap-3 px-3 py-3 font-normal text-muted-foreground"
                aria-keyshortcuts="Control+K Meta+K"
                @click="openSearch"
              >
                <IconSearch class="size-4" aria-hidden="true" />
                Search documentation

                <kbd class="ml-auto rounded border px-1.5 py-0.5 font-mono text-[10px]">
                  Ctrl K
                </kbd>
              </Button>
            </nav>

            <!-- Mobile GitHub link -->
            <div class="mt-auto p-4">
              <a
                :href="SITE.repo"
                target="_blank"
                rel="noopener noreferrer"
                :class="buttonVariants({ variant: 'outline' })"
                class="w-full gap-2"
              >
                <IconBrandGithub class="size-4" aria-hidden="true" />
                View source on GitHub
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
