<script setup lang="ts">
import { computed, ref } from "vue";
import { IconSearch, IconZoomCancel, IconX } from "@tabler/icons-vue";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import PageHeader from "@/components/PageHeader.vue";
import DemoCard from "@/components/DemoCard.vue";

import { useSeo } from "@/composables/use-seo";
import { SHOWCASE_ITEMS } from "@/lib/data";

// SEO
useSeo({
  title: "Component Showcase",
  description: "Interactive shadcn-vue components running live.",
  path: "/showcase",
});

// Categories
const categories = ["All", "Actions", "Forms", "Overlays", "Feedback", "Data display"] as const;

type Category = (typeof categories)[number];

// State
const query = ref("");
const category = ref<Category>("All");

// Normalized search query
const normalizedQuery = computed(() => query.value.trim().toLowerCase());

// Filtered showcase items
const filtered = computed(() => {
  return SHOWCASE_ITEMS.filter((item) => {
    const matchesCategory = category.value === "All" || item.category === category.value;

    const searchableText = [item.name, item.blurb, item.category].join(" ").toLowerCase();

    const matchesQuery = !normalizedQuery.value || searchableText.includes(normalizedQuery.value);

    return matchesCategory && matchesQuery;
  });
});

// Reset filters
function clearFilters() {
  query.value = "";
  category.value = "All";
}
</script>

<template>
  <main>
    <PageHeader
      eyebrow="Showcase"
      title="The components, running live"
      description="Accessible shadcn-vue primitives, rebuilt natively in Vue. Nothing on this page is a screenshot."
    />

    <section class="container-app flex flex-col gap-8 py-12" aria-label="Component showcase">
      <!-- SEARCH AND FILTERS -->
      <div class="flex flex-col gap-4">
        <!-- SEARCH -->
        <div class="relative max-w-md">
          <IconSearch
            class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <Input
            v-model="query"
            type="search"
            placeholder="Search components..."
            aria-label="Search components"
            class="pl-9 pr-9"
          />

          <button
            v-if="query"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
            @click="query = ''"
          >
            <IconX class="size-4" />
          </button>
        </div>

        <!-- CATEGORY FILTERS -->
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter components by category">
          <Button
            v-for="item in categories"
            :key="item"
            type="button"
            size="sm"
            :variant="category === item ? 'default' : 'outline'"
            :aria-pressed="category === item"
            @click="category = item"
          >
            {{ item }}
          </Button>
        </div>
      </div>

      <!-- RESULTS COUNT -->
      <p class="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
        {{ filtered.length }} of {{ SHOWCASE_ITEMS.length }}
        components

        <span v-if="category !== 'All'"> in {{ category }} </span>
      </p>

      <!-- EMPTY STATE -->
      <div
        v-if="filtered.length === 0"
        class="rounded-xl border px-6 py-16 text-center"
        role="status"
      >
        <IconZoomCancel class="mx-auto size-7 text-muted-foreground" aria-hidden="true" />

        <h2 class="mt-4 font-display text-xl font-semibold">No components found</h2>

        <p class="mt-2 text-sm text-muted-foreground">
          No results for "{{ query }}". Try searching for button, form, or table.
        </p>

        <Button variant="outline" class="mt-5" @click="clearFilters">
          Clear search and filters
        </Button>
      </div>

      <!-- SHOWCASE GRID -->
      <div v-else class="grid min-w-0 items-start gap-6 xl:grid-cols-2">
        <DemoCard v-for="item in filtered" :key="item.id" :item="item" />
      </div>
    </section>
  </main>
</template>
