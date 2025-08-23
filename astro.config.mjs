import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import markdoc from "@astrojs/markdoc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import remarkCodeTitles from 'remark-code-titles'
import decapCmsOauth from "astro-decap-cms-oauth";
import expressiveCode from 'astro-expressive-code';
import remarkMermaid from 'remark-mermaidjs'

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// https://astro.build/config
export default defineConfig( /** @type {import('astro').AstroUserConfig} */{
    output: 'static',
    site: 'https://pedramnavid.com', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    server: {
        // port: 4321, // The port to run the dev server on.
    },
    markdown: {
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'css-variables',
        },
        remarkPlugins: [
            remarkCodeTitles,
            remarkMermaid
        ]
    },
    integrations: [
        expressiveCode(), 
        mdx(), 
        markdoc(), 
        svelte(), 
        tailwind({
        applyBaseStyles: false,
    }), sitemap(), expressiveCode()],
    vite: {
        plugins: [],
        resolve: {
            alias: {
                $: path.resolve(__dirname, './src')
            }
        },
        optimizeDeps: {
            allowNodeBuiltins: true
        }
    },
});
