# Vuetrix

A Vue 3 + TypeScript starter with Vite 8, Tailwind CSS 4, and shadcn-vue. It uses Oxlint and Oxfmt for linting and formatting, generates static HTML with vite-ssg, and creates a sitemap.

Vuetrix follows the project layout of [Vitesse](https://github.com/antfu/vitesse) and draws on CI and configuration ideas from [Nuxpert](https://github.com/MFM-347/nuxpert).

See [Why Vuetrix](docs/why-vuetrix.md).

## What is included

- File-based routing from `src/pages` with unplugin-vue-router
- Auto-imports for Vue, Vue Router, and VueUse, plus automatic component registration
- shadcn-vue components installed directly into the repository
- Phosphor icons available as components
- Static site generation with a generated sitemap and `robots.txt`
- Font preloading through fontless
- Oxlint, Oxfmt, ESLint, and Vitest

## Roadmap

- [ ] Dark-mode theme toggle test and a visible demo of the five shadcn-vue components already in the rep
- [ ] Lighthouse and bundle-size check in CI

## Quick Start

### Prerequisites

- **Node.js 22 or later**
- **Package manager:** pnpm (recommended), npm, or Bun

### Installation

```bash
# Clone the repository
git clone https://github.com/art70x/Vuetrix.git

# Navigate to the project
cd Vuetrix

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
# Create a production build
pnpm build

# Preview the production build
pnpm preview
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](https://github.com/art70x/Vuetrix/blob/main/CONTRIBUTING.md) for contribution guidelines.

## License

Vuetrix is licensed under the [MIT License](https://github.com/art70x/Vuetrix/blob/main/LICENSE).

## Acknowledgments

- [shadcn-vue](https://www.shadcn-vue.com/) - Vue components built with accessibility and customization in mind.
- [DevUI](https://www.devui.in/) - UI resources and design inspiration.
- [Vitesse](https://github.com/antfu/vitesse) - Inspiration for project structure and configuration.
- [Nuxpert](https://github.com/MFM-347/nuxpert) - Reference for CI workflows and configuration.
- [Vue Template](https://github.com/alexanderop/vue-template) - Reference for Oxlint and ESLint configuration.
