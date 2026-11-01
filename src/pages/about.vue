<script setup lang="ts">
import {
  IconExternalLink,
  IconBrandGithub,
  IconGitFork,
  IconHeart,
  IconScale,
} from "@tabler/icons-vue";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { buttonVariants } from "@/components/ui/button";

import PageHeader from "@/components/PageHeader.vue";
import SectionHeading from "@/components/SectionHeading.vue";
import Reveal from "@/components/Reveal.vue";

import { useSeo } from "@/composables/use-seo";

import { STACK } from "@/lib/data";
import { SITE } from "@/lib/site";

// SEO
useSeo({
  title: "About",
  description: "Why Vuetrix exists and how to contribute.",
  path: "/about",
});

// Inspiration projects
const inspirations = [
  {
    name: "Vitesse",
    author: "antfu-collective",
    why: "The blueprint for opinionated Vite starters — project structure, workflow and CI shape all trace back here.",
    path: "https://github.com/antfu-collective/vitesse",
  },
  {
    name: "Nuxpert",
    author: "MFM-347",
    why: "Architectural patterns, CI workflow and formatting standards adapted from the Nuxt world.",
    path: "https://github.com/MFM-347/nuxpert",
  },
  {
    name: "shadcn-vue",
    author: "shadcn ecosystem",
    why: "Accessible primitives copied into your repo instead of hidden in a package.",
    path: "https://www.shadcn-vue.com",
  },
  {
    name: "vue-template",
    author: "alexanderop",
    why: "Source of the Oxlint and ESLint configuration.",
    path: "https://github.com/alexanderop/vue-template",
  },
] as const;

// Stack table headings
const stackHeaders = ["Tool", "Role", "Why it's here"] as const;
</script>

<template>
  <main>
    <!-- PAGE HEADER -->
    <PageHeader
      eyebrow="About"
      title="Built so your first commit is a feature"
      description="Vuetrix started as one developer’s answer to a repeated chore: the first two days of every Vue project spent wiring the same foundations."
    />

    <!-- STORY & MAINTAINER -->
    <section class="container-app grid gap-10 py-16 lg:grid-cols-2">
      <!-- THE STORY -->
      <Reveal class="flex flex-col gap-4">
        <span class="eyebrow">The story</span>

        <h2 class="font-display text-3xl font-semibold">
          Every project begins with the same two days
        </h2>

        <div class="flex flex-col gap-4 leading-relaxed text-muted-foreground">
          <p>
            Install Vite. Add a router. Pick a component strategy. Argue about ESLint rules.
            Configure dark mode. Remember SEO exists. Two days later, the actual product work
            starts.
          </p>

          <p>
            Vuetrix compresses those two days into one clone. It makes a fixed set of well-tested
            decisions — strict TypeScript, file-based routing, shadcn-vue components, token-based
            theming, static generation — and documents each one.
          </p>

          <p>The goal isn’t to be a framework. Frameworks add concepts; Vuetrix removes chores.</p>
        </div>
      </Reveal>

      <!-- MAINTAINER & SITE INFO -->
      <Reveal :delay="100" class="flex flex-col gap-4">
        <!-- MAINTAINER CARD -->
        <Card>
          <CardContent class="p-6">
            <div class="flex items-center gap-4">
              <Avatar class="size-12 bg-brand/15 font-mono text-brand-foreground">
                <AvatarFallback class="bg-brand/15 text-brand-foreground"> A7 </AvatarFallback>
              </Avatar>

              <div>
                <h3 class="font-display font-semibold">art70x</h3>

                <p class="text-sm text-muted-foreground">Creator & maintainer</p>
              </div>
            </div>

            <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
              Solo-maintained and open for contributions. Bugs, ideas and pull requests all land in
              the same place: the GitHub repository.
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <a
                :href="SITE.repo"
                target="_blank"
                rel="noopener noreferrer"
                :class="buttonVariants({ variant: 'outline', size: 'sm' })"
              >
                <IconBrandGithub class="size-4" />
                Repository
              </a>

              <a
                :href="`${SITE.repo}/blob/main/.github/contributing.md`"
                target="_blank"
                rel="noopener noreferrer"
                :class="buttonVariants({ variant: 'outline', size: 'sm' })"
              >
                <IconGitFork class="size-4" />
                Contributing guide
              </a>

              <a
                :href="SITE.license"
                target="_blank"
                rel="noopener noreferrer"
                :class="buttonVariants({ variant: 'outline', size: 'sm' })"
              >
                <IconScale class="size-4" />
                MIT license
              </a>
            </div>
          </CardContent>
        </Card>

        <!-- SITE INFORMATION -->
        <Card>
          <CardContent class="p-6">
            <h3 class="font-display font-semibold">About this site</h3>

            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              This version is implemented natively with Vue 3, TypeScript, Vite, Tailwind CSS and
              shadcn-vue — the same stack documented throughout the site.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>

    <!-- TECHNOLOGY STACK -->
    <section class="border-y bg-muted/30">
      <div class="container-app flex flex-col gap-10 py-16">
        <SectionHeading
          eyebrow="Under the hood"
          title="Eight tools, chosen to compose"
          description="No exotic dependencies — each piece is mainstream, documented and replaceable."
        />

        <Reveal class="overflow-x-auto rounded-xl border bg-card">
          <table class="w-full min-w-150 text-sm">
            <caption class="sr-only">
              Technology stack and the role of each tool in Vuetrix.
            </caption>

            <thead>
              <tr class="border-b">
                <th
                  v-for="header in stackHeaders"
                  :key="header"
                  scope="col"
                  class="h-12 px-4 text-left text-muted-foreground"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in STACK" :key="item.name" class="border-b last:border-0">
                <th scope="row" class="p-4 text-left font-medium">
                  {{ item.name }}
                </th>

                <td class="p-4">
                  <Badge variant="secondary">
                    {{ item.role }}
                  </Badge>
                </td>

                <td class="p-4 text-muted-foreground">
                  {{ item.note }}
                </td>
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>

    <!-- ACKNOWLEDGMENTS -->
    <section class="container-app flex flex-col gap-10 py-16">
      <SectionHeading
        eyebrow="Standing on shoulders"
        title="Acknowledgments"
        description="Vuetrix borrows openly from these projects. If it saves you time, they deserve some of the credit."
      />

      <ul class="grid gap-4 sm:grid-cols-2">
        <Reveal v-for="item in inspirations" :key="item.name" as="li">
          <Card class="card-hover h-full">
            <CardContent class="p-6">
              <div class="flex items-center justify-between gap-3">
                <h3 class="font-display font-semibold">
                  {{ item.name }}
                </h3>

                <Badge variant="outline">
                  {{ item.author }}
                </Badge>
              </div>

              <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
                {{ item.why }}
              </p>

              <a
                :href="item.path"
                target="_blank"
                rel="noopener noreferrer"
                :class="buttonVariants({ variant: 'ghost', size: 'sm' })"
                class="-ml-3 mt-4"
              >
                Visit project
                <IconExternalLink class="size-3.5" />
              </a>
            </CardContent>
          </Card>
        </Reveal>
      </ul>

      <!-- FOOTER MESSAGE -->
      <p class="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <IconHeart class="size-4 text-brand" aria-hidden="true" />

        Made for developers, by developers — and free forever under MIT.
      </p>
    </section>
  </main>
</template>
