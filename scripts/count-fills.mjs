#!/usr/bin/env node
/**
 * Lists every <Fill> placeholder still in the site.
 *
 * These are the facts only Drishti can supply — baselines, sample
 * sizes, dates. Nothing on this site invents a number she'd have to
 * defend in an interview; it leaves a visible blank instead.
 *
 *   npm run fills
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKIP = new Set(["node_modules", ".next", "out", ".git", "scripts"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
let total = 0;

for (const file of files) {
  const text = await readFile(file, "utf8");
  const hits = [];

  // Match across newlines — some placeholders are long prompts that wrap.
  for (const match of text.matchAll(/<Fill>([\s\S]*?)<\/Fill>/g)) {
    const line = text.slice(0, match.index).split("\n").length;
    const label = match[1].replace(/\s+/g, " ").trim();
    hits.push({ line, label });
  }

  // The `note:` on a case study's `live:` block renders as the same amber
  // placeholder, so it belongs in this report too. It's the answer to
  // "is it live and traceable?" — the first thing a screener checks.
  // Scoped to content/ so unrelated `note:` keys elsewhere don't match.
  const noteMatches = /[\\/]content[\\/]/.test(file)
    ? text.matchAll(/\n\s*note:\s*(["'`])([\s\S]*?)\1\s*,/g)
    : [];
  for (const match of noteMatches) {
    const line = text.slice(0, match.index).split("\n").length + 1;
    hits.push({ line, label: `[live link] ${match[2].replace(/\s+/g, " ").trim()}` });
  }

  if (!hits.length) continue;

  console.log(`\n\x1b[1m${relative(ROOT, file)}\x1b[0m`);
  for (const h of hits) {
    total += 1;
    console.log(`  \x1b[33m${String(h.line).padStart(4)}\x1b[0m  ${h.label.slice(0, 120)}`);
  }
}

console.log(
  total
    ? `\n\x1b[1m${total} placeholder${total === 1 ? "" : "s"} left.\x1b[0m Each one is a fact only you can supply.\n`
    : "\n\x1b[32mNo placeholders left.\x1b[0m\n"
);
