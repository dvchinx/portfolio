// Writes the rendered page in each language: Spanish into dist/index.html and
// English into dist/en/index.html, so crawlers and link previews get the
// content without running JavaScript. Runs after both Vite builds (see the
// "build" script); the client hydrates this markup in src/main.jsx.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ssrDir = `${root}dist-ssr`;
const templatePath = `${root}dist/index.html`;

const { langs, render, headTags, structuredData } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href);

const template = await readFile(templatePath, 'utf8');
const placeholder = '<div id="root"></div>';
const headBlock = /<!-- head:start -->[\s\S]*?<!-- head:end -->/;
const htmlTag = /<html lang="[^"]*">/;
for (const [name, pattern] of [['#root', placeholder], ['head markers', headBlock], ['<html lang>', htmlTag]]) {
  const found = typeof pattern === 'string' ? template.includes(pattern) : pattern.test(template);
  if (!found) throw new Error(`${name} not found in dist/index.html`);
}

for (const lang of langs) {
  const markup = render(lang);
  const jsonLd = `<script type="application/ld+json">${structuredData(lang)}</script>\n  </head>`;
  // Function replacements: the markup may contain "$&"-style patterns
  const html = template
    .replace(htmlTag, () => `<html lang="${lang}">`)
    .replace(headBlock, () => headTags(lang))
    .replace(placeholder, () => `<div id="root">${markup}</div>`)
    .replace('</head>', () => jsonLd);

  const outPath = lang === 'es' ? templatePath : `${root}dist/${lang}/index.html`;
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html);
  console.log(`prerender: ${lang} · ${(markup.length / 1024).toFixed(1)} kB of markup → ${outPath.replace(root, '')}`);
}

await rm(ssrDir, { recursive: true, force: true });
