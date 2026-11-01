<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import { IconAlertCircle, IconInfoCircle, IconBulb } from "@tabler/icons-vue";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CodeBlock from "@/components/CodeBlock.vue";
import CopyButton from "@/components/CopyButton.vue";
import InstallBox from "@/components/InstallBox.vue";
import PageHeader from "@/components/PageHeader.vue";

import { useSeo } from "@/composables/use-seo";

import { CODE_SAMPLES, DOCS_SECTIONS, FAQS, PROJECT_TREE, SCRIPTS } from "@/lib/data";

// SEO
useSeo({
  title: "Docs",
  description: "The complete Vuetrix guide.",
  path: "/docs",
});

// Navigation state
const active = ref("introduction");

let observer: IntersectionObserver | undefined;

// Route examples
const routes = [
  ["src/pages/index.vue", "/", "Home page"],
  ["src/pages/about.vue", "/about", "Static page"],
  ["src/pages/docs/[id].vue", "/docs/:id", "Dynamic parameter"],
  ["src/pages/[...path].vue", "/:path(.*)*", "Catch-all 404"],
] as const;

// Table headings
const routeHeaders = ["File", "Route", "Purpose"] as const;

// Navigate to a documentation section
function go(id: string): void {
  const target = document.querySelector<HTMLElement>(`#${CSS.escape(id)}`);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  globalThis.window.history.replaceState(
    undefined,
    "",
    `${globalThis.window.location.pathname}${globalThis.window.location.search}#${encodeURIComponent(id)}`,
  );

  active.value = id;
}

// Mobile navigation handler
function handleSectionChange(event: Event): void {
  if (event.target instanceof HTMLSelectElement) {
    go(event.target.value);
  }
}

// Validate and restore the initial URL hash
function restoreHash() {
  const id = decodeURIComponent(globalThis.window.location.hash.slice(1));

  if (!id) return;

  if (document.querySelector<HTMLElement>(`#${CSS.escape(id)}`)) {
    active.value = id;
  }
}

onMounted(() => {
  restoreHash();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = entry.target.id;
        }
      });
    },
    {
      rootMargin: "-96px 0px -65% 0px",
    },
  );

  document.querySelectorAll<HTMLElement>("[data-doc-section]").forEach((section) => {
    observer?.observe(section);
  });
});

