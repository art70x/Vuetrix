# Why Vuetrix

Vitesse is a reference Vue starter. Its README describes the project as being maintained at a slower pace. Vuetrix keeps the lightweight, file-based Vue starter approach while choosing a different UI and tooling stack.

| Area                 | Vitesse                            | Vuetrix                                                                               |
| -------------------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| Styling              | UnoCSS                             | Tailwind CSS 4 + shadcn-vue                                                           |
| UI primitives        | Vitesse's included stack           | shadcn-vue components built on Reka UI                                                |
| Icons                | Vitesse's configured icon setup    | Tabler Icons for Vue (`@tabler/icons-vue`)                                            |
| Fonts                | Vitesse's configured font setup    | Locally installed Fontsource variable fonts: Inter, JetBrains Mono, and Space Grotesk |
| Linting / formatting | ESLint with `@antfu/eslint-config` | Oxlint + Oxfmt through Vite+                                                          |
| Static builds        | vite-ssg                           | vite-ssg + generated sitemap and `robots.txt`                                         |
| State, i18n, PWA     | Included                           | Not included by default; add what the project needs                                   |

Choose Vuetrix if you want Tailwind CSS, shadcn-vue components, Tabler icons, and the Oxc toolchain configured from the start. Choose Vitesse if its included features—such as i18n, PWA support, and Markdown pages—better match your project.

Vuetrix is intentionally a starter, not a prescriptive application architecture. It provides the foundation; add state management, internationalization, PWA support, or other integrations when your application needs them.
