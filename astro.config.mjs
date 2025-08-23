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
import opengraphImages, { presets } from 'astro-opengraph-images';
import * as fs from 'fs';
import customOGImageTemplate from './src/og-templates/index.tsx';

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
    }), sitemap(), 
        opengraphImages({
            options: {
                fonts: [
                    {
                        name: "Inter",
                        weight: 400,
                        style: "normal",
                        data: fs.readFileSync("node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")
                    },
                    {
                        name: "Inter",
                        weight: 700,
                        style: "normal",
                        data: fs.readFileSync("node_modules/@fontsource/inter/files/inter-latin-700-normal.woff")
                    }
                ]
            },
            render: customOGImageTemplate
        })],
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
