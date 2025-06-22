# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Core commands:**
- `npm run dev` - Start development server
- `npm run build` - Build for production (includes automatic search index generation)
- `npm run preview` - Preview production build locally
- `npm run check` - Run Astro diagnostics
- `npm run check:type` - TypeScript type checking
- `npm run lint` - Lint with Biome
- `npm run format` - Format code with Biome

**Testing approach:** This project doesn't use automated tests. Manual testing via `npm run dev` and `npm run build` is the standard workflow.

## Architecture Overview

**Technology stack:**
- **Astro 4.x** with static output mode (not SSR)
- **Svelte** for interactive components (theme switcher, search)
- **TypeScript** with strict configuration
- **Tailwind CSS** with custom theming
- **Markdoc/MDX** for enhanced blog content

**Key architectural patterns:**
- **Content Collections**: Blog posts managed via Astro's content collection system in `src/content/blog/`
- **Component Architecture**: Modular design with Astro components for layouts and Svelte for interactivity
- **Static Generation**: Pre-rendered pages for optimal performance
- **Client-side Search**: Lunr.js search with index generated at build time via `scripts/search/prepare-index.js`

**Important directories:**
- `src/content/blog/` - Blog posts with frontmatter validation via content schema
- `src/components/` - Reusable UI components (mix of Astro and Svelte)
- `src/store/` - Client-side state (theme preference, search state)
- `src/pages/blog/[slug].astro` - Dynamic blog post pages
- `src/config.ts` - Site-wide configuration and settings

**Path aliases:** TypeScript paths are configured with `@/` pointing to `src/`

## Content Management

**Blog posts:** Written in Markdown/MDX, stored in `src/content/blog/` with required frontmatter:
- `title`, `description`, `pubDate`, `tags`
- Optional: `heroImage`, `badge`, `category`

**Search functionality:** Automatically indexes all blog content during build. Search index is generated to `public/search-index.json`.

**Styling approach:** Utility-first with Tailwind CSS. Custom theme configuration supports dark/light modes with CSS variables.

## Key Configuration Files

- `astro.config.mjs` - Astro configuration with integrations (Svelte, Tailwind, etc.)
- `src/content/config.ts` - Content collection schema for blog posts
- `tailwind.config.cjs` - Custom theme with dark mode support
- `biome.json` - Linting and formatting rules (not ESLint/Prettier)

## Development Notes

**Static site only:** Configured for static generation (`output: 'static'`), not server-side rendering.

**Database features disabled:** View stats and other database features are turned off (`USE_VIEW_STATS: false`).

**Build process:** The build automatically triggers search index generation as a post-build step.