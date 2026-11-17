// Writes the rendered page into dist/index.html so crawlers and link previews
// get the content without running JavaScript. Runs after both Vite builds
// (see the "build" script); the client hydrates this markup in src/main.jsx.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ssrDir = `${root}dist-ssr`;
const htmlPath = `${root}dist/index.html`;

const { render, structuredData } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href);
const markup = render();

const template = await readFile(htmlPath, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error(`${placeholder} not found in dist/index.html`);

const jsonLd = `<script type="application/ld+json">${structuredData()}</script>\n  </head>`;
// Function replacements: the markup may contain "$&"-style patterns
const html = template
  .replace(placeholder, () => `<div id="root">${markup}</div>`)
  .replace('</head>', () => jsonLd);

await writeFile(htmlPath, html);
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: ${(markup.length / 1024).toFixed(1)} kB of markup written to dist/index.html`);
