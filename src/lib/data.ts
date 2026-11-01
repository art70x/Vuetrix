/**
 * Central content model for the Vuetrix site.
 * Keep these descriptions aligned with package.json, vite.config.ts,
 * the source tree, and the components that are actually implemented.
 */

export interface Feature {
  /** Must match a key exported by src/components/FeatureIcon.vue. */
  icon: string;
  title: string;
  benefit: string;
  detail: string;
  group: "Core" | "Interface" | "Developer experience" | "Shipping";
}

export const FEATURES: Feature[] = [
  {
    icon: "IconBolt",
    title: "Vite-powered development",
    benefit: "A fast feedback loop while you build.",
    detail:
      "Vite+ provides the development and build workflow, with Vue single-file component support, hot module replacement, and a production build command configured for this project.",
    group: "Core",
  },
  {
    icon: "IconShieldCheck",
    title: "Strict TypeScript",
    benefit: "Catch type errors before they reach production.",
    detail:
      "TypeScript is configured for the Vue application, and vue-tsc provides project-wide type checking. The production build runs the type-check script before static generation.",
    group: "Core",
  },
  {
    icon: "IconLayoutGrid",
    title: "shadcn-vue components",
    benefit: "Composable UI components stored in your project.",
    detail:
      "The interface uses local Vue component files built on Reka UI primitives and styled with Tailwind CSS. You can inspect, edit, and extend the components in src/components/ui.",
    group: "Interface",
  },
  {
    icon: "IconPalette",
    title: "Tailwind CSS 4 design tokens",
    benefit: "Keep the visual system consistent.",
    detail:
      "Tailwind CSS 4 powers utility styling, while CSS custom properties define the application's colors, surfaces, typography, and other design tokens in the global stylesheet.",
    group: "Interface",
  },
  {
    icon: "IconMoon",
    title: "Configurable appearance",
    benefit: "Choose light, dark, or system appearance.",
    detail:
      "The appearance composable manages light, dark, and system themes, plus accent-color and border-radius preferences. Preferences are persisted in local storage when it is available.",
    group: "Interface",
  },
  {
    icon: "IconTriangleSquareCircle",
    title: "Tabler Icons",
    benefit: "Consistent icons as Vue components.",
    detail:
      "The project uses @tabler/icons-vue. Import the icons needed by a component directly from the package and use them as Vue components.",
    group: "Interface",
  },
  {
    icon: "IconFolderOpen",
    title: "File-based routing",
    benefit: "Create a page file to define a route.",
    detail:
      "Vue Router's file-based routing plugin discovers page components in src/pages and generates typed route declarations. The catch-all page handles unmatched paths.",
    group: "Developer experience",
  },
  {
    icon: "IconSparkles",
    title: "Auto imports",
    benefit: "Reduce repetitive import statements.",
    detail:
      "unplugin-auto-import and unplugin-vue-components are configured to auto-import supported Vue APIs, composables, and components, with generated TypeScript declaration files.",
    group: "Developer experience",
  },
  {
    icon: "IconGauge",
    title: "Integrated code quality tools",
    benefit: "Lint, format, and check from one toolchain.",
    detail:
      "Vite+ provides the project's check, lint, and formatting commands. Oxlint supplies lint rules, Oxfmt formats code, and Taze is available through the dependency-update script.",
    group: "Developer experience",
  },
  {
    icon: "IconFileSearch",
    title: "SEO composables",
    benefit: "Set page metadata alongside page content.",
    detail:
      "The useSeo and useMetadata composables centralize page metadata, including titles and descriptions, using Unhead's Vue integration.",
    group: "Shipping",
  },
  {
    icon: "IconPackage",
    title: "Static site generation",
    benefit: "Pre-render routes as static HTML.",
    detail:
      "vite-ssg generates static HTML for the configured routes. The Vite configuration also generates a sitemap and robots.txt after the build finishes.",
    group: "Shipping",
  },
  {
    icon: "IconTypography",
    title: "Locally hosted variable fonts",
    benefit: "Use the project's font files without a Google Fonts request.",
    detail:
      "Inter, Space Grotesk, and JetBrains Mono are provided through Fontsource Variable packages and the project's local font stylesheet.",
    group: "Shipping",
  },
];

