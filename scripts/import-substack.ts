import TurndownService from "turndown";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { parse } from "csv-parse/sync";
import { join } from "path";

const SUBSTACK_DIR = "/Users/pedram/Downloads/substack_posts";
const OUTPUT_DIR = join(import.meta.dir, "../src/content/blog");

// Read and parse CSV
const csvContent = readFileSync(join(SUBSTACK_DIR, "posts.csv"), "utf-8");

// Parse CSV manually since we may not have csv-parse
function parseCSV(csv: string) {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === "\n" && !inQuotes) {
      lines.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  if (current) lines.push(current);

  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = values[i] || ""));
    return obj;
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

const posts = parseCSV(csvContent);

// Set up Turndown
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// Remove Substack buttons (subscribe, share)
turndown.addRule("substackButtons", {
  filter: (node) => {
    return (
      node.nodeName === "P" &&
      node.classList?.contains("button-wrapper")
    );
  },
  replacement: () => "",
});

// Handle Substack image containers - extract just the image
turndown.addRule("substackImages", {
  filter: (node) => {
    return (
      node.nodeName === "DIV" &&
      node.classList?.contains("captioned-image-container")
    );
  },
  replacement: (_content, node) => {
    const img = (node as HTMLElement).querySelector("img");
    const caption = (node as HTMLElement).querySelector(".image-caption");
    if (!img) return "";

    const src = img.getAttribute("src") || "";
    const alt = caption?.textContent?.trim() || img.getAttribute("alt") || "";
    return `\n\n![${alt}](${src})\n\n`;
  },
});

// Remove Substack-specific dividers that are just <div><hr></div>
turndown.addRule("substackDivider", {
  filter: (node) => {
    return (
      node.nodeName === "DIV" &&
      node.children?.length === 1 &&
      node.children[0]?.nodeName === "HR"
    );
  },
  replacement: () => "\n\n---\n\n",
});

// Determine slug from post_id field (format: "ID.slug-name")
function getSlug(postId: string): string {
  const parts = postId.split(".");
  parts.shift(); // remove numeric ID
  return parts.join(".");
}

// Infer tags from title and content
function inferTags(title: string): string[] {
  const lower = title.toLowerCase();
  const tags: string[] = ["data"];

  if (lower.includes("dbt")) tags.push("dbt");
  if (lower.includes("sql")) tags.push("sql");
  if (lower.includes("rust")) tags.push("rust");
  if (lower.includes("python")) tags.push("python");
  if (lower.includes("airflow")) tags.push("airflow");
  if (lower.includes("kubernetes") || lower.includes("k8s")) tags.push("kubernetes");
  if (lower.includes("ai") || lower.includes("llm")) tags.push("ai");
  if (lower.includes("metric") || lower.includes("semantic")) tags.push("analytics");
  if (lower.includes("devrel") || lower.includes("developer relation")) tags.push("devrel");
  if (lower.includes("stream") || lower.includes("pipeline")) tags.push("data-engineering");

  return tags;
}

let imported = 0;
let skipped = 0;

for (const post of posts) {
  const isPublished = post.is_published === "true";
  const type = post.type;

  // Skip unpublished, podcasts, and restacks
  if (!isPublished || type === "podcast" || type === "restack") {
    console.log(`SKIP: ${post.title || post.post_id} (published=${isPublished}, type=${type})`);
    skipped++;
    continue;
  }

  const slug = getSlug(post.post_id);
  const htmlFile = join(SUBSTACK_DIR, "posts", `${post.post_id}.html`);

  if (!existsSync(htmlFile)) {
    console.log(`SKIP (no file): ${slug}`);
    skipped++;
    continue;
  }

  const html = readFileSync(htmlFile, "utf-8");
  const markdown = turndown.turndown(html);

  const title = post.title.replace(/"/g, '\\"');
  const description = (post.subtitle || post.title).replace(/"/g, '\\"');
  const date = post.post_date;
  const tags = inferTags(post.title);

  const frontmatter = `---
title: "${title}"
description: "${description}"
tags:
${tags.map((t) => `  - ${t}`).join("\n")}
author: Pedram Navid
authorTwitter: pdrmnvd
date: "${date}"
category: data
---`;

  const output = `${frontmatter}\n\n${markdown}\n`;
  const outputPath = join(OUTPUT_DIR, `${slug}.md`);

  writeFileSync(outputPath, output);
  console.log(`OK: ${slug}`);
  imported++;
}

console.log(`\nDone! Imported ${imported}, skipped ${skipped}.`);
