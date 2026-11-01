<script setup lang="ts">
import { IconArrowRight, IconCheck, IconCircleDashed, IconMinus } from "@tabler/icons-vue";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import PageHeader from "@/components/PageHeader.vue";
import SectionHeading from "@/components/SectionHeading.vue";
import Reveal from "@/components/Reveal.vue";
import FeatureIcon from "@/components/FeatureIcon.vue";

import { useSeo } from "@/composables/use-seo";

import { COMPARISON, FEATURE_GROUPS, FEATURES, ROADMAP } from "@/lib/data";

// SEO
useSeo({
  title: "Features",
  description: "Twelve preconfigured capabilities for your next Vue app.",
  path: "/features",
});

// Group features once instead of filtering inside the template.
const groupedFeatures = FEATURE_GROUPS.map((group) => ({
  name: group,
  features: FEATURES.filter((feature) => feature.group === group),
}));

// Comparison table headings.
const comparisonHeaders = ["Capability", "Bare Vite template", "Vuetrix"] as const;

// Roadmap badge variants.
function getStatusVariant(status: string) {
  return status === "Planned" ? "default" : "secondary";
}
</script>

<template>
  <main>
    <!-- PAGE HEADER -->
    <PageHeader
      eyebrow="Features"
      title="Batteries included, receipts attached"
      description="Every feature below exists in the repository today — no roadmap items disguised as shipping code."
    />

    <!-- FEATURE GROUPS -->
    <div class="container-app flex flex-col gap-16 py-16">
      <section
        v-for="(group, groupIndex) in groupedFeatures"
        :key="group.name"
        class="flex flex-col"
        :aria-labelledby="`feature-group-${groupIndex}`"
      >
        <Reveal class="mb-8">
          <span class="eyebrow">
            {{ String(groupIndex + 1).padStart(2, "0") }}
          </span>

          <h2 :id="`feature-group-${groupIndex}`" class="mt-2 font-display text-3xl font-semibold">
            {{ group.name }}
          </h2>
        </Reveal>

        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal
            v-for="(feature, index) in group.features"
            :key="feature.title"
            as="li"
            :delay="(index % 3) * 60"
          >
            <Card class="card-hover h-full">
              <CardContent class="p-6">
                <span
                  class="mb-4 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground"
                >
                  <FeatureIcon :name="feature.icon" />
                </span>

                <h3 class="font-display font-semibold">
                  {{ feature.title }}
                </h3>

                <p class="mt-2 text-sm font-medium text-foreground/80">
                  {{ feature.benefit }}
                </p>

                <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {{ feature.detail }}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </ul>
      </section>
    </div>

    <!-- COMPARISON -->
    <section class="border-y bg-muted/30">
      <div class="container-app flex flex-col gap-10 py-16">
        <SectionHeading
          eyebrow="Honest comparison"
          title="What you'd otherwise wire up by hand"
          description="The default Vite template is a great skeleton. Vuetrix is the same skeleton with the plumbing finished."
        />

        <Reveal class="overflow-x-auto rounded-xl border bg-card">
          <table class="w-full min-w-162.5 text-sm">
            <caption class="sr-only">
              Comparison between a bare Vite template and Vuetrix.
            </caption>

            <thead>
              <tr class="border-b">
                <th
                  v-for="header in comparisonHeaders"
                  :key="header"
                  scope="col"
                  class="h-12 px-4 text-left font-medium text-muted-foreground"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in COMPARISON" :key="row.capability" class="border-b last:border-0">
                <th scope="row" class="p-4 text-left font-medium">
                  {{ row.capability }}
                </th>

                <td class="p-4 text-muted-foreground">
                  <IconMinus class="mr-2 inline size-4" aria-hidden="true" />
                  {{ row.bareVite }}
                </td>

                <td class="p-4">
                  <IconCheck class="mr-2 inline size-4 text-success" aria-hidden="true" />
                  {{ row.vuetrix }}
                </td>
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>

    <!-- ROADMAP -->
    <section class="container-app flex flex-col gap-10 py-16">
      <SectionHeading
        eyebrow="Where it's going"
        title="Planned, not promised"
        description="Vuetrix is pre-1.0 and evolving. These are the next recipes under consideration."
      />

      <ul class="grid gap-4 sm:grid-cols-2">
        <Reveal v-for="item in ROADMAP" :key="item.title" as="li">
          <Card class="h-full">
            <CardContent class="p-6">
              <div class="flex items-center justify-between gap-3">
                <h3 class="flex items-center gap-3 font-display font-semibold">
                  <IconCircleDashed
                    class="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {{ item.title }}
                </h3>

                <Badge :variant="getStatusVariant(item.status)">
                  {{ item.status }}
                </Badge>
              </div>

              <p class="mt-4 text-sm text-muted-foreground">
                {{ item.detail }}
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </ul>

      <!-- CTA -->
      <RouterLink
        to="/docs#quick-start"
        :class="buttonVariants({ variant: 'outline' })"
        class="self-center"
      >
        Start building instead
        <IconArrowRight class="size-4" />
      </RouterLink>
    </section>
  </main>
</template>