export const FEATURE_GROUPS = ["Core", "Interface", "Developer experience", "Shipping"] as const;

/* ------------------------------ Tech stack ------------------------------ */

export const STACK = [
  { name: "Vue 3", role: "Framework", note: "Composition API + single-file components" },
  {
    name: "Vite+",
    role: "Toolchain",
    note: "Development, build, check, lint, format, and test workflows",
  },
  { name: "TypeScript", role: "Language", note: "Vue-aware type checking with vue-tsc" },
  { name: "Tailwind CSS 4", role: "Styling", note: "Utility classes + CSS design tokens" },
  { name: "shadcn-vue", role: "Components", note: "Local Vue components using Reka UI primitives" },
  { name: "Vue Router", role: "Routing", note: "File-based routes + generated route types" },
  { name: "Tabler Icons", role: "Icons", note: "Vue icon components from @tabler/icons-vue" },
  { name: "Fontsource", role: "Typography", note: "Locally installed variable font packages" },
  { name: "vite-ssg", role: "Static generation", note: "Pre-rendered pages + generated sitemap" },
] as const;

/* ------------------------------ CLI scripts ------------------------------ */

export interface ScriptRow {
  command: string;
  description: string;
}

export const SCRIPTS: ScriptRow[] = [
  { command: "pnpm dev", description: "Start the development server at http://localhost:3000" },
  {
    command: "pnpm build",
    description: "Run type checking, then generate the static production site",
  },
  { command: "pnpm preview", description: "Preview the production build locally" },
  { command: "pnpm check", description: "Run the Vite+ project checks" },
  { command: "pnpm lint", description: "Run Oxlint through Vite+" },
  { command: "pnpm lint:fix", description: "Run Oxlint and apply supported automatic fixes" },
  { command: "pnpm fmt", description: "Format the project with Oxfmt through Vite+" },
  { command: "pnpm type-check", description: "Run vue-tsc project-wide type checking" },
  { command: "pnpm test", description: "Run the test suite through Vite+" },
  {
    command: "pnpm run add dialog",
    description: "Run the shadcn-vue CLI to add the dialog component",
  },
  { command: "pnpm run up", description: "Run the configured Taze dependency-upgrade command" },
];

/* ---------------------------- Getting started ---------------------------- */

export const INSTALL_COMMANDS: Record<string, { install: string; dev: string }> = {
  pnpm: { install: "pnpm install", dev: "pnpm dev" },
  npm: { install: "npm install", dev: "npm run dev" },
  yarn: { install: "yarn", dev: "yarn dev" },
  bun: { install: "bun install", dev: "bun dev" },
};

export const CLONE_COMMAND = "git clone https://github.com/art70x/Vuetrix.git";

export const PROJECT_TREE = `vuetrix/
├── .github/                 # CI workflows and contribution templates
├── docs/                    # Project documentation
├── public/                  # Static public assets
├── src/
│   ├── components/
│   │   ├── ui/               # Local shadcn-vue components
│   │   └── ...               # Site components and demonstrations
│   ├── composables/          # Appearance, SEO, copy, and other composables
│   ├── css/                  # Global styles and local font-face declarations
│   ├── lib/                  # Site data, theme utilities, and helpers
│   ├── pages/                # File-based route components
│   ├── app.vue               # Application shell
│   └── main.ts               # Application / SSG entry point
├── components.json          # shadcn-vue configuration
├── package.json             # Dependencies and project scripts
├── pnpm-workspace.yaml      # pnpm workspace and dependency catalogs
├── vite.config.ts           # Vite+ and Vue tooling configuration
└── vitest.config.ts         # Test configuration`;

/* -------------------------------- Comparison ----------------------------- */

export interface ComparisonRow {
  capability: string;
  bareVite: string;
  vuetrix: string;
}

