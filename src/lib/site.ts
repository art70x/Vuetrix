export const SITE = {
  name: "Vuetrix",
  tagline: "The Vue 3 + TypeScript starter that ships momentum",
  description:
    "A production-ready Vue 3 + TypeScript starter template with Vite, Tailwind CSS, shadcn-vue components, file-based routing, SSG and first-class developer tooling.",
  repo: "https://github.com/art70x/Vuetrix",
  issues: "https://github.com/art70x/Vuetrix/issues",
  license: "https://github.com/art70x/Vuetrix/blob/main/LICENSE",
  originalSite: "https://vuetrix.vercel.app",
} as const;

export const MAIN_NAV = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/docs", label: "Docs" },
  { to: "/showcase", label: "Showcase" },
  { to: "/playground", label: "Playground" },
  { to: "/about", label: "About" },
] as const;