// Clean up observer
onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <main>
    <!-- PAGE HEADER -->
    <PageHeader
      eyebrow="Documentation"
      title="From git clone to deployed in one sitting"
      description="Everything the starter does, in the order you’ll meet it. Code samples are real files from the repository."
    />

    <div class="container-app grid gap-10 py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
      <!-- DOCUMENTATION NAVIGATION -->
      <aside>
        <!-- Mobile navigation -->
        <select
          :value="active"
          class="h-10 w-full rounded-md border bg-background px-3 text-sm lg:hidden"
          aria-label="Jump to docs section"
          @change="handleSectionChange"
        >
          <option v-for="section in DOCS_SECTIONS" :key="section.id" :value="section.id">
            {{ section.label }}
          </option>
        </select>

        <!-- Desktop navigation -->
        <nav class="sticky top-24 hidden lg:block" aria-label="Documentation sections">
          <button
            v-for="section in DOCS_SECTIONS"
            :key="section.id"
            type="button"
            class="block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition-colors"
            :class="
              active === section.id
                ? 'border-brand font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            "
            :aria-current="active === section.id ? 'location' : undefined"
            @click="go(section.id)"
          >
            {{ section.label }}
          </button>
        </nav>
      </aside>

      <!-- DOCUMENTATION CONTENT -->
      <div class="flex min-w-0 flex-col gap-14 text-[15px] leading-relaxed">
        <!-- INTRODUCTION -->
        <section id="introduction" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Introduction</h2>

          <div class="mt-4 space-y-5">
            <p>
              Vuetrix is an opinionated starting point for Vue 3 applications. It answers the
              questions every project asks on day one — routing, components, theming, linting, SEO,
              static builds — and gets out of the way afterwards. Everything it configures lives in
              plain files you can read and change.
            </p>

            <p>
              It’s a good fit for single-page or statically-generated apps with no server
              assumptions. If you need server rendering, API routes or middleware, reach for Nuxt
              instead.
            </p>

            <Alert>
              <IconInfoCircle class="size-4" />

              <AlertTitle>Native Vue implementation</AlertTitle>

              <AlertDescription>
                This site runs on Vue 3 + TypeScript with shadcn-vue components, matching the
                starter it documents.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <!-- QUICK START -->
        <section id="quick-start" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Quick start</h2>

          <div class="mt-4 space-y-5">
            <p>
              You need <strong>Node.js 20 or newer</strong> and a package manager. Pick yours and
              the commands follow you around the site.
            </p>

            <InstallBox />

            <p>
              Open
              <code class="rounded bg-muted px-1.5 font-mono text-sm"> http://localhost:3000 </code
              >. Edit any file in
              <code class="rounded bg-muted px-1.5 font-mono text-sm"> src/pages </code>
              and the browser updates.
            </p>

            <Alert>
              <IconBulb class="size-4" />

              <AlertTitle>Skip the clone</AlertTitle>

              <AlertDescription>
                On GitHub, choose Use this template to start a fresh repository with the Vuetrix
                history stripped out.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <!-- PROJECT STRUCTURE -->
        <section id="project-structure" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Project structure</h2>

          <div class="mt-4 space-y-5">
            <p>
              The layout is deliberately shallow. If you know Vue, you already know where everything
              lives:
            </p>

            <CodeBlock :code="PROJECT_TREE" lang="text" filename="repository layout" />

            <ul class="list-disc space-y-2 pl-5 text-muted-foreground marker:text-brand">
              <li>
                <code>src/pages</code> is the router. Files become routes; folders become nested
                paths.
              </li>

              <li>
                <code>src/components/ui</code> holds shadcn-vue components copied into your repo.
              </li>

              <li><code>src/composables</code> is where shared logic goes.</li>

              <li><code>vite.config.ts</code> is the only config file most projects ever touch.</li>
            </ul>
          </div>
        </section>

        <!-- ROUTING -->
        <section id="routing" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Routing & pages</h2>

          <div class="mt-4 space-y-5">
            <p>
              Routes are generated from the file tree. A file’s path is its URL; its name becomes a
              typed route name.
            </p>

            <div class="overflow-x-auto rounded-lg border">
              <table class="w-full min-w-140 text-sm">
                <thead>
                  <tr class="border-b">
                    <th
                      v-for="header in routeHeaders"
                      :key="header"
                      scope="col"
                      class="h-11 px-4 text-left text-muted-foreground"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="route in routes" :key="route[0]" class="border-b last:border-0">
                    <td class="p-3 font-mono text-xs">
                      {{ route[0] }}
                    </td>

                    <td class="p-3 font-mono text-xs">
                      {{ route[1] }}
                    </td>

                    <td class="p-3 text-muted-foreground">
                      {{ route[2] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock v-bind="CODE_SAMPLES.page" />
          </div>
        </section>

        <!-- STYLING -->
        <section id="styling" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Styling & theming</h2>

          <div class="mt-4 space-y-5">
            <p>
              Tailwind utilities are driven by CSS custom properties. Colors, radii and elevations
              are tokens, so changing a handful of variables restyles the entire app — dark mode
              included.
            </p>

            <CodeBlock v-bind="CODE_SAMPLES.theme" />

            <p>
              The theme toggle persists the visitor’s choice, follows the OS when set to system, and
              applies the class before paint.
            </p>

            <Alert>
              <IconBulb class="size-4" />

              <AlertTitle>Try before you clone</AlertTitle>

              <AlertDescription>
                The
                <RouterLink to="/playground" class="text-foreground underline">
                  theme playground
                </RouterLink>
                lets you push accent colors and corner radii around live, then copy the resulting
                tokens.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <!-- COMPONENTS -->
        <section id="components" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Components</h2>

          <div class="mt-4 space-y-5">
            <p>
              Vuetrix adopts the shadcn model: components are source code you own. The CLI copies
              accessible reka-ui primitives into
              <code>src/components/ui</code>, themed with your tokens.
            </p>

            <div class="flex items-center gap-2 rounded-lg border border-code bg-code px-4 py-2">
              <code class="flex-1 font-mono text-sm text-code-foreground">
                pnpm run add dialog
              </code>

              <CopyButton text="pnpm add dialog" on-code />
            </div>

            <p>
              See the components used across this site in the
              <RouterLink to="/showcase" class="text-foreground underline">
                component showcase </RouterLink
              >.
            </p>
          </div>
        </section>

        <!-- SCRIPTS -->
        <section id="scripts" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Scripts reference</h2>

          <div class="mt-4 overflow-x-auto rounded-lg border">
            <table class="w-full min-w-150 text-sm">
              <thead>
                <tr class="border-b">
                  <th scope="col" class="h-11 px-4 text-left">Command</th>

                  <th scope="col" class="h-11 px-4 text-left">What it does</th>

                  <th scope="col" class="h-11 px-4 text-left">
                    <span class="sr-only">Copy command</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="script in SCRIPTS" :key="script.command" class="border-b last:border-0">
                  <td class="p-3 font-mono text-xs">
                    {{ script.command }}
                  </td>

                  <td class="p-3 text-muted-foreground">
                    {{ script.description }}
                  </td>

                  <td class="p-2">
                    <CopyButton :text="script.command" :id="script.command" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- DEPLOYMENT -->
        <section id="deployment" data-doc-section class="scroll-mt-24">
          <h2 class="font-display text-2xl font-semibold">Deployment</h2>

          <div class="mt-4 space-y-5">
            <p>
              <code>pnpm build</code> type-checks the project, pre-renders every route, and emits
              static files to <code>dist</code>. The output is plain HTML, CSS and JS.
            </p>

            <CodeBlock
              terminal
              lang="bash"
              filename="build output"
              :code="`pnpm build
# → vue-tsc: no type errors
# → static routes rendered
# → dist/ ready to deploy`"
            />

            <Alert>
              <IconAlertCircle class="size-4" />

              <AlertTitle>One caveat for SPAs</AlertTitle>

              <AlertDescription>
                If you skip pre-rendered routes and serve client-side navigation, configure your
                host to rewrite unknown paths to index.html.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <!-- FAQ -->
        <section id="faq" data-doc-section class="scroll-mt-24">
          <h2 class="mb-4 font-display text-2xl font-semibold">FAQ</h2>

          <Accordion type="single" collapsible>
            <AccordionItem v-for="(faq, index) in FAQS" :key="faq.q" :value="`doc-${index}`">
              <AccordionTrigger>
                {{ faq.q }}
              </AccordionTrigger>

              <AccordionContent class="leading-relaxed text-muted-foreground">
                {{ faq.a }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  </main>
</template>