export const COMPARISON: ComparisonRow[] = [
  {
    capability: "TypeScript",
    bareVite: "Available as a scaffold option",
    vuetrix: "Configured with Vue-aware type checking",
  },
  {
    capability: "Routing",
    bareVite: "Choose and configure a router",
    vuetrix: "File-based Vue Router with generated route types",
  },
  {
    capability: "UI components",
    bareVite: "Build or add a component system",
    vuetrix: "Local shadcn-vue components built on Reka UI",
  },
  {
    capability: "Appearance",
    bareVite: "Implement theme preferences yourself",
    vuetrix: "Light, dark, and system themes with persisted preferences",
  },
  {
    capability: "SEO metadata",
    bareVite: "Configure metadata handling yourself",
    vuetrix: "Page-level SEO composables using Unhead",
  },
  {
    capability: "Static generation",
    bareVite: "Configure a rendering or generation solution",
    vuetrix: "vite-ssg pre-rendering with sitemap generation",
  },
  {
    capability: "Icons",
    bareVite: "Choose an icon library",
    vuetrix: "Tabler Icons as Vue components",
  },
  {
    capability: "Linting and formatting",
    bareVite: "Configure code-quality tools",
    vuetrix: "Vite+ with Oxlint and Oxfmt",
  },
  {
    capability: "Auto imports",
    bareVite: "Configure import automation yourself",
    vuetrix: "Configured Vue API, composable, and component auto-imports",
  },
  {
    capability: "Typography",
    bareVite: "Choose and configure font loading",
    vuetrix: "Fontsource variable fonts installed locally",
  },
];

/* ---------------------------------- FAQ ---------------------------------- */

export const FAQS = [
  {
    q: "Why Vuetrix instead of Nuxt?",
    a: "Nuxt is a full-stack Vue framework with integrated conventions for routing, rendering, data fetching, and server functionality. Vuetrix is a more focused Vue starter built around Vite and static site generation. Choose it when you want a client-side application or statically generated site without adopting a full-stack framework.",
  },
  {
    q: "Can I use Vuetrix for a production project?",
    a: "The project includes TypeScript checking, a configured linting and formatting workflow, tests, static generation, SEO metadata utilities, and a component foundation. Review the current documentation and deployment requirements, then validate your own application's accessibility, security, performance, and content before shipping.",
  },
  {
    q: "How do I add a new page?",
    a: "Create a Vue file in src/pages. For example, src/pages/pricing.vue creates the /pricing route. The file-based Vue Router plugin generates route declarations, and the catch-all page handles unmatched paths.",
  },
  {
    q: "Can I change the components or visual theme?",
    a: "Yes. The UI components are local files under src/components/ui, so you can modify or remove them. Global styling and design tokens live in src/css, while the appearance composable manages the theme, accent, and radius preferences.",
  },
  {
    q: "Which icon and font libraries does the project use?",
    a: "The project uses Tabler Icons through @tabler/icons-vue. Inter, Space Grotesk, and JetBrains Mono are installed through Fontsource Variable packages.",
  },
  {
    q: "What does the license allow?",
    a: "Check the repository's LICENSE file for the authoritative license terms before reusing or redistributing the project.",
  },
];

/* -------------------------------- Roadmap -------------------------------- */

export const ROADMAP = [
  {
    title: "Component-testing recipe",
    detail:
      "Add a documented Vue component-testing workflow and representative component tests on top of the existing Vitest configuration.",
    status: "Planned",
  },
  {
    title: "PWA recipe",
    detail: "Document an optional service worker, offline shell, and install experience.",
    status: "Planned",
  },
  {
    title: "i18n recipe",
    detail: "Document vue-i18n integration with a locale switcher and typed messages.",
    status: "Exploring",
  },
  {
    title: "More page blocks",
    detail: "Add reusable page sections such as pricing, changelog, and authentication layouts.",
    status: "Exploring",
  },
] as const;

/* --------------------------- Showcase registry --------------------------- */

