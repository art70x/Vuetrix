# Vuetrix: working notes

## Commands
- `pnpm dev`: dev server on port 3000
- `pnpm build`: type-check, then static build with vite-ssg
- `pnpm lint`: Oxlint then ESLint, both with --fix
- `pnpm fmt`: Oxfmt on `src/`
- `pnpm test`: Vitest
- `pnpm add`: not valid. Use `shadcn-vue add <component>` via the `add` script.

## Conventions
- Pages live in `src/pages` and become routes automatically (unplugin-vue-router).
- Vue, vue-router, and VueUse APIs are auto-imported. Do not add manual imports for them.
- Components in `src/components` are auto-registered. Icons use the `I` prefix (Phosphor set).
- shadcn-vue components are generated into the repo. Edit them freely, do not re-run `add` over edits.
- Oxlint and ESLint overlap on purpose: `eslint-plugin-oxlint` turns off duplicated rules. Do not remove one tool without checking the other.

## Before you commit
Run `pnpm build && pnpm lint && pnpm test`. All three must pass.
