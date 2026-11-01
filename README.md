# Vuetrix

A Vue 3 and TypeScript starter for building fast, accessible, statically generated websites and frontend applications. Vuetrix combines Vite+, Tailwind CSS 4, shadcn-vue-style components, Reka UI primitives, file-based routing, and a modern Oxc-based development toolchain.

Vuetrix follows the project layout of [Vitesse](https://github.com/antfu/vitesse) and draws on CI and configuration ideas from [Nuxpert](https://github.com/MFM-347/nuxpert).

- **Why Vuetrix?** Read [Why Vuetrix](docs/why-vuetrix.md).
- **Source code:** [GitHub repository](https://github.com/art70x/Vuetrix).
- **Live site:** [vuetrix.vercel.app](https://vuetrix.vercel.app).

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Available commands](#available-commands)
- [Project structure](#project-structure)
- [Routing and pages](#routing-and-pages)
- [Components and icons](#components-and-icons)
- [Styling, fonts, and theming](#styling-fonts-and-theming)
- [SEO and static generation](#seo-and-static-generation)
- [Development workflow](#development-workflow)
- [Customization](#customization)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Features

### Application foundation

- Vue 3 with the Composition API and single-file components.
- TypeScript with Vue-aware type checking through `vue-tsc`.
- Vite-powered development and production builds, managed through Vite+.
- File-based routing with `unplugin-vue-router` and generated typed routes.
- Automatic imports for Vue, Vue Router, VueUse, Vue Router helpers, and Unhead composables.
- Automatic component registration for Vue components in the configured component directories.

### Interface

- Tailwind CSS 4 with CSS-first configuration and design tokens.
- shadcn-vue-style components built on Reka UI primitives and stored in the repository.
- Tabler Icons for Vue.
- Variable fonts supplied by Fontsource: Inter, Space Grotesk, and JetBrains Mono.
- Light, dark, and system color modes.
- Browser-local persistence for appearance preferences, including accent and corner radius.
- Responsive navigation, interactive examples, and a component showcase.

### Developer experience

- Oxlint for linting.
- Oxfmt for formatting.
- Vitest through the Vite+ toolchain.
- Taze for dependency update checks.
- A Vite+ workflow that brings together the project's frontend development tools.

### Shipping

- Static site generation with `vite-ssg`.
- Sitemap and `robots.txt` generation through `vite-ssg-sitemap`.
- Per-page SEO metadata and canonical URL support through Unhead.
- A production build that runs type checking before static generation.

## Technology stack

| Area                        | Technology                            |
| --------------------------- | ------------------------------------- |
| Framework                   | Vue 3                                 |
| Language                    | TypeScript                            |
| Toolchain                   | Vite+                                 |
| Routing                     | Vue Router with `unplugin-vue-router` |
| Styling                     | Tailwind CSS 4                        |
| UI primitives               | Reka UI                               |
| Component approach          | shadcn-vue                            |
| Icons                       | Tabler Icons for Vue                  |
| Fonts                       | Fontsource Variable                   |
| Class utilities             | `clsx`, `tailwind-merge`, and `cn`    |
| Head management             | Unhead                                |
| State and browser utilities | VueUse                                |
| Static generation           | `vite-ssg`                            |
| Sitemap and robots          | `vite-ssg-sitemap`                    |
| Linting                     | Oxlint                                |
| Formatting                  | Oxfmt                                 |
| Tests                       | Vitest                                |
| Dependency updates          | Taze                                  |

## Requirements

- **Node.js:** 22 or later.
- **Package manager:** pnpm `12.16.1` (the version declared in `package.json`).
- **Git:** required to clone the repository.

The project uses pnpm workspace configuration and a Vite+ catalog for its Vite tooling. Use the declared package manager rather than switching package managers without updating the project configuration and lockfile.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/art70x/Vuetrix.git
cd Vuetrix
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The development server uses port `3000`, as configured in `vite.config.ts`.

## Available commands

Run the project scripts from the repository root.

| Command                    | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `pnpm dev`                 | Start the development server.                                |
| `pnpm build`               | Run type checking, then generate the static production site. |
| `pnpm preview`             | Preview the production build locally.                        |
| `pnpm check`               | Run the Vite+ check workflow.                                |
| `pnpm lint`                | Run Oxlint through Vite+.                                    |
| `pnpm lint:fix`            | Run Oxlint with automatic fixes.                             |
| `pnpm fmt`                 | Format the project with Oxfmt through Vite+.                 |
| `pnpm type-check`          | Run `vue-tsc --build`.                                       |
| `pnpm test`                | Run the Vitest suite once.                                   |
| `pnpm run add <component>` | Add a shadcn-vue component using the configured CLI.         |
| `pnpm up`                  | Check and interactively update dependencies with Taze.       |

For example, to add a component:

```bash
pnpm run add button
```

The `add` script invokes `shadcn-vue add`. It is not the same as `pnpm add`, which installs a package dependency.

### Production build

```bash
pnpm build
pnpm preview
```

The build script runs:

1. `vpr type-check` to check the project types.
2. `vite-ssg build` to generate the static site in `dist/`.
3. The configured SSG completion hook to generate the sitemap and `robots.txt`.

Deploy the generated `dist/` directory to a static hosting provider that supports the generated routes.

## Project structure

```text
Vuetrix/
├── .github/
│   ├── workflows/          # CI and semantic pull-request checks
│   ├── contributing.md     # Contribution guidelines
│   └── pull_request_template.md
├── docs/
│   └── why-vuetrix.md      # Project rationale and comparison
├── public/                 # Static assets copied to the build
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn-vue-style components
│   │   └── ...             # Site components and interactive demos
│   ├── composables/        # Appearance, commands, copy, metadata, SEO
│   ├── css/                # Global styles and local font-face declarations
│   ├── lib/                # Site data, configuration, theme, utilities
│   ├── pages/              # File-based route components
│   ├── app.vue             # Root application shell
│   └── main.ts             # Vite SSG application entry
├── components.json         # shadcn-vue configuration
├── package.json            # Scripts and dependencies
├── pnpm-lock.yaml          # Locked dependency graph
├── pnpm-workspace.yaml     # pnpm catalogs and workspace settings
├── vite.config.ts          # Vite+, plugins, routing, lint and SSG setup
├── vitest.config.ts        # Test configuration
├── oxlint.config.ts        # Oxlint configuration
└── oxfmt.config.ts         # Oxfmt configuration
```

Generated declaration files such as `src/auto-imports.d.ts`, `src/components.d.ts`, and `src/typed-router.d.ts` are maintained by the configured tooling. Avoid editing generated declarations manually.

## Routing and pages

Routes are generated from files in `src/pages/` by `unplugin-vue-router`.

The current site includes:

| File             | Route         | Purpose                           |
| ---------------- | ------------- | --------------------------------- |
| `index.vue`      | `/`           | Homepage                          |
| `Features.vue`   | `/features`   | Feature overview                  |
| `Docs.vue`       | `/docs`       | Project documentation             |
| `Showcase.vue`   | `/showcase`   | Interactive component examples    |
| `Playground.vue` | `/playground` | Theme and design-token playground |
| `about.vue`      | `/about`      | Project background                |
| `[...path].vue`  | Catch-all     | Not-found route                   |

To add a page, create a Vue file in `src/pages/`. For example, `pricing.vue` creates `/pricing`. Dynamic route segments can be expressed in filenames using the file-based router's conventions.

Typed route declarations are generated into `src/typed-router.d.ts`.

## Components and icons

### UI components

The UI components live in `src/components/ui/` and are part of the project source. They use Reka UI primitives and Tailwind CSS styling through the shadcn-vue approach.

You can inspect and customize these components directly. When adding a component through the CLI, review the generated files and adapt them to the project's conventions.

```bash
pnpm run add dialog
```

### Site components

Components outside `src/components/ui/` are used for the Vuetrix site itself—for example, page headers, code blocks, navigation, the footer, and interactive demonstration cards.

### Icons

Use icons from `@tabler/icons-vue`:

```vue
<script setup lang="ts">
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-vue";
</script>

<template>
  <IconArrowRight />
  <IconBrandGithub />
</template>
```

Import the specific icons used by a component. The previous Phosphor and Iconify-based setup is no longer part of the current dependency configuration.

## Styling, fonts, and theming

### Tailwind CSS

Tailwind CSS 4 is integrated through `@tailwindcss/vite`. The main stylesheet is `src/css/main.css`, which imports Tailwind, the animation utilities, shadcn-vue styles, and the project's font declarations.

Use the existing CSS variables and utility conventions when adding styles. Keep shared design values in the token definitions rather than duplicating values across components.

### Fonts

The project includes Fontsource Variable packages for:

- **Inter Variable** — general interface and body text.
- **Space Grotesk Variable** — display typography.
- **JetBrains Mono Variable** — code and monospaced text.

Font-face declarations are maintained in `src/css/fonts.css`.

### Appearance preferences

The appearance composable is in `src/composables/use-appearance.ts`. It provides:

- Light, dark, and system color modes.
- Accent color preferences.
- Corner-radius preferences.
- Browser-local persistence using `localStorage`.

These preferences belong to the current browser profile. They are not account-based and do not synchronize between devices.

The theme playground at `/playground` demonstrates the available appearance controls and design-token workflow.

## SEO and static generation

### Page metadata

Use the project's `useSeo` composable from `src/composables/use-seo.ts` to define page titles, descriptions, canonical URLs, and social metadata.

Example:

```ts
useSeo({
  title: "Pricing",
  description: "Plans and pricing for the project.",
  path: "/pricing",
});
```

The composable uses Unhead and the site URL configured in `src/lib/site.ts`.

### Static generation

The application is initialized with `vite-ssg` in `src/main.ts`. During the production build, the configured routes are pre-rendered to static HTML.

The `vite.config.ts` completion hook uses `vite-ssg-sitemap` to generate a sitemap and `robots.txt`. The configured public base URL is `https://vuetrix.vercel.app`; update that value if you deploy the project under a different domain.

## Development workflow

A typical contribution workflow is:

1. Install dependencies with `pnpm install`.
2. Create or update the relevant page, component, composable, or library module.
3. Run `pnpm check` to use the Vite+ check workflow.
4. Run `pnpm test` to execute the test suite.
5. Run `pnpm build` to verify type checking and static generation.
6. Review the final changes before opening a pull request.

You can also run the individual lint, formatting, and type-check scripts when you need a narrower check.

Vite+ provides the unified `vp` command-line interface used by the project scripts. For command details, run:

```bash
vp help
```

The local Vite+ documentation is available under `node_modules/vite-plus/docs` after dependencies have been installed. Online documentation: [viteplus.dev](https://viteplus.dev/guide/).

## Customization

Common starting points:

| What you want to change                | Where to look                       |
| -------------------------------------- | ----------------------------------- |
| Site name, URLs, navigation            | `src/lib/site.ts`                   |
| Homepage and other page content        | `src/pages/`                        |
| Shared site components                 | `src/components/`                   |
| UI primitives and styled components    | `src/components/ui/`                |
| Theme, accent, and radius behavior     | `src/composables/use-appearance.ts` |
| Global styles and design tokens        | `src/css/main.css`                  |
| Font declarations                      | `src/css/fonts.css`                 |
| SEO metadata behavior                  | `src/composables/use-seo.ts`        |
| Shared content and showcase data       | `src/lib/data.ts`                   |
| Vite plugins, aliases, and SSG options | `vite.config.ts`                    |
| shadcn-vue component configuration     | `components.json`                   |

## Contributing

Contributions, bug reports, and suggestions are welcome.

Before submitting a change:

- Keep changes focused and consistent with the existing project structure.
- Update documentation when commands, dependencies, routes, or user-facing behavior change.
- Run the relevant checks and tests.
- Verify that `pnpm build` completes successfully.

Read the repository's [contribution guidelines](.github/contributing.md) before opening a pull request. You can report bugs and request improvements through [GitHub Issues](https://github.com/art70x/Vuetrix/issues).

## Acknowledgements

Vuetrix builds on the work of the Vue ecosystem and open-source projects:

- [Vue](https://vuejs.org/) — progressive JavaScript framework.
- [Vite](https://vite.dev/) and [Vite+](https://viteplus.dev/) — frontend development and unified tooling.
- [Vitesse](https://github.com/antfu/vitesse) — inspiration for project structure.
- [Nuxpert](https://github.com/MFM-347/nuxpert) — reference for CI and configuration ideas.
- [shadcn-vue](https://www.shadcn-vue.com/) — customizable Vue component patterns.
- [Reka UI](https://reka-ui.com/) — accessible, unstyled UI primitives.
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework.
- [Tabler Icons](https://tabler.io/icons) — icon set used by the interface.
- [Fontsource](https://fontsource.org/) — self-hostable font packages.
- [VueUse](https://vueuse.org/) — Vue composition utilities.
- [Unhead](https://unhead.unjs.io/) — document head and SEO management.

---

**License:** Check the repository's license file before redistributing. A license file was not present in the project archive used to prepare this README.