export interface ShowcaseItem {
  id: string;
  name: string;
  category: "Actions" | "Forms" | "Overlays" | "Feedback" | "Data display";
  blurb: string;
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "buttons",
    name: "Buttons & badges",
    category: "Actions",
    blurb: "Button variants, sizes, icon support, loading state, and badges.",
  },
  {
    id: "toggle",
    name: "Toggle & segmented",
    category: "Actions",
    blurb: "Single and grouped choices with selected states.",
  },
  {
    id: "form",
    name: "Validated form",
    category: "Forms",
    blurb: "A Vue form demonstration with inline validation and feedback.",
  },
  {
    id: "inputs",
    name: "Inputs & selects",
    category: "Forms",
    blurb: "Text input, textarea, select, checkbox, radio, and switch controls.",
  },
  {
    id: "slider",
    name: "Slider & progress",
    category: "Forms",
    blurb: "A live example connecting a slider value to a progress indicator.",
  },
  {
    id: "dialog",
    name: "Dialog & confirm",
    category: "Overlays",
    blurb: "Dialog and confirmation interaction examples.",
  },
  {
    id: "popover",
    name: "Popover & tooltip",
    category: "Overlays",
    blurb: "Anchored popovers and contextual tooltips.",
  },
  {
    id: "sheet",
    name: "Sheet drawer",
    category: "Overlays",
    blurb: "An edge panel used for drawer-style interactions.",
  },
  {
    id: "toasts",
    name: "Toast notifications",
    category: "Feedback",
    blurb: "Toast feedback using the project's Vue Sonner integration.",
  },
  {
    id: "skeleton",
    name: "Loading & skeletons",
    category: "Feedback",
    blurb: "Loading placeholders and a simulated content-loading state.",
  },
  {
    id: "alerts",
    name: "Alerts & empty state",
    category: "Feedback",
    blurb: "Inline status messages and an empty-results presentation.",
  },
  {
    id: "table",
    name: "Sortable table",
    category: "Data display",
    blurb: "A table demonstration with interactive column sorting.",
  },
  {
    id: "tabs",
    name: "Tabs & accordion",
    category: "Data display",
    blurb: "Tabbed content and expandable disclosure panels.",
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Data display",
    blurb: "Navigate through the component showcase registry in pages.",
  },
];

/* ------------------------------- Docs nav -------------------------------- */

export const DOCS_SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "quick-start", label: "Quick start" },
  { id: "project-structure", label: "Project structure" },
  { id: "routing", label: "Routing & pages" },
  { id: "styling", label: "Styling & theming" },
  { id: "components", label: "Components" },
  { id: "scripts", label: "Scripts reference" },
  { id: "deployment", label: "Deployment" },
  { id: "faq", label: "FAQ" },
] as const;

/* ------------------------------- Code samples ---------------------------- */

export const CODE_SAMPLES = {
  page: {
    filename: "src/pages/about.vue",
    lang: "vue",
    code: `<script lang="ts" setup>
useSeo({
  title: "About",
  description: "What Vuetrix is and why it exists.",
  path: "/about",
});
</script>

<template>
  <main>
    <h1 class="title">About</h1>
  </main>
</template>

<!-- Creating this file registers the /about route. -->`,
  },
  theme: {
    filename: "src/css/main.css",
    lang: "css",
    code: `@theme inline {
  --color-primary: var(--primary);
  --color-brand: var(--brand);
}

.dark {
  --background: oklch(0.16 0.02 250);
  --primary: oklch(0.72 0.16 160);
}

/* Update the project's CSS tokens to change the theme. */`,
  },
  config: {
    filename: "vite.config.ts",
    lang: "ts",
    code: `export default defineConfig({
  plugins: lazyPlugins(() => [
    AutoImport({ /* Vue APIs and composables */ }),
    Components({ /* Vue component auto-registration */ }),
    VueRouter({ /* routes from src/pages */ }),
    tailwindcss(),
    vue(),
    vueDevTools(),
  ]),

  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap({
        basePath: "https://vuetrix.vercel.app",
        generateRobotsTxt: true,
      });
    },
  },
});`,
  },
};
